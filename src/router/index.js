import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'
// 登录
import Login from '../views/login/index'
// 用户信息
const UserList = resolve => require(['../views/user/userList'], resolve)
const UserDetail = resolve => require(['../views/user/userDetail.vue'], resolve)
// 后台用户信息
const BuserList = resolve => require(['../views/system/buser/buserList.vue'], resolve)
// 用户密码修改
const UserPwdChange = resolve => require(['../views/system/buser/buser-pwd-change.vue'], resolve)
// 医生个人信息
const DoctorProfile = resolve => require(['../views/system/buser/buser-profile.vue'], resolve)
// 角色管理
const RoleList = resolve => require(['../views/system/role/roleList.vue'], resolve)
// 用户详情
// 公共编码
const DepartmentType = resolve => require(['../views/globalcode/departmentType'], resolve)
const AddressList = resolve => require(['../views/globalcode/addressList'], resolve)
// 医院管理
const HospitalList = resolve => require(['../views/hospital/hospital/hospitalList.vue'], resolve)
const HospitalDetail = resolve => require(['../views/hospital/hospital/hospitalDetail.vue'], resolve)
const EditHospital = resolve => require(['../views/hospital/hospital/editHospital.vue'], resolve)
// 医生管理
const DoctorList = resolve => require(['../views/hospital/doctor/doctorList.vue'], resolve)
const DoctorDetail = resolve => require(['../views/hospital/doctor/doctorDetail.vue'], resolve)
const EditDoctor = resolve => require(['../views/hospital/doctor/EditDoctor.vue'], resolve)
// 科室管理
const DepartmentList = resolve => require(['../views/hospital/department/departmentList.vue'], resolve)
// 接诊表管理
const Calendar = resolve => require(['../views/hospital/calendar/calendar.vue'], resolve)
// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/login',
    name: '登录界面',
    component: Login,
    hidden: true
  },
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  
]

export default new Router({
  routes: constantRouterMap
})

// 特定权限路由表
export const asyncRouterMap = [
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  //   redirect: '/dashboard',
  //   leaf: true, // 只有一个节点
  //   menuShow: true,
  //   iconCls: 'iconfont icon-home', // 图标样式class
  //   children: [
  //     {
  //       path: '/dashboard',
  //       component: Dashboard,
  //       name: '首页',
  //       menuShow: true
  //     }
  //   ]
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: '首页',
    meta: {leaf: true},
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页', icon: 'dashboard'
      }
    }]
  },
  {
    path: '/code',
    component: Layout,
    name: '公共编码',
    meta: {roles: ['管理员'], title: '公共编码', icon: 'table'},
    children: [
      {
        path: 'departmenttype/list',
        component: DepartmentType,
        name: '科室分类编码',
        meta: {
          title: '科室分类编码', icon: 'table'
        }
      },
      {
        path: 'address/list',
        component: AddressList,
        name: '地址编码',
        meta: {
          title: '地址编码'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    meta: {title: '系统管理'},
    children: [
      {path: 'buser/list', component: BuserList, name: '后台用户管理', meta: {title: '后台用户管理'}},
      {path: 'buser/changepwd', component: UserPwdChange, name: '修改密码', hidden: true, meta: {title: '修改密码'}},
      {path: 'buser/profile', component: DoctorProfile, name: '个人信息', hidden: true, meta: {title: '个人信息'}},
      {path: 'role/list', component: RoleList, name: '角色管理', meta: {title: '角色管理'}}
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: {roles: ['管理员'], title: '前台用户管理', icon: 'people'},
    children: [
      {path: 'list', component: UserList, name: '用户列表', meta: {roles: ['管理员'], title: '用户列表', icon: 'people'},},
      {path: 'detail', component: UserDetail, name: '用户详情', hidden: true, meta: {roles: ['管理员'], title: '用户详情', icon: 'people'},}
    ]
  },
  {
    path: '/hospital',
    component: Layout,
    name: '院方信息维护',
    meta: {roles: ['管理员','医院管理员'], title: '院方信息维护', icon: 'people'},
    children: [
      {path: 'hospital/list', component: HospitalList, name: '医院列表', meta:{roles: ['管理员'], title: '医院列表'}},
      {path: 'hospital/detail', component: HospitalDetail, name: '医院详情', meta:{roles: ['管理员'], title: '医院详情'}, hidden: true},
      {path: 'hospital/edit', component: EditHospital, name: '医院信息管理', meta:{title: '医院信息管理'}},
      {path: 'doctor/list', component: DoctorList, name: '医生管理', meta:{title: '医生管理'}},
      {path: 'doctor/detail', component: DoctorDetail, name: '医生详情', meta:{title: '医生详情'}, hidden: true},
      {path: 'doctor/edit', component: EditDoctor, name: '修改医生信息', meta:{title: '修改医生信息'}, hidden: true},
      {path: 'department/list', component: DepartmentList, name: '科室管理', meta:{title: '科室管理'}},
      {path: 'calendar', component: Calendar, name: '接诊日历表', meta:{title: '接诊日历表'}, hidden: true},
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
  // ,
  
  // {
  //   path: '/',
  //   component: Home,
  //   name: '系统管理',
  //   menuShow: true,
  //   iconCls: 'iconfont icon-books',
  //   children: [
  //     {path: '/system/buser/list', component: BuserList, name: '后台用户管理', menuShow: true},
  //     {path: '/system/buser/changepwd', component: UserPwdChange, name: '修改密码', menuShow: false},
  //     {path: '/system/buser/profile', component: DoctorProfile, name: '个人信息', menuShow: false},
  //     {path: '/system/role/list', component: RoleList, name: '角色管理', menuShow: true}
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: '院方信息维护',
  //   menuShow: true,
  //   iconCls: 'iconfont icon-books',
  //   children: [
  //     {path: '/hospital/hospital/list', component: HospitalList, name: '医院列表', menuShow: true},
  //     {path: '/hospital/hospital/detail', component: HospitalDetail, name: '医院详情', menuShow: false},
  //     {path: '/hospital/hospital/edit', component: EditHospital, name: '医院信息管理', menuShow: true},
  //     {path: '/hospital/doctor/list', component: DoctorList, name: '医生管理', menuShow: true},
  //     {path: '/hospital/doctor/detail', component: DoctorDetail, name: '医生详情', menuShow: false},
  //     {path: '/hospital/doctor/edit', component: EditDoctor, name: 'editDoctor', menuShow: false},
  //     {path: '/hospital/department/list', component: DepartmentList, name: '科室管理', menuShow: true}
  //   ]
  // }
]
