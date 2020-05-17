import Vue from 'vue'
import Vuex from 'vuex'

import post from './models/post'
import category from './models/category'
import user from './models/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post,
    category,
    user
  }
})
