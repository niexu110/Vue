import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import filters from './filters'
Vue.use(Vuex)
const store= new Vuex.Store({
      state,
      filters, 
      actions,
      mutations
})
export default store
