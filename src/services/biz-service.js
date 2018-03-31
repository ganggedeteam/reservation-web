import $ from 'jquery'
export default class BizService {
  constructor () {
    this.testHost = 'http://10.236.204.118:8080'
    this.method = {
      // 用户管理
      getUserList: '/user/pagelist',
      getUserDetail: '/user/detail',

      // 病人管理
      getPatientList: '/patient/pagelist',

      // 后台用户管理
      getBuserList: '/system/buser/pagelist',
      addBuser: '/system/buser/add',
      deleteBuser: '/system/buser/delete',
      updateBuser: '/system/buser/update',
      detailBuser: '/system/buser/datail',
      // 角色管理
      getRoleList: '/system/role/pagelist',
      // 公共编码管理
      getDepartmentTypeList: '/code/departmenttype/pagelist',
      addDepartmentType: '/code/departmenttype/add',
      deleteDepartmentType: '/code/departmenttype/delete',
      updateDepartmentType: '/code/departmenttype/update'
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
            window.location.href = './login.html'
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

//角色管理
    getRoleList (params, callback) {
    var url = this.testHost + this.method.getRoleList
    var type = 'post'
    return this.bizRequest(url, params, type, function (isOk, data) {
      if (callback) {
        callback(isOk, data)
      }
    }, 'application/json')
  }

}
