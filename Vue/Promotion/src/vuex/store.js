import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 状态
const state={
     Http:'https://m.quanminmeipo.com',
     isLogin:false,
     userInfo:{
          uid:3306
     }
}
// 方法 改变里面的值
const mapMutations={

}
// 过滤
const filters={

}
const actions={

}
const store=new Vuex.Store({
     state, 
})
export default store