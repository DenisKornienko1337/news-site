import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts'
import Categories from '../views/Categories'
import NewPost from '../views/NewPostPage'
import UpdatePost from '../views/UpdatePost'
import AddCategory from '../views/AddCategory'
import UpdateCategory from '../views/UpdateCategory'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost,
    props: true
  },
  {
    path: '/posts/update/:id',
    name: 'UpdatePost',
    component: UpdatePost,
    props: true
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/categories/add-category',
    name: 'AddCategory',
    component: AddCategory,
    props: true
  },
  {
    path: '/categories/update-category/:id',
    name: 'UpdateCategory',
    component: UpdateCategory,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
