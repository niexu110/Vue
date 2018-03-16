// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import api from './http/api'
import http from './http/http'
import less from './assets/less/index.less'
Vue.prototype.$api=api.api
Vue.prototype.$htp=http
import touch from 'vue-directive-touch';
Vue.use(touch);
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
