import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/src/views/Home.vue'
import Posts from '@/src/views/posts/Posts'
import Categories from '@/src/views/categories/Categories'
import NewPost from '@/src/views/posts/NewPostPage'
import UpdatePost from '@/src/views/posts/UpdatePost'
import AddCategory from '@/src/views/categories/AddCategory'
import UpdateCategory from '@/src/views/categories/UpdateCategory'
import SingleCategory from '@/src/views/categories/SingleCategory'

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
  },
  {
    path: '/categories/:id',
    name: 'SingleCategory',
    component: SingleCategory,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
