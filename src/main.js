// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import echarts from 'echarts'
import App from './App'
import router from './router'
import store from './store'

import '@/assets/iconfont.css'
import '@/icons' // icon
import '@/permission' // permission control
import './mock' // simulation data
require('./common/gbfl')

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
