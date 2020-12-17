const _query_db = require('./_mysql_query')
const { ErrorReply } = require('../model/reply_model')
const { userLoginAccExistsFail, userLoginPwdExistsFail } = require('../config/status_code')

function userAccExists (account) {
  /**
   * @description: 检测用户提交的账号在数据库中是否存在
   * @param {String} account 用户提交的账号
   * @return Promise 
   */

  return new Promise(async function (resolve, reject) {
    const exists = await _query_db('reportcms', `SELECT COUNT(ACCOUNT) AS count FROM user WHERE ACCOUNT = '${account}'`)
    if (!exists[0].count) reject(new ErrorReply({...userLoginAccExistsFail, result: null}))
    else resolve(true)
  })
}

function userPacExists (password) {
  /**
   * @description: 检测用户提交的密码在数据库中是否存在
   * @param {String} password 用户提交的密码
   * @return Promise 
   */

  return new Promise(async function (resolve, reject) {
    const exists = await _query_db('reportcms', `SELECT COUNT(PASSWORD) AS count FROM user WHERE PASSWORD = MD5('${password}')`)
    if (!exists[0].count) reject(new ErrorReply({...userLoginPwdExistsFail, result: null}))
    else resolve(true)
  })
}

module.exports = {
  userAccExists,
  userPacExists
}
