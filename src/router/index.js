import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('/@/views/Login.vue')
  },
  { 
    path: '/home', 
    name: 'home', 
    component: () => import('/@/views/Home.vue')
  },
  { 
    path: '/report', 
    name: 'report', 
    component: () => import('/@/views/Report.vue')
  },
  { 
    path: '/category', 
    name: 'category', 
    component: () => import('/@/views/Category.vue')
  },
  { 
    path: '/setting', 
    name: 'setting', 
    component: () => import('/@/views/Setting.vue')
  },
  
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  Number(localStorage.loginFlag) ? next() : next('/login')
})

export default router;
