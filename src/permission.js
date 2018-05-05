import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// import store from './store'
require('./common/gbfl')

// 权限判断函数
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']

router.beforeEach((to, from, next) => {
  NProgress.start()
  let user = GBFL.Cache.get('user-token')
  if (user != null) {
    if (to.path === '/login') {
      GBFL.Cache.clear()
      next()
    } else {
      if (store.state.user.status === false) {
        store.dispatch('GetUserInfo', user).then(() => {
          store.dispatch('SetHospitalInfo', user.loginId).then(() => {
            console.log('医院信息已登记')
          }).catch(() => {
           
          })
          const roles = store.state.user.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            store.dispatch('CheckUserStatus', true)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(msg => {
          GBFL.Cache.remove('user-token')
          next('/login')
        })
      } else {
        next()
      }
    } 
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
