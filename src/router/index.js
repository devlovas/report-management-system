import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/home' },
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('../views/Login.vue')
  },
  { 
    path: '/home', 
    name: 'home', 
    component: () => import('../views/Home.vue')
  },
  { 
    path: '/report', 
    name: 'report', 
    component: () => import('../views/Report.vue')
  },
  { 
    path: '/classify', 
    name: 'classify', 
    component: () => import('../views/Classify.vue')
  },
  { 
    path: '/setting', 
    name: 'setting', 
    component: () => import('../views/Setting.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
