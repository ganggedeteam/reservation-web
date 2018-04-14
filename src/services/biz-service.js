import $ from 'jquery'
export default class BizService {
  constructor () {
    this.testHost = 'http://localhost:8080'
    this.fileUploadHost = 'http://localhost:8888'
    this.fileSystemHost = 'http://localhost:9999'
    this.method = {
      // 文件上传
      upload: '/file/upload',
      // 登录
      login: '/login/buser',
      // 用户管理
      getUserList: '/user/pagelist',
      getUserDetail: '/user/detail',
      // 后台用户管理
      changePwd: '/system/buser/changepwd',
      // 病人管理
      getPatientList: '/patient/pagelist',

      // 后台用户管理
      getBuserList: '/system/buser/pagelist',
      addBuser: '/system/buser/add',
      deleteBuser: '/system/buser/delete',
      updateBuser: '/system/buser/update',
      detailBuser: '/system/buser/detail',
      // 角色管理
      getRoleList: '/system/role/pagelist',
      // 公共编码管理
      getDepartmentTypeList: '/code/departmenttype/pagelist',
      getDepartmentTypeAllList: '/code/departmenttype/list',
      addDepartmentType: '/code/departmenttype/add',
      deleteDepartmentType: '/code/departmenttype/delete',
      updateDepartmentType: '/code/departmenttype/update',
      deleteDepartmentTypeList: '/code/departmenttype/deleteList',

      getAddressPageList: '/code/address/pagelist',
      getAddressList: '/code/address/list',
      addAddress: '/code/address/add',
      deleteAddress: '/code/address/delete',
      deleteAddressList: '/code/address/deleteList',
      updateAddress: '/code/address/update',
      getAddressDetail: '/code/adddress/detail',

      // 医院管理
      getHospitalList: '/hospital/hospital/pagelist',
      getHospitalDetail: '/hospital/hospital/detail',
      addHospital: '/hospital/hospital/add',
      updateHospital: '/hospital/hospital/update',

      // 医生管理
      getDoctorPageList: '/hospital/doctor/pagelist',
      getDoctorDetail: '/hospital/doctor/detail',
      addDoctor: '/hospital/doctor/add',
      updateDoctor: '/hospital/doctor/update',
      deleteDoctor: '/hospital/doctor/delete',
      deleteDoctorList: '/hospital/doctor/deleteList',

      // 科室管理
      getDepartmentPageList: '/hospital/department/pagelist',
      addDepartment: '/hospital/department/add',
      deleteDepartment: '/hospital/department/delete',
      updateDepartment: '/hospital/department/update',
      deleteDepartmentList: '/hospital/department/deleteList'
    }
  }
  ajaxRequest (url, sendData, type, callback, contentType, async, beforeSend) {
    var result = null
    $.ajax({
      url: url,
      type: type || 'GET',
      async: async === undefined || async,
      contentType: contentType === undefined ? 'application/x-www-form-urlencoded' : contentType,
      data: contentType === 'application/json' ? JSON.stringify(sendData) : sendData,
      headers: {},
      // dataType: 'JSONP',
      // data: $.extend(sendData, {token: FDPX.logOn.token}),
      timeout: 60000,
      // dataType: 'json',
      beforeSend: beforeSend || function (request) {
      },
      complete: function () {},
      success: function (data, textStatus) {
        try {
          if (callback) {
            callback(null, data)
          }
          result = data
        } catch (e) {
          console.log(e)
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        try {
          if (callback) {
            callback(textStatus || new Error('网络错误'), XMLHttpRequest)
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
    return result
  }
  bizRequest (url, sendData, type, callback, contentType, async, beforeSend) {
    var result = null
    this.ajaxRequest(url, sendData, type, function (err, data) {
      if (!err) {
        if (data) {
          if (data.returnCode !== 'FRA-99999') {
            // 成功，更新token
            if (data.status === true || data.status === '200') {
              result = data
              data.status = true
            }
            if (data.status === false || data.status !== '200') {
              console.log(data && data.message ? data.message : 'error!')
            }
            if (callback) {
              callback(data.status, data)
            }
          } else {
          }
        } else {
          if (callback) {
            callback(null, data)
          }
        }
      } else {
        console.log('bizRequest error : ' + err)
      }
    }, contentType, async, beforeSend)
    return result
  }
  login (params, callback) {
    var url = this.testHost + this.method.login
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getUserList (params, callback) {
    var url = this.testHost + this.method.getUserList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getUserDetail (params, callback) {
    var url = this.testHost + this.method.getUserDetail
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  changePwd (params, callback) {
    var url = this.testHost + this.method.changePwd
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    })
  }
  getPatientList (params, callback) {
    var url = this.testHost + this.method.getPatientList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }

  getDepartmentTypeList (params, callback) {
    var url = this.testHost + this.method.getDepartmentTypeList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getDepartmentTypeAllList (params, callback) {
    var url = this.testHost + this.method.getDepartmentTypeAllList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  addDepartmentType (params, callback) {
    var url = this.testHost + this.method.addDepartmentType
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteDepartmentType (params, callback) {
    var url = this.testHost + this.method.deleteDepartmentType
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  updateDepartmentType (params, callback) {
    var url = this.testHost + this.method.updateDepartmentType
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteDepartmentTypeList (params, callback) {
    var url = this.testHost + this.method.deleteDepartmentTypeList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getAddressPageList (params, callback) {
    var url = this.testHost + this.method.getAddressPageList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getAddressList (params, callback) {
    var url = this.testHost + this.method.getAddressList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  addAddress (params, callback) {
    var url = this.testHost + this.method.addAddress
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteAddress (params, callback) {
    var url = this.testHost + this.method.deleteAddress
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteAddressList (params, callback) {
    var url = this.testHost + this.method.deleteAddressList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  updateAddress (params, callback) {
    var url = this.testHost + this.method.updateAddress
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getAddressDetail (params, callback) {
    var url = this.testHost + this.method.getAddressDetail
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getBuserList (params, callback) {
    var url = this.testHost + this.method.getBuserList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  addBuser (params, callback) {
    var url = this.testHost + this.method.addBuser
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteBuser (params, callback) {
    var url = this.testHost + this.method.deleteBuser
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  updateBuser (params, callback) {
    var url = this.testHost + this.method.updateBuser
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  detailBuser (params, callback) {
    var url = this.testHost + this.method.detailBuser
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  // 角色管理
  getRoleList (params, callback) {
    var url = this.testHost + this.method.getRoleList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }

  // 医院管理
  getHospitalList (params, callback) {
    var url = this.testHost + this.method.getHospitalList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getHospitalDetail (params, callback) {
    var url = this.testHost + this.method.getHospitalDetail
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  addHospital (params, callback) {
    var url = this.testHost + this.method.addHospital
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  updateHospital (params, callback) {
    var url = this.testHost + this.method.updateHospital
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getDoctorPageList (params, callback) {
    var url = this.testHost + this.method.getDoctorPageList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getDoctorDetail (params, callback) {
    var url = this.testHost + this.method.getDoctorDetail
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  addDoctor (params, callback) {
    var url = this.testHost + this.method.addDoctor
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  updateDoctor (params, callback) {
    var url = this.testHost + this.method.updateDoctor
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteDoctor (params, callback) {
    var url = this.testHost + this.method.deleteDoctor
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteDoctorList (params, callback) {
    var url = this.testHost + this.method.deleteDoctorList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  getDepartmentPageList (params, callback) {
    var url = this.testHost + this.method.getDepartmentPageList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  addDepartment (params, callback) {
    var url = this.testHost + this.method.addDepartment
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteDepartment (params, callback) {
    var url = this.testHost + this.method.deleteDepartment
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  updateDepartment (params, callback) {
    var url = this.testHost + this.method.updateDepartment
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
  deleteDepartmentList (params, callback) {
    var url = this.testHost + this.method.deleteDepartmentList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }
}
