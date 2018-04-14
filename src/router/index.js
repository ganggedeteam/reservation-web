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
// 医生管理
const DoctorList = resolve => require(['../components/hospital/doctor/doctorList.vue'], resolve)
const DoctorDetail = resolve => require(['../components/hospital/doctor/doctorDetail.vue'], resolve)
const EditDoctor = resolve => require(['../components/hospital/doctor/EditDoctor.vue'], resolve)
// 科室管理
const DepartmentList = resolve => require(['../components/hospital/department/departmentList.vue'], resolve)
Vue.use(Router)

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/login',
    name: '登录界面',
    component: Login
  }
]

export default new Router({
  routes: constantRouterMap
})

// 特定权限路由表
export const asyncRouterMap = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/dashboard',
    leaf: true, // 只有一个节点
    menuShow: true,
    iconCls: 'iconfont icon-home', // 图标样式class
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        name: '首页',
        menuShow: true
      }
    ]
  },
  {
    path: '/code',
    component: Home,
    name: '公共编码',
    menuShow: true,
    iconCls: 'iconfont icon-books',
    meta: {role: ['管理员']},
    children: [
      {
        path: 'departmenttype',
        component: DepartmentType,
        name: '科室分类编码',
        menuShow: true,
        redirect: 'code/departmenttype/list',
        meta: {
          role: ['管理员']
        }
      },
      {
        path: 'address',
        component: AddressList,
        name: '地址编码',
        menuShow: true,
        redirect: 'code/address/list',
        meta: {
          role: ['管理员']
        }
      }
    ]
  }
  // ,
  // {
  //   path: '/',
  //   component: Home,
  //   name: '用户管理',
  //   menuShow: true,
  //   iconCls: 'iconfont icon-books',
  //   children: [
  //     {path: '/user/list', component: UserList, name: '用户列表', menuShow: true},
  //     {path: '/user/detail', component: UserDetail, name: '用户详情', menuShow: false}
  //   ]
  // },
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
