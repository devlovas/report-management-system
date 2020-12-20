import axios from 'axios'
import qs from 'qs'

function axiosGet (option) {
  /**
   * @description: 封装Get请求方法
   * @param {Object} option 数据
   * @return void
   */

  axios({
    url: option.url,
    method: 'get',
    header: { "Content-Type": "application/x-www-from-urlencoded" },
    data: qs.stringify(option.data)
  })
  .then(res => { option.success(res.data) })
  .catch(err => { option.error(err) })
}

function axiosPost (option) {
  /**
   * @description: 封装Post请求方法
   * @param {Object} option 数据
   * @return void
   */

  axios({
    url: option.url,
    method: 'post',
    header: { "Content-Type": "application/x-www-from-urlencoded" },
    data: qs.stringify(option.data)
  })
  .then(res => { option.success(res.data) })
  .catch(err => { option.error(err) })
}

export { axiosGet, axiosPost }
