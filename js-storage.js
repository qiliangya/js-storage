/*!
 * JavaScript js-storage v1.1.0
 * https://github.com/qiliangya/js-storage
 *
 * Copyright 2018, 2018 qiliangya
 * Released under the ISC license
 */

;(function(factory){
  var registerModuleLoader = false; 
  if (typeof define === 'function' && define.amd ) {  
    define(factory);
    registerModuleLoader = true;  
  }
  if (typeof exports === 'object') {  
    module.exports = factory;
    registerModuleLoader = true;
  }
  if (!registerModuleLoader) {  
    var oldStorage = window.Storage; 
    var api = window.Storage = factory();
    api.noConflict = function () {  
      window.Storage = oldStorage
      return api
    }
  }
})(function () {
  // -------------utils-------------

  function invaidType (data) { 
    var dataType = typeof data
    if (dataType !== 'object') {
      return dataType.substring(0, 1).toUpperCase() + dataType.substring(1)
    } else if (data instanceof Array) {
      return 'Array'
    } else {
      return 'Object'
    }
  }

  function assign () { 
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      if (!(arguments[i] instanceof Object)) {
        throw new TypeError('The arguments want to get a Object but is ' + invaidType(arguments[i]) )
      }
      var attribute = arguments[i];
      for (var item in attribute) {
        result[item] = attribute[item]
      }
    }
    return result
  }

  function decode (s) { 
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }
  
  // -------------utils-------------
  
  // -------------init-------------
  function init (converter) { 
    if (!window.localStorage || !window.sessionStorage) {
      throw new Error('Your browser does not support Stroage')
    }
    /**
     * @todo for this function, you can extend any orders
     *
     */
    function api () {};

    /**
     * @todo for set value
     * @param {String} key
     * @param {any} value
     * @return {null} null
     */
    function set (type) {
      return function(key,value) {
        if (typeof document === 'undefined' || typeof window === 'undefined') { 
          throw Error('please use it in browser')
        }
  
        try{  // 
          var res = JSON.stringify(value)
          if ( /^[\{\[]/.test(res) ) {
            value = res
          }
        } catch(e) {}
        value = converter.write ? 
          converter.write(value, key) :
          encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        key = encodeURIComponent(String(key))
          .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
          .replace(/[\(\)]/g, escape);
  
        return (window[type].setItem(key,value))
      }
      
    };

    /**
     * @todo for get localStorage item
     *
     * @param {String} key
     * @returns {Any}
     */
    function get (type) {
      return function (key) {
        if (typeof document === 'undefined' || typeof window === 'undefined') { // 
          throw Error('please use it in browser')
        }
        var result = window[type].getItem(key)
        result = result==null ? // 
          null :
          decodeURIComponent(String(result))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, encodeURIComponent);
        try {
          result = JSON.parse(result)
        } catch(e){}
        return result
      }
    };

    /**
     * @todo to remove localStorage item
     *
     * @param {String} key
     * @return {Any}
     */
    function remove(type) {
      return function (key) {
        if (typeof document === 'undefined' || typeof window === 'undefined') { // 
          throw Error('please use it in browser')
        }
        if (key === null || key === undefined || key === '') {
          window[type].clear()
        }
        var result = getLocal(key)
        window[type].removeItem(key)
        return result
      }
    };
    /**
     * @todo inspect the item
     *
     * @param {String} key
     * @returns {Boolean}
     */
    function inspect(type) {
      return function (key) {
        if (typeof document === 'undefined' || typeof window === 'undefined') { // 
          throw Error('please use it in browser')
        }
        return window[type].getItem(key) !== null
      }
    };


    function addProtoType(top,type) { // 
      var winType = window[type];
      top[type] = new Object();
      for (var item in winType) {
        if(winType.hasOwnProperty(item)) {
          top[type][item] = winType[item]
        }
      }
      top[type].__proto__.set = set(type)
      top[type].__proto__.get = get(type)
      top[type].__proto__.remove = remove(type)
      top[type].__proto__.inspect = inspect(type)
    }
    addProtoType(api,'localStorage');
    addProtoType(api,'sessionStorage');

    api.defaults = {};

		api.withConverter = init;
    return api
  }

  // -------------init-------------

  return init(function () {})
})