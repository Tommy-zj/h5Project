import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index/home'
import HomeNoBottom from '@/views/index/homeNoBottom'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('@/views/login/login')
    },
    {
      path: '/register',
      component: HomeNoBottom,
      children: [
        {
          path: '/',
          name: '新账号注册界面',
          component: () => import('@/views/login/register')
        }
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: '测试',
          component: () => import('@/views/index/first')
        },
        {
          path: '/second',
          name: '测试',
          component: () => import('@/views/index/second')
        },
        {
          path: '/third',
          name: '测试',
          component: () => import('@/views/index/third')
        },
        {
          path: '/fourth',
          name: '测试',
          component: () => import('@/views/index/fourth')
        }
      ]
    },
    {
      path: '/noBottom',
      component: HomeNoBottom,
      children: [
        { path: '/', component: HomeNoBottom },
        {
          path: 'category',
          name: '商品分类',
          component: () => import('@/views/shop/shopCategory')
        },
        {
          path: 'shopDetails',
          name: '商品详情',
          component: () => import('@/views/shop/shopDetails')
        },
        {
          path: 'shopOrder',
          name: '支付订单',
          component: () => import('@/views/shop/shopOrder')
        },
        {
          path: 'chatRoom',
          name: '聊天室',
          component: () => import('@/views/chat/chatRoom')
        },
        {
          path: 'myPage',
          name: '聊天室',
          component: () => import('@/views/my/myPage')
        },
        {
          path: 'becomeMechanic',
          name: '注册技工',
          component: () => import('@/views/my/becomeMechanic')
        },
        {
          path: 'modifyInfo',
          name: '修改个人信息',
          component: () => import('@/views/my/modifyInfo')
        }
      ]
    },
    {
      path: '/baseFunction',
      component: HomeNoBottom,
      children: [
        {
          path: 'myCollect',
          name: '我的收藏',
          component: () => import('@/views/my/baseFunction/myCollect')
        },
        {
          path: 'address',
          name: '收货地址',
          component: () => import('@/views/my/baseFunction/address')
        },
        {
          path: 'editAddress',
          name: '编辑地址',
          component: () => import('@/views/my/baseFunction/editAddress')
        },
        {
          path: 'history',
          name: '浏览历史',
          component: () => import('@/views/my/baseFunction/history')
        },
        {
          path: 'releaseRequest',
          name: '发布需求',
          component: () => import('@/views/my/baseFunction/releaseRequest')
        },
        {
          path: 'releaseProduct',
          name: '发布商品',
          component: () => import('@/views/my/baseFunction/releaseProduct')
        },
        {
          path: 'myShop',
          name: '我的商品',
          component: () => import('@/views/myShop/myShop')
        }
      ]
    },
    {
      path: '/demand',
      component: HomeNoBottom,
      children: [
        {
          path: 'demandList',
          name: '需求列表',
          component: () => import('@/views/demand/demand')
        },
        {
          path: 'demandDetails',
          name: '需求详情',
          component: () => import('@/views/demand/demandDetails')
        },
        {
          path: 'myDemand',
          name: '我的需求',
          component: () => import('@/views/demand/myDemand')
        }
      ]
    },
    {
      path: '/merchanic',
      component: HomeNoBottom,
      children: [
        {
          path: 'merchanic',
          name: '技工数据',
          component: () => import('@/views/merchanic/merchanic')
        },
        {
          path: 'merchanicDetails',
          name: '技工数据',
          component: () => import('@/views/merchanic/merchanicDetails')
        }
      ]
    },
    {
      path: '/order',
      component: HomeNoBottom,
      children: [
        {
          path: 'myorder',
          name: '我的订单',
          component: () => import('@/views/order/myOrder')
        },
        {
          path: 'orderDetails',
          name: '订单详情',
          component: () => import('@/views/order/orderDetails')
        },
        {
          path: 'afterSales',
          name: '退货详情',
          component: () => import('@/views/order/afterSales')
        },
        {
          path: 'returns',
          name: '退货退款界面',
          component: () => import('@/views/order/returns')
        },
        {
          path: 'refund',
          name: '仅退款界面',
          component: () => import('@/views/order/refund')
        }
      ]
    }
  ]
})
