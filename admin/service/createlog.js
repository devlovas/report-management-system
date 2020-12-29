const { _sql, _sql_get, _sql_insert, 
        _sql_isExists, _sql_isBaseExists, _sql_del,
        _sql_isNotBaseExists, _sql_upRepMonthTable } = require('./_mysql_query')
const { ErrorReply, SuccessReply } = require('../model/reply_model')
const { createlogGetDaysFail,
        createlogGetDaysSuccess,
        createRepMonthTableFail,
        updataRepMonthTableFail,
        createRepDaysTableFail,
        updataRepDaysTableFail,
        getDaysListTableExistsFail,
        EdatabaseError,
        getDaysListFail,
        getDaysListSuccess,
        getMonthListSuccess,
        getMonthListFail,
        updateMonthListFail,
        delReportDaysItemDataFail,
        getMonthListTableExistsFail,
        productNameExistsFail } = require('../config/status_code')

/*===========================================================
  获取天数
===========================================================*/
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



/*===========================================================
  更新月报
===========================================================*/
function createRepMonthTable (tableName) {
  return new Promise(async (resolve, reject) => {
    try {
      // 创建月报表
      await _sql('reportmonth',  'CREATE TABLE IF NOT EXISTS ' +'`'+tableName+'`'+`(\
        ID SMALLINT UNSIGNED PRIMARY KEY NOT NULL,\
        NAME CHAR(30) NOT NULL,\
        WAREHOUSE INT(8) NOT NULL,
        INSPECTION INT(8) NOT NULL,
        HOST_MACHINE INT(8) NOT NULL,
        PREV_BALANCE INT(8) NOT NULL,\
        CURR_BALANCE INT(8) NOT NULL,\
        CLASSIFY CHAR(100),\
        C_DATETIME TIMESTAMP NOT NULL)`)


      // 如果上一张表存在，则从该表中读取数据
      if (await _sql_isBaseExists('reportmonth', tableName-1) ) {

        const a1 = (await _sql('reportcms', `SELECT ID FROM product`)).map(i => i.ID)
        const a2 = (await _sql('reportmonth', 'SELECT ID FROM '+'`'+(tableName-1)+'`')).map(i => i.ID)

        // 当product 表中的数据没有发生变化, 则用reportmonth数据库表中的数据
        if (a1.join(',') === a2.join(',')) {
          (await _sql_get('reportmonth', tableName-1)).forEach(async i => {
            await _sql_insert('reportmonth', tableName, `(${i.ID}, '${i.NAME}', 0, 0, 0, ${i.CURR_BALANCE}, 0, '${i.CLASSIFY}', now())`)
          })
        }

        else {
          (await _sql_get('reportcms', 'product')).forEach(async i => {
            var CURR_BALANCE = 0
            const result = await _sql('reportmonth', 'SELECT CURR_BALANCE FROM '+'`'+(tableName-1)+'`'+` WHERE ID = ${i.ID}`)
            if (result.length) CURR_BALANCE = result[0].CURR_BALANCE
            await _sql_insert('reportmonth', tableName, `(${i.ID}, '${i.NAME}', 0, 0, 0, ${CURR_BALANCE}, 0, '${i.CLASSIFY}', now())`)
          })
        }
      }

      else {
        (await _sql_get('reportcms', 'product')).forEach(async i => {
          await _sql_insert('reportmonth', tableName, `(${i.ID}, '${i.NAME}', 0, 0, 0, 0, 0, '${i.CLASSIFY}', now())`)
        })
      }

      var timer = setInterval(async () => {
        try {
          await _sql_isBaseExists('reportmonth', tableName)
          clearInterval(timer)
          resolve()
        } catch(e) {}
      })
    } catch(e) { reject(new ErrorReply(createRepMonthTableFail)) }
  })
}

function productNameIsExists (data) {
  return new Promise(async (resolve, reject) => {
    try {
      _sql_isExists('reportmonth', data.tableNameForMonth, 'NAME', data.name)
      .then(e => resolve())
      .catch(async e =>  {
        const result = await _sql_get('reportcms', 'product', '*', `where NAME = '${data.name}'`)
        await _sql_insert('reportmonth', data.tableNameForMonth, `(${result[0].ID}, '${result[0].NAME}', 0, 0, 0, 0, 0, '${result[0].CLASSIFY}', now())`)
        resolve()
      })
    } catch(e) { reject(new ErrorReply(productNameExistsFail)) }
  })
}

function updataRepMonthTable (data) {
  return new Promise(async (resolve, reject) => {
    try {
      await _sql_upRepMonthTable(data)
      resolve()
    } catch(e) { reject(new ErrorReply(updataRepMonthTableFail)) }
  })
}

function updateReportMonth (data) {
  data.tableNameForMonth = data.time.slice(0, 6)
  return new Promise( async (resolve, reject) => {
    try {
      if (await _sql_isNotBaseExists('reportmonth', data.tableNameForMonth)) await createRepMonthTable(data.tableNameForMonth)
      await productNameIsExists(data) // 检查品名是否中数据库中存在
      await updataRepMonthTable(data)
      resolve()
    } catch(e) { reject(e) }
  })
}


/*===========================================================
  更新日报
===========================================================*/
function createRepDaysTable (data) {
  return new Promise(async (resolve, reject) => {
    try {
      // 创建日报表
      await _sql('reportdays',  'CREATE TABLE IF NOT EXISTS ' +'`'+data.tableNameForDays+'`'+`(\
        ID SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,\
        NAME CHAR(30) NOT NULL,\
        TYPE CHAR(2) NOT NULL,\
        RECEIVE CHAR(100) NOT NULL,\
        RESIDUE CHAR(100) NOT NULL,\
        COMMENT CHAR(50) NOT NULL,\
        C_DATETIME TIMESTAMP NOT NULL)`)

      resolve(resolve)
    } catch(e) { reject(new ErrorReply(createRepDaysTableFail)) }
  })
}

function updataRepDaysTable (data) {
  return new Promise(async (resolve, reject) => {
    try {
      await _sql_insert('reportdays', data.tableNameForDays, `(null, '${data.name}', '${data.type}', '${(data.rece).replaceAll(' ', ',')}', '${data.resi}', '${data.comm}', now())`)

      var timer = setInterval(async () => {
        try {
          await _sql_isBaseExists('reportdays', data.tableNameForDays)
          clearInterval(timer)
          resolve()
        } catch(e) {}
      })
    } catch(e) { reject(new ErrorReply(updataRepDaysTableFail)) }
  })
}

function updateReportDays (data) {
  data.tableNameForDays = data.time
  return new Promise( async (resolve, reject) => {
    try {
      if (await _sql_isNotBaseExists('reportdays', data.tableNameForDays)) await createRepDaysTable(data)
      await updataRepDaysTable(data)
      resolve()
    } catch(e) { reject(e) }
  })
}

/*===========================================================
  获取日报
===========================================================*/

function reportDaysTablesIsExists (data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (await _sql_isBaseExists('reportdays', data.value)) resolve()
      else reject(new ErrorReply(getDaysListTableExistsFail))
    } catch(e) { reject(new ErrorReply(EdatabaseError)) }
  })
}

function getDaysListData (data) {
  return new Promise(async (resolve, reject) => {
    try {
      // 获取表中的全部分类
      const result = await _sql_get('reportdays', data.value)
      resolve(new SuccessReply({...getDaysListSuccess, result}))
    } catch(e) { reject(new ErrorReply(getDaysListFail)) }
  })
}


/*===========================================================
  获取月报
===========================================================*/

function reportMonthTablesIsExists (data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (await _sql_isBaseExists('reportmonth', data.value)) resolve()
      else reject(new ErrorReply(getMonthListTableExistsFail))
    } catch(e) { reject(new ErrorReply(EdatabaseError)) }
  })
}

function getMonthListData (data) {
  return new Promise(async (resolve, reject) => {
    try {
      // 获取表中的全部分类
      const result = await _sql_get('reportmonth', data.value)

      for (var i=0; i<result.length; i++) {
        var cfy = result[i].CLASSIFY
        result[i].CLASSIFY = cfy ? cfy.split(',').map(v => Number(v)) : []
      }

      resolve(new SuccessReply({...getMonthListSuccess, result}))
    } catch(e) { reject(new ErrorReply(getMonthListFail)) }
  })
}

/*===========================================================
  更新月报
===========================================================*/

function updateReportMonthTable (data) {
  if (data.type === '仓库') field = 'WAREHOUSE'
  if (data.type === '检验') field = 'INSPECTION'
  if (data.type === '主机') field = 'HOST_MACHINE'

  return new Promise(async (resolve, reject) => {
    try {
      await _sql('reportmonth', 'UPDATE '+'`'+data.time.slice(0,6)+'`'+` SET ${field} = ${field} - ${data.value} WHERE NAME = "${data.name}"`)
      resolve()
    } catch(e) { reject(new ErrorReply(updateMonthListFail)) }
  })
}

/*===========================================================
  更新日报
===========================================================*/

function delReportDaysItemData (data) {
  return new Promise(async (resolve, reject) => {
    try {
      await _sql_del('reportdays', data.time, 'ID', data.id)
      resolve()
    } catch(e) { reject(new ErrorReply(delReportDaysItemDataFail)) }
  })
}

module.exports = {
  reportDaysTablesIsExists,
  reportMonthTablesIsExists,
  updateReportMonthTable,
  delReportDaysItemData,
  getDaysListData,
  getMonthListData,
  updateReportMonth,
  updateReportDays,
  getDays
}
