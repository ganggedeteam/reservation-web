import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Dashboard from '@/components/Dashboard.vue'

// 用户信息
const UserList = resolve => require(['../components/user/userList.vue'], resolve)
// 登录
const Login = resolve => require(['../components/Login.vue'], resolve)
// 后台用户信息
const BuserList = resolve => require(['../components/system/buser/buserList.vue'], resolve)
// 用户密码修改
const UserPwdChange = resolve => require(['../components/system/buser/buser-pwd-change.vue'], resolve)
// 医生个人信息
const DoctorProfile = resolve => require(['../components/system/buser/buser-profile.vue'], resolve)
// 角色管理
const RoleList = resolve => require(['../components/system/role/roleList.vue'], resolve)
// 用户详情
const UserDetail = resolve => require(['../components/user/userDetail.vue'], resolve)
// 公共编码
const DepartmentType = resolve => require(['../components/globalcode/departmentType.vue'], resolve)
const AddressList = resolve => require(['../components/globalcode/addressList.vue'], resolve)
// 医院管理
const HospitalList = resolve => require(['../components/hospital/hospital/hospitalList.vue'], resolve)
const HospitalDetail = resolve => require(['../components/hospital/hospital/hospitalDetail.vue'], resolve)
const EditHospital = resolve => require(['../components/hospital/hospital/editHospital.vue'], resolve)
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/login',
      name: '登录界面',
      component: Login,
      menuShow: false
    },
    {
      path: '/',
      component: Home,
      name: '公共编码',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/code/departmenttype', component: DepartmentType, name: '科室分类编码', menuShow: true},
        {path: '/code/address/list', component: AddressList, name: '地址编码', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/user/list', component: UserList, name: '用户列表', menuShow: true},
        {path: '/user/detail', component: UserDetail, name: '用户详情', menuShow: false}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '系统管理',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/system/buser/list', component: BuserList, name: '后台用户管理', menuShow: true},
        {path: '/system/buser/changepwd', component: UserPwdChange, name: '修改密码', menuShow: false},
        {path: '/system/buser/profile', component: DoctorProfile, name: '个人信息', menuShow: false},
        {path: '/system/role/list', component: RoleList, name: '角色管理', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '院方信息维护',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/hospital/hospital/list', component: HospitalList, name: '医院列表', menuShow: true},
        {path: '/hospital/hospital/detail', component: HospitalDetail, name: '医院详情', menuShow: false},
        {path: '/hospital/hospital/edit', component: EditHospital, name: '医院信息管理', menuShow: true}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    GBFL.Cache.remove('user-token')
    next()
  } else {
    let user = GBFL.Cache.get('user-token')
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
