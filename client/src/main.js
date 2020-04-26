import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import services from './services/api'

Vue.config.productionTip = false

new Vue({
  services,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
