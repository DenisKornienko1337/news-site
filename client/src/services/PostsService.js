import api from '@/services/api'

export default {
  fetchPosts () {
    return api().get('posts')
  },
  addNewPost (params) {
    return api().post('posts', params)
  },
  updatePost (params) {
    return api().post('posts/edit-post', params)
  },
  deletePosts(params) {
    return api().post('posts/delete-post', params)
  },
  fetchCategories() {
    return api().get('categories')
  },
  addCategory(params) {
    return api().post('categories', params)
  },
  updateCategory(params) {
    return api().post('categories/edit-category', params)
  },
  getCategory(params) {
    return api().post('categories/item', params)
  },
  getPost(params) {
    return api().post('posts/item', params)
  },
  deleteCategories(params) {
    return api().post('categories/delete-category', params)
  },
  addUser(params) {
    return api().post('users/add-user', params)
  },
  logIn(params) {
    return api().post('users/login', params)
  },
}