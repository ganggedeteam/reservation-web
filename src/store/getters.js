const getters = {
  loginId: state => state.user.loginId,
  name: state => state.user.name,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routes: state => state.permission.routers,
  sidebar: state => state.app.sidebar,
  hospital: state => state.hospital.hospitalId,
  doctor: state => state.doctor.doctor
}
export default getters
