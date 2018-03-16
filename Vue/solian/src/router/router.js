import login from '@/components/login/login'
import error from '@/components/error'
import bottom from '@/components/common/bottom'
import top from '@/components/common/top'
import index from '@/components/find/index'
import visitingCard from '@/components/find/visitingCard'
import message from '@/components/message/message'
import housekeeper from '@/components/message/housekeeper'
import my from '@/components/my/my'
import site from '@/components/my/site'

const router=[
     {
          path: '/index',
          name: 'index',
          components: {
               default: index,
               bottom: bottom
          },
          meta: {
               title: '发现'
          }
     }, {
          path: '/message',
          name: 'message',
          components: {
               default: message,
               bottom: bottom
          },
          meta: {
               title: '消息'
          }
     }, {
          path: '/my',
          name: 'my',
          components: {
               default: my,
               bottom: bottom
          },
          meta: {
               title: '个人中心'
          }
     }, {
          path: '/bottom',
          name: 'bottom',
          component: bottom
     }, {
          path: '/login',
          name: 'login',
          component: login,
          meta: {
               title: '登录/注册'
          }
     },
     {
          path: '/visitingCard',
          name: 'visitingCard',
          component: visitingCard,
          meta: {
               title: '个人名片'
          }
     },
    {
        path: '/site',
        name: 'site',
        component: site,
        meta: {
            title: '设置'
        }
    },
    {
        path: '/housekeeper',
        name: 'housekeeper',
        component: housekeeper,
        meta: {
            title: '搜恋小管家'
        }
    },
      {
          path: '*',
          name: 'error',
          component: error,
          meta: {
               title: '粗错啦'
          }
     }
]
export default router