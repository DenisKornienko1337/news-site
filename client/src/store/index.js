import Vue from 'vue'
import Vuex from 'vuex'

import post from './models/post'
import category from './models/category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post,
    category
  }
})
