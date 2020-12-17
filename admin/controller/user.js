const { isEmpty } = require('../tools/util')
const { ErrorReply, SuccessReply } = require('../model/reply_model')
const { userAccExists, userPacExists } = require('../service/user')

const { userLoginLthFail, 
        userLoginSuccess,
        userLoginDataFail } = require('../config/status_code')


function userVerify (data) {
  /**
   * @description: 验证用户提交的数据是否合法
   * @param {Object} data 客户端请求数据
   * @return Object Reply_model
   */

  if (isEmpty(data) 
  || !('account' in data) 
  || !('password' in data) 
  || !data.account.length   // 检测用户提交的数据是否为空
  || !data.password.length) return new ErrorReply({...userLoginDataFail, result: null})

  if (data.account.length < 6 
  || data.account.length > 20
  || data.password.length < 6   // 检测用户提交的数据长度是否合法
  || data.password.length > 20) return new ErrorReply({...userLoginLthFail, result: null})
}

function userExists (data) {
  /**
   * @description: 检测用户提交的数据在数据库中是否存在
   * @param {Object} data 客户端请求数据
   * @return Promise 
   */

  return new Promise(async function (resolve, reject) {
    try {

      await userAccExists(data.account)
      await userPacExists(data.password)

      // 登录成功
      resolve(new SuccessReply({...userLoginSuccess, result: null}))

    } catch (e) { reject(e) }
  })
}

function userLogin (data) {
  /**
   * @description: 用户登录处理
   * @param {Object} data 客户端请求数据
   * @return Object Reply_model
   */

  const result = userVerify(data)
  if (result && result.err_code) return result

  return userExists(data)
}

module.exports = {
  userLogin
}
