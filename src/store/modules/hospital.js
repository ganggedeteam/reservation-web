import BizService from '../../services/biz-service.js'
const service = new BizService()

const hospital = {
  state: {
    hospitalId: null
  },
  mutations: {
    SET_HOSPITAL: (state, hospitalId) => {
      state.hospitalId = hospitalId
    }
  },
  actions: {
    SetHospitalInfo: ({ commit }, loginId) => {
      return new Promise((resolve, reject) => {
        service.getHospitalDetail({hospitalManager: loginId}, (isOk, data) => {
          if(isOk && data.status){
            commit('SET_HOSPITAL', data.data.hospitalId)
            GBFL.Cache.set("hospital", data.data)
            resolve()
          }else{
            reject()
          }
        })
      })
    }
  }
}

export default hospital
