import Vue from 'vue'
import Router from 'vue-router'
import WXpopularize from '@/components/WXpopularize'
import about from '@/components/about'
import code from '@/components/code'
import income from '@/components/income'

Vue.use(Router)

export default new Router({
  // 两种模式 history,hash,配置路由
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'WXpopularize',
      component: WXpopularize,
      meta:{
        'title':'全民媒婆'
      }
    },{
       path:'/about',
       name:'about',
       component:about,
       meta: {
        'title': '关于我们'
      }
    }, {
      path: '/income',
      name: 'income',
      component: income,
      meta: {
        'title': '收益明细'
      }
    }, {
      path: '/code',
      name: 'code',
      component: code,
      meta: {
        'title': '我的推荐码'
      }
    }
  ]
})
