const { ErrorReply, SuccessReply } = require('../model/reply_model')
const { _sql, _sql_get, _sql_del, _sql_insert, _sql_isExists, _sql_notExists } = require('./_mysql_query')

const { getLabelFail, getLabelSuccess,
        delLabelFail, delLabelSuccess, delLabelExistsFail,
        creatingLabelFail, creatingLabelSuccess,creatingLabelExistsFail 
      } = require('../config/status_code')



/*===========================================================
  创建分类
===========================================================*/
{
  function lableNotExists (label) {
    /**
     * @description: 将用户提交的数据插入数据库中
     * @param {String} label 数据
     * @return Object Promise
     */

    return new Promise(async (resolve, reject) => {
      try{

        // 检测数据在数据库中是否已经存在
        await _sql_notExists('reportcms', 'category', 'LABEL', label)
        resolve(true)

      } catch(e) { reject(new ErrorReply(creatingLabelExistsFail)) }
    })
  }

  function insertIntoBase (label) {
    return new Promise(async (resolve, reject) => {
      try {
        // 将数据插入数据库中
        await _sql_insert('reportcms', 'category', `(NULL, '${label}', now())`)
        resolve(new SuccessReply({...creatingLabelSuccess, result: (await getLabelData()).result}))
      } catch(e) { reject(new ErrorReply(creatingLabelFail)) }
    })
  }
}


/*===========================================================
  删除分类
===========================================================*/
{
  function lableIsExists (id) {
    return new Promise(async (resolve, reject) => {
      try {

        // 检测数据在数据库中是否已经存在
        await _sql_isExists('reportcms', 'category', 'ID', id)
        resolve(true)
      } catch(e) { reject(new ErrorReply(delLabelExistsFail)) }
    })
  }

  function delLabelData (id) {
    return new Promise(async (resolve, reject) => {
      try {
        // 删除数据库中的分类
        await _sql_del('reportcms', 'category', 'ID', id)
        resolve(new SuccessReply({...delLabelSuccess, result: (await getLabelData()).result}))
      } catch(e) { reject(new ErrorReply(delLabelFail)) }
    })
  }
}


/*===========================================================
  获取分类
===========================================================*/
{
  function getLabelData () {
    return new Promise(async (resolve, reject) => {
      try{ 
        // 获取表中的全部分类
        const result = await _sql_get('reportcms', 'category')
        resolve(new SuccessReply({...getLabelSuccess, result}))
      } catch(e) { reject(new ErrorReply(getLabelFail)) }
    })
  }
}

module.exports = {
  lableNotExists, lableIsExists,
  insertIntoBase, getLabelData, delLabelData,
}
