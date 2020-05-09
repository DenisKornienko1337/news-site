import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import posts from './posts.js'
import categories from './categories.js'
import login from './login.js'

Vue.use(VueRouter)

  const routes = [
  ...posts,
  ...categories,
  ...login,
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
