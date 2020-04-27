import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import services from './services/api'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  services,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
