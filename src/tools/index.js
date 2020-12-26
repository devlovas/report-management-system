import Api from '/@/api/index.js'

function dialog (store, type, message) {
  type = type != 'success' ? (type != 'error' ? 3 : 2) : 1
  store.commit('dialog', [type, message])
}

function getMaxDays (store, data) {
  const date = new Date()
  data = data || `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,0)}`
  Api.get.days({value: data}).then(data => { if (!data.err_code) { store.commit('setMaxDays', data.result) } })
  .catch(err => console.log(err))
}

function getDateTimeFormat (date) {
  /**
   * @description: 获取当前时间日期并格式化返回
   * @return String YYYY-MM-DD HH:MM:SS
   */

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, 0)
  const day = String(date.getDate()).padStart(2, 0)
  const hours = String(date.getHours()).padStart(2, 0)
  const minutes = String(date.getMinutes()).padStart(2, 0)
  const seconds = String(date.getSeconds()).padStart(2, 0)

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function getDaysListData (state, store) {
  Api.get.daysList({value: store.state.createLog.datatime[0]})
  .then(data => {
    state.daysList.data = []
    state.daysList.ware = []
    state.daysList.insp = []
    state.daysList.host = []
    if (!data.err_code) {
      store.commit('setDaysList', data.result)
      state.daysList.data = data.result
      state.daysList.ware = data.result.filter(v => v.TYPE === '仓库')
      state.daysList.insp = data.result.filter(v => v.TYPE === '检验')
      state.daysList.host = data.result.filter(v => v.TYPE === '主机')
    }
  }).catch(e => { console.log(e)})
}

function getMonthListData (state, store) {
    Api.get.monthList({value: store.state.createLog.datatime[1]})
    .then(data => {
      state.monthList.data = []
      if (!data.err_code) state.monthList.data = data.result
    }).catch(e => { console.log(e)})
}


export { dialog,
         getMaxDays,
         getDateTimeFormat,
         getDaysListData,
         getMonthListData
        }
