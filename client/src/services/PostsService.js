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
  deleteCategories(params) {
    return api().post('categories/delete-category', params)
  },
}