import BizService from '../../services/biz-service.js'
const service = new BizService()

const doctor = {
  state: {
    doctor: null
  },
  mutations: {
    SET_DOCTOR: (state, doctor) => {
      state.doctor = doctor
    }
  },
  actions: {
    SetDoctorInfo: ({ commit }, loginId) => {
      return new Promise((resolve, reject) => {
        service.getDoctorDetail({loginId: loginId}, (isOk, data) => {
          if(isOk && data.status){
            commit('SET_DOCTOR', data.data)
            GBFL.Cache.set("doctor", data.data)
            resolve()
          }else{
            reject()
          }
        })
      })
    }
  }
}

export default doctor
