const path = require('path')

export default {
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8888/reportcms/',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}