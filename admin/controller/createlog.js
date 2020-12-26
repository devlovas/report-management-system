const { isEmpty } = require('../tools/util')
const { getDays } = require('../service/createlog')
const { ErrorReply, SuccessReply } = require('../model/reply_model')
const { updateReportMonth,
        updateReportDays,
        reportDaysTablesIsExists,
        reportMonthTablesIsExists,
        updateReportMonthTable,
        delReportDaysItemData,
        getDaysListData, getMonthListData } = require('../service/createlog')

const { createlogGetDaysDataFail, 
        createlogGetDaysLthFail, 
        addReportDaysDataFail,
        addReportDaysSuccess,
        getDaysListDataFail,
        getDaysListDataLthFail,
        getMonthListDataFail,
        getMonthListDataLthFail,
        delReportDaysItemDataSuccess,
        addReportDaysLthFail } = require('../config/status_code')

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


/*===========================================================
  插入日报
===========================================================*/
{
	function verifyRepirtDays (data) {

    // 校验数据是否为空
    if (isEmpty(data)
    || !('name' in data)
    || !('time' in data)
    || !('type' in data)
    || !('rece' in data)
    || !('resi' in data)
    || !('comm' in data)
		)
    { return new ErrorReply(addReportDaysDataFail) }

    // 去除数据前后空格
    data.name = data.name.trim()
    data.time = data.time.trim()
    data.type = data.type.trim()
    data.rece = data.rece.trim()
    data.resi = data.resi.trim()
    data.comm = data.comm.trim()

    // 校验数据长度是否合法
    if (!data.name.length
    || !data.time.length
    || !data.type.length 
    || !data.rece.length
    || !data.resi.length
    || !data.comm.length
    || data.name.length > 30
    || data.time.length > 8
    || data.type.length > 2
    || data.rece.length > 8
    || data.resi.length > 6
    || data.comm.length > 50)
    { return new ErrorReply(addReportDaysLthFail) }
	}

	function addReportDays (data) {

		const result = verifyRepirtDays(data)
    if (result && result.err_code) return result

    return new Promise(async (resolve, reject) => {
      try {

        await updateReportDays(data) // 更新日报
        await updateReportMonth(data) // 更新月报
        console.log()
        resolve(new SuccessReply({...addReportDaysSuccess, result: (await getReportDaysList({value: data.time})).result}))
      } catch(e) { reject(e) }
    })
	}
}

/*===========================================================
  获取日报
===========================================================*/

function verifyGetReportDaysListData (data) {
    // 校验数据是否为空
    if (isEmpty(data)
    || !('value' in data))
    { return new ErrorReply(getDaysListDataFail) }

    // 去除数据前后空格
    data.value = data.value.trim()

    // 校验数据长度是否合法
    if (!data.value.length
    || data.value.length > 8)
    { return new ErrorReply(getDaysListDataLthFail) }
}

function getReportDaysList (data) {
  const result = verifyGetReportDaysListData(data)
  if (result && result.err_code) return result

  return new Promise(async (resolve, reject) => {
    try {
      await reportDaysTablesIsExists(data)
      resolve(await getDaysListData(data))
    } catch(e) { reject(e) }
  })
}


/*===========================================================
  获取月报
===========================================================*/

function verifyGetReportMonthListData (data) {
    // 校验数据是否为空
    if (isEmpty(data)
    || !('value' in data))
    { return new ErrorReply(getMonthListDataFail) }

    // 去除数据前后空格
    data.value = data.value.trim()

    // 校验数据长度是否合法
    if (!data.value.length
    || data.value.length > 6)
    { return new ErrorReply(getMonthListDataLthFail) }
}

function getReportMonthList (data) {
  const result = verifyGetReportMonthListData(data)
  if (result && result.err_code) return result

  return new Promise(async (resolve, reject) => {
    try {
      await reportMonthTablesIsExists(data)
      resolve(await getMonthListData(data))
    } catch(e) { reject(e) }
  })
}


/*===========================================================
  删除日报
===========================================================*/

function delReportDays (data) {
  return new Promise(async (resolve, reject) => {
    try {
      await updateReportMonthTable(data)
      await delReportDaysItemData(data)
      resolve(new SuccessReply(delReportDaysItemDataSuccess))
    } catch(e) { reject(e) }
  })
}

module.exports = {
  getNumberOfDays,
  getReportDaysList,
  getReportMonthList,
  delReportDays,
  addReportDays
}

