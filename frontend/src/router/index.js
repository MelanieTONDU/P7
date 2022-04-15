import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Inscription',
    component: SignupView
  },
  {
    path: '/login',
    name: 'Connexion',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
