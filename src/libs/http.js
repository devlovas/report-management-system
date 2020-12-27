import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  return config
})

function _axios(method, data, url) {
  return new Promise(async (resolve, reject) => {
    try { resolve((await axios({ url, method, data: qs.stringify(data) })).data)
    } catch(e) { reject(e) }
  })
}

export { _axios }
