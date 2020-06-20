import api from '../api'

export default {
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
  deleteCategories(params) {
    return api().post('categories/delete-category', params)
  }
}