import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../vuex/store.js'

let useInfo = store.state.userInfo;
Vue.use(Router)

const router= new Router({
  mode:"hash",
  linkActiveClass: 'is-active',
  routes
})
console.log(useInfo)
router.beforeEach((to,from,next)=>{
     // 用户是否已经登录 0为未登录
      if(useInfo==0&&to.path!='/login'){
        next('/login');   
      }else{
        next()
     }   
})
router.afterEach(route => {})
export default router