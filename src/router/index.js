import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;