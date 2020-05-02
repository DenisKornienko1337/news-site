import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import services from './services/api'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationProvider } from 'vee-validate'
import { extend } from 'vee-validate'
import Notifications from 'vue-notification'
import VuejsDialog from "vuejs-dialog"
import "materialize-css/dist/css/materialize.min.css"


extend('positive', value => {
  return value.length-1;
});

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(BootstrapVueIcons)
Vue.component('ValidationProvider', ValidationProvider)
Vue.use(VuejsDialog)


Vue.config.productionTip = false

Vue.config.productionTip = false

let vm = new Vue({
  services,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

global.vm = vm;
