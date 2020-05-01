import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import posts from './posts.js'
import categories from './categories.js'

Vue.use(VueRouter)

  const routes = [
  ...posts,
  ...categories,
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  

]

const router = new VueRouter({
  routes
})

export default router
