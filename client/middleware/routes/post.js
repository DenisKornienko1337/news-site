import api from '../api'

export default {
  addNewPost (params) {
    return api().post('posts', params)
  },
  updatePost (params) {
    return api().post('posts/edit-post', params)
  },
  deletePosts(params) {
    return api().post('posts/delete-post', params)
  },
  fetchPosts () {
    return api().get('posts')
  },
  getPost(params) {
    return api().post('posts/item', params)
  }
}