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
    }
  }
})(window)
