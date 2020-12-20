import { createStore } from 'vuex'

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
      }, 1500)
    }
  }
})
