const { isEmpty } = require('../tools/util')
const { ErrorReply, SuccessReply } = require('../model/reply_model')
const { userAccExists, userPacExists } = require('../service/user')

const { userLoginLthFail, 
        userLoginSuccess,
        userLoginDataFail 
      } = require('../config/status_code')


/*===========================================================
  用户登录
===========================================================*/
{
  function verifyUserData (data) {
    /**
     * @description: 验证用户提交的数据是否合法
     * @param {Object} data 客户端请求数据
     * @return Object Reply_model
     */

    // 校验数据是否为空
    if (isEmpty(data) 
    || !('account' in data)
    || !('password' in data)) 
    { return new ErrorReply(userLoginDataFail) }

    // 去除数据前后空格
    data.account = data.account.trim()
    data.password= data.password.trim()

    // 校验数据长度是否合法
    if (!data.account.length   
    ||  !data.password.length
    || data.account.length < 6 
    || data.account.length > 20
    || data.password.length < 6   
    || data.password.length > 20) 
    { return new ErrorReply(userLoginLthFail) }
  }

  function userLogin (data) {
    /**
     * @description: 用户登录处理
     * @param {Object} data 客户端请求数据
     * @return Object Promise
     */

    const result = verifyUserData(data)
    if (result && result.err_code) return result

    return new Promise(async function (resolve, reject) {
      try {

        await userAccExists(data.account)
        await userPacExists(data.password)

        // 登录成功
        resolve(new SuccessReply(userLoginSuccess))

      } catch (e) { reject(e) }
    })
  }
}

module.exports = {
  userLogin
}
