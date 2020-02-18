// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/js/flexible.js'
import axios from 'axios'
import { DatetimePicker, Popup, Loading } from 'vant'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Popup)
Vue.use(DatetimePicker)
Vue.use(Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
