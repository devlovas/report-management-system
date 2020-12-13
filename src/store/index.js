import { createStore } from 'vuex'

export default createStore({
  state: {
    notification: {
      message: '通知消息',
      offset: '-20px',
      timer: null,
      scale: 0,
      type: 0
    }
  },
  mutations: {
    message (state, data) {
      const notification = state.notification
      notification.message = data[1]
      notification.offset = '10px'
      notification.scale = 1
      notification.type = data[0]

      notification.timer && clearTimeout(notification.timer)

      notification.timer = setTimeout(() => {
        notification.offset = '-20px'
        notification.scale = 0
      }, 1500)
    }
  }
})
