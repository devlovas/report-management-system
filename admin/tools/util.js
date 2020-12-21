const crypto = require('crypto')

function isEmpty (o) {
  /**
   * @description: 检测对象/数组是否为空
   * @param {Object} o 对象/数组
   * @return Boolean
   */

  if (o instanceof Array) {
    if (!o.length) return true
    return false
  }

  if (o instanceof Object) {
    if (!Object.keys(o).length) return true
    return false
  }
}

function datetime () {
  /**
   * @description: 获取当前时间日期并格式化返回
   * @return String YYYY-MM-DD HH:MM:SS
   */

  const data = new Date()
  const year = data.getFullYear()
  const month = String(data.getMonth() + 1).padStart(2, 0)
  const day = String(data.getDate()).padStart(2, 0)
  const hours = String(data.getHours()).padStart(2, 0)
  const minutes = String(data.getMinutes()).padStart(2, 0)
  const seconds = String(data.getSeconds()).padStart(2, 0)

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function md5 (s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

module.exports = {
  isEmpty,datetime,
  md5
}
