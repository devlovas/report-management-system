import { axiosGet, axiosPost } from '/@/libs/http.js'

function userLoginRequest (data) {
  /**
   * @description: 发起用户登录请求
   * @param {Object} data 数据
   * @return {Object} Promise
   */

  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/api/user/login',
      data: {
        account: data.accInput, 
        password: data.pasInput
      },
      error (err) { reject(err) },
      success (data) { resolve(data) }
    })
  })
}

function getLabelRequest () {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/api/category/label/get',
      data: {},
      error (err) { reject(reject(err)) },
      success (data) { resolve(data) }
    })
  })
}

function getProductRequest () {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/api/category/product/get',
      data: {},
      error (err) { reject(reject(err)) },
      success (data) { resolve(data) }
    })
  })
}

function addLabelRequest (data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/api/category/label/add',
      data,
      error (err) { reject(reject(err)) },
      success (data) { resolve(data) }
    })
  })
}

function addProductRequest (data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/api/category/product/add',
      data,
      error (err) { reject(reject(err)) },
      success (data) { resolve(data) }
    })
  })
}

function chgProductRequest (data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/api/category/product/chg',
      data,
      error (err) { reject(reject(err)) },
      success (data) { resolve(data) }
    })
  })
}

export { 
  userLoginRequest,
  getLabelRequest,
  addLabelRequest,
  getProductRequest,
  addProductRequest,
  chgProductRequest
}
