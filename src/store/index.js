import { createStore } from 'vuex'

const data = new Date()
const year = data.getFullYear()
const month = String(data.getMonth() + 1).padStart(2, 0)
const day = String(data.getDate()).padStart(2, 0)

export default createStore({
  state: {
    dialog: {
      message: '通知消息',
      offset: '-20px',
      timer: null,
      scale: 0,
      type: 0
    },
    search: {
      inputHold: false
    },
    createLog: {
      datatime: [year+month+day, year+month],
      daysList: [],
      boxHold: false,
      maxDays: 0
    }
  },
  mutations: {
    dialog (state, data) {
      const dialog = state.dialog
      dialog.message = data[1]
      dialog.offset = '10px'
      dialog.scale = 1
      dialog.type = data[0]

      dialog.timer && clearTimeout(dialog.timer)

      dialog.timer = setTimeout(() => {
        dialog.offset = '-20px'
        dialog.scale = 0
      }, 1000)
    },
    setCreateLogBoxHold (state, data) {
      state.createLog.boxHold = data
    },
    setDataTime (state, data) {
      state.createLog.datatime.forEach((v, i) => {
        state.createLog.datatime[i] = data[i] != null ? data[i] : v
      })
    },
    setDaysList (state, data) {
      state.createLog.daysList = data
    },
    setMaxDays (state, data) {
      state.createLog.maxDays = data
    }
  }
})
