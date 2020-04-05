import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import PersonCeneter from '@/pages/PersonCeneter'
import MyOrder from '@/pages/PersonCeneter/MyOrder'
import GroupBuy from '@/pages/PersonCeneter/GroupBuy'
import AddCartSuccess from '@/pages/AddCartSuccess'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import {getUserInfo} from '@/utils/storageUtils'

/* 
所有静态路由配置的数组
*/
export default [
  {
    path: '/',
    component: Home
  },

  {
    path: '/search/:keyword?', // params参数可传可不传
    component: Search
  },

  {
    path: '/register',
    component: Register,
    meta: { // 需要隐藏footer的路由配置
      isHideFooter: true
    }
  },

  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true
    },
    beforeEnter(to, from, next) {
      if (getUserInfo().token) {// 如果已登陆, 直播跳转到首页
        next('/')
      } else {
        next();
      }
    }
  },
  {
    path: '/detail/:skuId',
    component: Detail
  },
  {
    path: '/center',
    component: PersonCeneter,
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'groupbuy',
        component: GroupBuy
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },

  {
    path: '/paysuccess',
    component: PaySuccess
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    props: route => ({
      skuNum: route.query.skuNum,
      skuId: route.query.skuId
    }),
  },
  
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/trade',
    component: Trade,
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        next('/shopcart')
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    props: route => ({
      orderId: route.query.orderId
    }),
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next('/shopcart')
      }
    }
  },
]
