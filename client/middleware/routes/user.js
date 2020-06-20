import api from '../api'

export default {
  addUser(params) {
    return api().post('users/add-user', params)
  },
  logIn(params) {
    return api().post('users/login', params)
  },
  logOut() {
    return api().get('/users/logout')
  },
  isAuth() {
    return api().get('/users/auth')
  },
  getUserPosts() {
    return api().get('/posts/user')
  },
  getUserCategories() {
    return api().get('/categories/user')
  },
  getUsers(){
    return api().get('/users/')
  },
  getChatIndex(){
    return api().get('/chat')
  }
}