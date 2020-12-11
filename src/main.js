import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './resetcss.css'
import './index.css'

// createApp(App).mount('#app')
const app = createApp(App);
app.use(router);
app.mount('#app');
