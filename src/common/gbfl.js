/**
 * 全局变量通用文件
 */
(function (global, undefined) {
  var GBFL = global.GBFL = {
    version: '4.0.0',
    MSG: {}
  }

  GBFL.Cache = {
    get: function (key) {
      if (typeof key !== 'string') return

      var value = null
      var str = global.localStorage.getItem(key)
      try {
        value = JSON.parse(str)
      } catch (e) {
        value = str
      }

      return value
    },
    set: function (key, value) {
      if (typeof key !== 'string') return
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      try {
        global.localStorage.setItem(key, value)
      } catch (e) {
        console.log(e)
      }
    },
    remove: function (key) {
      if (typeof key !== 'string') return
      global.localStorage.removeItem(key)
    },
    clear: function () {
      global.localStorage.clear()
    }
  }
  GBFL.Util = {
    deepCopy: function (source) {
      var result = {}
      for (var key in source) {
        if (source[key]) {
          result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
        } else if (source[key] === false) {
          result[key] = false
        } else {
          result[key] = ''
        }
      }
      return result
    },
    openDateFormat: function(){
      Date.prototype.format = function(fmt) { 
        var o = { 
          "M+" : this.getMonth()+1,                 //月份 
          "d+" : this.getDate(),                    //日 
          "h+" : this.getHours(),                   //小时 
          "m+" : this.getMinutes(),                 //分 
          "s+" : this.getSeconds(),                 //秒 
          "q+" : Math.floor((this.getMonth()+3)/3), //季度 
          "S"  : this.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt; 
      }
    },
    closeDateFormat: function(){
      Date.prototype.format = undefined
    }
  }
})(window)
