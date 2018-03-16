import Vue from 'vue'
import Vuex from 'vuex'
import { getLoc,clearKey } from '../assets/js/fn.js'
Vue.use(Vuex)
// 状态
const info = '0'| getLoc('isLogin');
const state={
     Http:"https://a.solian.cc",
     userInfo: info
}
// 处理方法
const mutations={
}
// 
const filters={}
// 
const actions={}
const store= new Vuex.Store({
      state,
      filters, 
      actions,
      mutations
})
export default {store}
