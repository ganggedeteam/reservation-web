import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import BookList from '@/components/book/book.vue'
import UserList from '@/components/user/userList.vue'
import Dashboard from '@/components/Dashboard.vue'

const Login = resolve => require(['../components/login.vue'], resolve)
const UserDetail = resolve => require(['../components/user/UserDetail.vue'], resolve)
// 公共编码
const DepartmentType = resolve => require(['../components/globalcode/departmenttype/departmentType.vue'], resolve)

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
        {path: '/code/departmenttype', component: DepartmentType, name: '科室分类编码', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '图书管理',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/book/list', component: BookList, name: '图书列表', menuShow: true}
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
