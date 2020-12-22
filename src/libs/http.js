import axios from 'axios'
import qs from 'qs'

function _axios(method, data, url) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve((await axios({ url, method,
        header: { "Content-Type": "application/x-www-from-urlencoded" },
        data: qs.stringify(data || {})
      })).data)
    } catch(e) { reject(e) }
  })
}

export { _axios }
