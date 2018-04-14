import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import hospital from './modules/hospital'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    permission,
    hospital
  },
  getters
})

export default store
