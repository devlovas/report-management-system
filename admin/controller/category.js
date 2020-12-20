const { isEmpty } = require('../tools/util')
const { ErrorReply } = require('../model/reply_model')
const { lableNotExists, lableIsExists, insertIntoBase, getLabelData, delLabelData } = require('../service/category')
const { creatingLabelDataFail, creatingLabelLthFail, delLabelDataFail, delLabelLthFail } = require('../config/status_code')

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

module.exports = {
  getCategoryLabel, delCategoryLabel,
  creatingLabel
}
