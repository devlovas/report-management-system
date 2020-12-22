const { isEmpty } = require('../tools/util')
const { getDays } = require('../service/createlog')
const { ErrorReply } = require('../model/reply_model')
const { createlogGetDaysDataFail, createlogGetDaysLthFail } = require('../config/status_code')

/*===========================================================
  获取天数
===========================================================*/
{
  function verifyDaysData (data) {
    /**
     * @description: 校验用户提交的数据是否合法
     * @param {Object} data 客户端请求数据
     * @return Object Reply_model
     */

    // 校验数据是否为空
    if (isEmpty(data) 
    || !('value' in data))
    { return new ErrorReply(createlogGetDaysDataFail) }

    // 去除数据前后空格
    data.value = data.value.trim()

    // 校验数据长度是否合法
    if (!data.value.length
    || data.value.length > 6)
    { return new ErrorReply(createlogGetDaysLthFail) }
  }

  function getNumberOfDays (data) {
    const result = verifyDaysData(data)
    if (result && result.err_code) return result

    return new Promise(async (resolve, reject) => {
      try {

        resolve(await getDays(data.value))

      } catch(e) { reject(e) }
    })
  }
}


module.exports = {
  getNumberOfDays
}
