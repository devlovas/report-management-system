const { isEmpty } = require('../tools/util')
const { ErrorReply } = require('../model/reply_model')
const { lableNotExists, lableIsExists, insertIntoBase, 
        getLabelData, getProductAllData,
        delLabelData,delProductData,

        productIsExists, productNotExists,
        changeProduct, chgNameOfProduct, productIdIsExists, insertDataOfProduct
      } = require('../service/category')

const { delLabelLthFail, delLabelDataFail, 
        delProductLthFail, delProductDataFail,
        creatingLabelLthFail,  creatingLabelDataFail, 
        creatingProductLthFail, creatingProductDataFail,

        chgProductLthFail, chgProductDataFail
      } = require('../config/status_code')

/*===========================================================
  创建分类
===========================================================*/
{ 
  function verifyLabelData (data) {
    /**
     * @description: 校验用户提交的数据是否合法
     * @param {Object} data 客户端请求数据
     * @return Object Reply_model
     */

    // 校验数据是否为空
    if (isEmpty(data) || !('label' in data)) 
    { return new ErrorReply(creatingLabelDataFail) }

    // 去除数据前后空格
    data.label = data.label.trim()

    // 校验数据长度是否合法
    if (!data.label.length
    || data.label.length < 2   
    || data.label.length > 10) 
    { return new ErrorReply(creatingLabelLthFail) }
  }

  function creatingLabel (data) {
    /**
     * @description: 
     * @param {Object} data 客户端请求数据
     * @return Object Promise
     */

    const result = verifyLabelData(data)
    if (result && result.err_code) return result

    return new Promise(async (resolve, reject) => {
      try {

        // 分类在数据库中不存在
        // 则向数据库中插入数据
        await lableNotExists(data.label)
        resolve(await insertIntoBase(data.label))

      } catch(e) { reject(e) }
    })
  }
}


/*===========================================================
  删除分类
===========================================================*/
{
  function verifyDelLabelData (data) {
    /**
     * @description: 校验用户提交的数据是否合法
     * @param {Object} data 客户端请求数据
     * @return Object Reply_model
     */

    if (isEmpty(data) || !('id' in data))
    { return new ErrorReply(delLabelDataFail)}

    // 去除数据前后空格
    data.id = data.id.trim()

    // 校验数据长度是否合法
    if (!data.id.length || data.id.length > 4) 
    { return new ErrorReply(delLabelLthFail) }
  }

  function delCategoryLabel (data) {
    const result = verifyDelLabelData(data)
    if (result && result.err_code) return result

    return new Promise(async (resolve, reject) => {
      try {


        // 分类在数据库中存在
        // 则删除数据库中分类
        await lableIsExists(data.id)
        resolve(await delLabelData(data.id))

      } catch(e) { reject(e) }
    })
  }
}


/*===========================================================
  获取分类
===========================================================*/
{
  function getCategoryLabel () {
    return new Promise(async (resolve, reject) => {
      try{ 

        // 成功获取分类
        resolve(await getLabelData())

      } catch(e) { resolve(e) }
    })
  }
}


/*===========================================================
  创建产品
===========================================================*/
{
  function verifyProductData (data) {
    /**
     * @description: 校验用户提交的数据是否合法
     * @param {Object} data 客户端请求数据
     * @return Object Reply_model
     */

    // 校验数据是否为空
    if (isEmpty(data) 
    || !('name' in data)
    || !('classify' in data)) 
    { return new ErrorReply(creatingProductDataFail) }

    // 去除数据前后空格
    data.name = data.name.trim()
    data.classify = data.classify.trim()

    // 校验数据长度是否合法
    if (!data.name.length
    || data.name.length < 2   
    || data.name.length > 30
    || data.classify.length > 30) 
    { return new ErrorReply(creatingProductLthFail) }
  }

  function creatingProduct (data) {
    /**
     * @description: 
     * @param {Object} data 客户端请求数据
     * @return Object Promise
     */

    const result = verifyProductData(data)
    if (result && result.err_code) return result

    return new Promise(async (resolve, reject) => {
      try {

        // 分类在数据库中不存在
        // 则向数据库中插入数据
        await productNotExists(data.name)
        resolve(await insertDataOfProduct(data))

      } catch(e) { reject(e) }
    })

  }
}


/*===========================================================
  获取产品
===========================================================*/
{
  function getProductData () {
    return new Promise(async (resolve, reject) => {
      try{ 

        // 成功获取产品
        resolve(await getProductAllData())

      } catch(e) { resolve(e) }
    })
  }
}


/*===========================================================
  删除产品
===========================================================*/
{
  function verifyDelProductData (data) {
    /**
     * @description: 校验用户提交的数据是否合法
     * @param {Object} data 客户端请求数据
     * @return Object Reply_model
     */

    if (isEmpty(data) || !('id' in data))
    { return new ErrorReply(delProductDataFail)}

    // 去除数据前后空格
    data.id = data.id.trim()

    // 校验数据长度是否合法
    if (!data.id.length || data.id.length > 4) 
    { return new ErrorReply(delProductLthFail) }
  }

  function delCategoryProduct (data) {
    const result = verifyDelProductData(data)
    if (result && result.err_code) return result

    return new Promise(async (resolve, reject) => {
      try {


        // 分类在数据库中存在
        // 则删除数据库中分类
        await productIsExists(data.id)
        resolve(await delProductData(data.id))

      } catch(e) { reject(e) }
    })
  }
}


/*===========================================================
  修改产品
===========================================================*/
{
  function verifyChgProductData (data) {
    /**
     * @description: 校验用户提交的数据是否合法
     * @param {Object} data 客户端请求数据
     * @return Object Reply_model
     */

    // 校验数据是否为空
    if (isEmpty(data) 
    || !('id' in data)
    || !('name' in data)
    || !('classify' in data)) 
    { return new ErrorReply(chgProductDataFail) }

    // 去除数据前后空格
    data.id = data.id.trim()
    data.name = data.name.trim()
    data.classify = data.classify.trim()

    // 校验数据长度是否合法
    if (!data.id.length
    || !data.name.length
    || data.id.length > 4   
    || data.name.length < 2   
    || data.name.length > 30
    || data.classify.length > 30) 
    { return new ErrorReply(chgProductLthFail) }
  }

  function chgCategoryProduct (data) {
    /**
     * @description: 
     * @param {Object} data 客户端请求数据
     * @return Object Promise
     */

    const result = verifyChgProductData(data)
    if (result && result.err_code) return result

    return new Promise(async (resolve, reject) => {
      try {

        // 分类在数据库中不存在
        // 则向数据库中插入数据
        await productIdIsExists(data.id)
        resolve(await changeProduct(data))

      } catch(e) { reject(e) }
    })

  }
}

module.exports = {
  creatingLabel, delCategoryLabel, getCategoryLabel,
  creatingProduct, getProductData, delCategoryProduct, chgCategoryProduct
}
