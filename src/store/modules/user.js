import BizService from '../../services/biz-service.js'
const service = new BizService()

const user = {
  state: {
    loginId: '',
    key: '',
    token: '',
    name: '',
    roles: '',
    status: false
  },

  mutations: {
    SET_LOGINID: (state, loginId) => {
      state.loginId = loginId
    },
    SET_KEY: (state, key) => {
      state.key = key
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },

  actions: {
    // 用户名登录
    LoginById ({ commit }, user) {
      user.loginId = user.loginId.trim()
      return new Promise((resolve, reject) => {
        service.login(user, (isOk, data) => {
          if (isOk === true && data.status === true) {
            var result = data.data
            // commit('SET_ROLES', [result.user.roleName])
            // commit('SET_NAME', result.user.userName)
            commit('SET_LOGINID', user.loginId)
            commit('SET_KEY', result.key)
            commit('SET_TOKEN', result.token)
            commit('SET_STATUS', false)
            GBFL.Cache.set('user-token', {
              loginId: user.loginId,
              key: result.key,
              token: result.token
            })
            resolve(data)
          } else {
            reject(data.message)
          }
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit }, user) {
      return new Promise((resolve, reject) => {
        service.detailBuser(user, (isOk, data) => {
          if (isOk === true && data.status === true) {
            var result = data.data
            commit('SET_ROLES', [result.roleName])
            commit('SET_NAME', result.userName)
            commit('SET_LOGINID', result.loginId)
            commit('SET_STATUS', true)
            resolve(data)
          } else {
            reject(data.message)
          }
        })
      })
    },
    CheckUserStatus ({ commit }, status) {
      return new Promise((resolve, reject) => {
        commit('SET_STATUS', status)
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_LOGINID', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // },

    // // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
