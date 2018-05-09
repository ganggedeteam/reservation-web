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
  // 先查询本地是否有token
  let token = GBFL.Cache.get('user-token')
  if (token != null) {
    if (to.path === '/login') {
      GBFL.Cache.clear()
      next()
    } else {
      if (store.state.user.status === false) {
        var loginId = token.loginId
        store.dispatch('GetUserInfo', {loginId: loginId}).then(() => {
          const roles = store.state.user.roles // note: roles must be a array! such as: ['editor','develop']
          if(roles[0] == '医院管理员'){
            store.dispatch('SetHospitalInfo', loginId).then(() => {
              console.log('医院信息已登记')
            }).catch(() => {
            
            })
          }else if(roles[0] == '医生'){
            store.dispatch('SetDoctorInfo', loginId).then(() => {
              console.log('医生信息已登记')
            }).catch(() => {
            
            })
          }
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            store.dispatch('CheckUserStatus', true)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
          
        }).catch(msg => {
          NProgress.done()
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
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
