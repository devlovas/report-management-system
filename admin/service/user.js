const { ErrorReply } = require('../model/reply_model')
const { _sql_isExists } = require('./_mysql_query')
const { userLoginAccExistsFail, userLoginPwdExistsFail, userLoginFail } = require('../config/status_code')


/*===========================================================
  用户登录
===========================================================*/
{
  function userAccExists (account) {
    /**
     * @description: 检测用户提交的账号在数据库中是否存在
     * @param {String} account 用户提交的账号
     * @return Promise 
     */

    return new Promise(async function (resolve, reject) {
      try {

        await _sql_isExists('reportcms', 'user', 'ACCOUNT', account)
        resolve(true)

      } catch(e) { reject(new ErrorReply(userLoginAccExistsFail)) }
    })
  }

  function userPacExists (password) {
    /**
     * @description: 检测用户提交的密码在数据库中是否存在
     * @param {String} password 用户提交的密码
     * @return Promise 
     */

    return new Promise(async function (resolve, reject) {
      try {

        await _sql_isExists('reportcms', 'user', 'PASSWORD', `MD5('${password}')`)
        resolve(true)

      } catch(e) { reject(new ErrorReply(userLoginPwdExistsFail)) }
    })
  }
}

module.exports = {
  userAccExists,
  userPacExists
}
