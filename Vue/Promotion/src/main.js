
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './util/http'
import api from './util/api'
import store from './vuex/store'
Vue.prototype.$http = http;
Vue.prototype.$api = api;

Vue.config.productionTip = false
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
