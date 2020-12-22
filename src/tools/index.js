import { getNumberOfDays } from '/@/service/request.js'

function dialog (store, type, message) {
  type = type != 'success' ? (type != 'error' ? 3 : 2) : 1
  store.commit('dialog', [type, message])
}

function getMaxDays (store, data) {
  const date = new Date()
  data = data || `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,0)}`
  getNumberOfDays({value: data})
  .then(data => { if (!data.err_code) { store.commit('setMaxDays', data.result) } })
  .catch(err => console.log(err))
}

export { dialog, getMaxDays }
