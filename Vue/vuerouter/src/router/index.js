import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hi from '@/components/hi'
import hi1 from '@/components/hi1'
import hi2 from '@/components/hi2'
import left from '@/components/left'
import right from '@/components/right'
import Parms from '@/components/Parms'
import jspang from '@/components/jspang'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hi2',
      components: {
        default: hi2,
        left:left,
        right:right
      }
    },{
      path:'/hi',
      component:hi,
      children:[
        { path: '/', name: 'hi',component:hi},
        { path: 'hi1', name: 'hi1',component:hi1},
        { path: 'hi2', name: 'hi2',component:hi2},
      ]
      },{
         path:'/parms/:id(\d+)/:title',
         component: Parms
      },{
        path:'/parms',
        redirect:'/parms/:id(\d+)/:title'
      },{
        path:'/hi1',
        component:hi1,
        alias:'技术胖'
      }
  ]
})
