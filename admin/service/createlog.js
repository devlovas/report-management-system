const { _sql } = require('./_mysql_query')
const { ErrorReply, SuccessReply } = require('../model/reply_model')
const { createlogGetDaysFail, createlogGetDaysSuccess } = require('../config/status_code')

/*===========================================================
  获取天数
===========================================================*/
{

  function getDays (value) {
    /**
     * @description: 检测数据是否在数据库中
     * @param {String} label 数据
     * @return Object Promise
     */

    return new Promise(async (resolve, reject) => {
      try{

        const result = await _sql('calendar', `SELECT COUNT(ID) as count FROM datetime WHERE YEAR = ${value.slice(0, 4)} AND MONTH = ${value.slice(-2)};`)
        if (!result[0].count) { reject(new ErrorReply(createlogGetDaysFail)) }
        else resolve(new SuccessReply({...createlogGetDaysSuccess, result: result[0].count }))

      } catch(e) { reject(new ErrorReply(createlogGetDaysFail)) }
    })
  }
}

module.exports = {
  getDays
}
