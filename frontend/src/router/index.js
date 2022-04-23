import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import AccueilView from '../views/AccueilView.vue'
import ArticleView from '../views/ArticleView.vue'
import ForumDiscussion from '../views/ForumDiscussion.vue'
import ForumMultimedia from '../views/ForumMultimedia.vue'

const routes = [
  {
    path: '/login',
    name: 'Connexion',
    component: LoginView
  },
  {
    path: '/',
    name: 'Inscription',
    component: SignupView
  },
  {
    path: '/article',
    name: 'post',
    component: AccueilView
  },
  {
    path: '/article/text',
    name: 'forumDiscussion',
    component: ForumDiscussion,
  },
  {
    path: '/article/image',
    name: 'forumMultimedia',
    component: ForumMultimedia,
  },
  {
    path: '/article/:id',
    name: 'article',
    component: ArticleView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router