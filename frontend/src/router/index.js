import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import OneArticle from '../views/OneArticle.vue'
import ForumDiscussion from '../views/ForumDiscussion.vue'
import ForumMultimedia from '../views/ForumMultimedia.vue'
import ProfilView from '../views/ProfilView.vue'
import ForumAdmin from '../views/ForumAdmin.vue'
import OneArticleAdmin from '../views/OneArticleAdmin.vue'


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
    component: OneArticle
  },
  {
    path: '/article/:id/admin',
    name: 'articleAdmin',
    component: OneArticleAdmin
  },
  {
    path: '/profil',
    name: 'Profil',
    component: ProfilView
  },
  {
    path: '/article',
    name: 'forumAdmin',
    component: ForumAdmin,
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router