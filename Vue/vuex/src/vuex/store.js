import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 状态对象
const state={
     count:1
}
// 修改状态 方法
const mutations={
     add(state){
          state.count>=0?state.count++:'';
          
     },
     reduce(state){
             state.count <= 0 ? state.count = 0 : state.count --;
     }
}
// 计算过滤操作
const getters={
      count:function(state){
              return state.count+=10
      }
}
const actions={
        addAction(context){
           context.commit('add',10);
           setTimeout(() => {
             context.commit('reduce')      
           }, 2000);   
        },
        reduceAction({commit}){
                commit('reduce')
        }
}
// const modelA={
//         state, mutations, getters, actions
// }

export default new Vuex.Store({
//        modules:{a:modelA}
        state, mutations, getters, actions
})