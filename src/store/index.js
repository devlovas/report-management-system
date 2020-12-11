import { createStore } from 'vuex'

export default createStore({
  state: {
    notification: {
      message: '通知消息',
      offset: '-20px',
      scale: 0,
      type: 0
    }
  },
  mutations: {
    message (state, data) {
      state.notification.message = data[1]
      state.notification.offset = '10px'
      state.notification.scale = 1
      state.notification.type = data[0]

      setTimeout(() => {
        state.notification.offset = '-20px'
        state.notification.scale = 0
      }, 1500)
    }
  }
})
