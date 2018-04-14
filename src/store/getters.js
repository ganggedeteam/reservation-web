const getters = {
  name: state => state.user.name,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routes: state => state.permission.routers,
  sidebar: state => state.app.sidebar
}
export default getters