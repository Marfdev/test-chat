import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ChatView from '@/views/ChatView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/',
      name: 'Chat',
      
      component: ChatView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated  = localStorage.getItem('token')
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
export default router
