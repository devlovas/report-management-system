const { ErrorReply,
        SuccessReply
      } = require('../model/reply_model')
      
const { _sql, 
        _sql_get, 
        _sql_del, 
        _sql_insert, 
        _sql_change,
         _sql_isExists, 
         _sql_notExists
       } = require('./_mysql_query')

const { getLabelFail, getLabelSuccess,
        delLabelFail, delLabelSuccess, delLabelExistsFail,

        creatingLabelFail, creatingLabelSuccess,creatingLabelExistsFail,
        creatingProductExistsFail, creatingProductSuccess, creatingProductFail,

        getProductSuccess, getProductFail, delProductExistsFail, delProductSuccess, delProductFail, 
        chgProductExistsFail, chgProductFail, chgProductSuccess
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


/*===========================================================
  创建产品 
===========================================================*/
{
  function productNotExists (name) {
    /**
     * @description: 将用户提交的数据插入数据库中
     * @param {String} label 数据
     * @return Object Promise
     */

    return new Promise(async (resolve, reject) => {
      try{

        // 检测数据在数据库中是否已经存在
        await _sql_notExists('reportcms', 'product', 'NAME', name)
        resolve(true)

      } catch(e) { reject(new ErrorReply(creatingProductExistsFail)) }
    })
  }

  function insertDataOfProduct (data) {
    return new Promise(async (resolve, reject) => {
      try {
        // 将数据插入数据库中
        await _sql_insert('reportcms', 'product', `(NULL, '${data.name}', '${data.classify}', now())`)
        resolve(new SuccessReply({...creatingProductSuccess, result: (await getProductAllData()).result}))
      } catch(e) { reject(new ErrorReply(creatingProductFail)) }
    })
  }
}

/*===========================================================
  获取产品
===========================================================*/
{
  function getProductAllData () {
    return new Promise(async (resolve, reject) => {
      try{ 
        // 获取表中的全部产品
        const result = await _sql_get('reportcms', 'product')
        resolve(new SuccessReply({...getProductSuccess, result}))
      } catch(e) { reject(new ErrorReply(getProductFail)) }
    })
  }
}


/*===========================================================
  删除产品
===========================================================*/
{
  function productIsExists (id) {
    return new Promise(async (resolve, reject) => {
      try {

        // 检测数据在数据库中是否已经存在
        await _sql_isExists('reportcms', 'product', 'ID', id)
        resolve(true)
      } catch(e) { reject(new ErrorReply(delProductExistsFail)) }
    })
  }

  function delProductData (id) {
    return new Promise(async (resolve, reject) => {
      try {
        // 删除数据库中的分类
        await _sql_del('reportcms', 'product', 'ID', id)
        resolve(new SuccessReply({...delProductSuccess, result: (await getProductAllData()).result}))
      } catch(e) { reject(new ErrorReply(delProductFail)) }
    })
  }
}


/*===========================================================
  修改产品
===========================================================*/
{
  function productIdIsExists (id) {
    return new Promise(async (resolve, reject) => {
      try {

        // 检测数据在数据库中是否已经存在
        await _sql_isExists('reportcms', 'product', 'ID', id)
        resolve(true)
      } catch(e) { reject(new ErrorReply(chgProductExistsFail)) }
    })
  } 

  function changeProduct (data) {
    return new Promise(async (resolve, reject) => {
      try {
        await _sql_change('reportcms', 'product', `NAME='${data.name}', CLASSIFY='${data.classify}'`, data.id)
        resolve(new SuccessReply({...chgProductSuccess, result: (await getProductAllData()).result}))
      } catch(e) { reject(new ErrorReply(chgProductFail)) }
    })
  }
}



module.exports = {
  lableNotExists, lableIsExists,
  insertIntoBase, getLabelData, delLabelData,
  productIsExists, delProductData, productIdIsExists,
  productNotExists, getProductAllData, insertDataOfProduct, changeProduct
}
