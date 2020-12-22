import { _axios } from '/@/libs/http.js'

class Api {
  constructor () {
    this.add = {
      label (v) { return _axios('post', v, '/api/category/label/add') },
      product (v) { return _axios('post', v, '/api/category/product/add') }
    }
    this.del = {

    }
    this.chg = {

      product (v) { return _axios('post', v, '/api/category/product/chg') }
    }
    this.get = {
      days (v) { return _axios('post', v, '/api/createlog/days/get') },
      label () { return _axios('post', null, '/api/category/label/get') },
      product () { return _axios('post', null, '/api/category/product/get') }
    }
  }
  
  login (v) {
    /**
     * @description: 发起用户登录请求
     * @param {Object} data 数据
     * @return {Object} Promise
     */

    return _axios('post', {
      account: v.accInput, 
      password: v.pasInput
    }, '/api/user/login')
  }
}

export default new Api()
