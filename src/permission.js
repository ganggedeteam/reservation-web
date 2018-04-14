import router from './router'
import store from './store'
// import store from './store'
require('./common/gbfl')

// 权限判断函数
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let user = GBFL.Cache.get('user-token')
    if (user) {
      if (store.state.user.status === false) {
        store.dispatch('GetUserInfo', user).then(() => {
          const roles = store.state.user.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            store.dispatch('CheckUserStatus', true)
            console.log(router)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(msg => {
          GBFL.Cache.remove('user-token')
          next('/login')
        })
      } else {
        next()
      }
    } else {
      next('./login')
    }
  }
})
