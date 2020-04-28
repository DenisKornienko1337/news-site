import api from '@/services/api'

export default {
  fetchPosts () {
    return api().get('posts')
  },
  addNewPost (params) {
    return api().post('posts', params)
  },
  deletePosts(params) {
    return api().post('posts/delete-post', params)
  },
  addCategory(params) {
    return api().post('posts/categories', params)
  }
}