import Vue from 'vue'
import App from './App.vue'
import router from './router'
import isLogOut from './router/isLogOut'
import store from './store'
import services from './services/api'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Notifications from 'vue-notification'
import VuejsDialog from "vuejs-dialog"
import "materialize-css/dist/css/materialize.min.css"
import {helper} from '@/helpers/helper.js'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';


import VeeValidate from 'vee-validate';

import PostsService from '@/services/PostsService'
import config from '@/config/config'

router.beforeEach( async (to, from , next) => {
  const response = await PostsService.isAuth()
  if(!response.data.isLoggedIn) {    
    const allowedRoute = isLogOut.find(r => r === to.path)

    if(allowedRoute) next()
  } else { 
    to.matched.some(record =>  {
      record.meta.isLogged = true
    })

    next()
  }
})
Vue.use(VeeValidate);

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(BootstrapVueIcons)

Vue.use(VuejsDialog)
Vue.prototype.$helper = helper
Vue.prototype.$server_url = config.server_url



Vue.config.productionTip = false

Vue.config.productionTip = false

let vm = new Vue({
  services,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

global.vm = vm;
