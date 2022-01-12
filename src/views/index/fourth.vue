<template>
  <div>
    <v-my-card></v-my-card>
    <v-order :items="orderDate" topTitle="我的订单"></v-order>
    <v-order :items="myProduct" topTitle="我的商品"></v-order>
    <v-order :items="myRequest" topTitle="我的需求"></v-order>
    <v-order :items="baseFunction" topTitle="基本功能"></v-order>
  </div>
</template>
<script>
import myCard from '../my/myCard'
import order from '../my/order'
export default {
  name: 'App',
  components: {
    'v-my-card': myCard,
    'v-order': order
  },
  data() {
    return {
      choose: 1,
      orderDate: [
        {
          name: '待发货',
          icon: require('../my/icon/NotSend.png'),
          router: {
            path: '/order/myOrder',
            query: { id: 0, name: '待发货' }
          }
        },
        {
          name: '待收货',
          icon: require('../my/icon/NotGet.png'),
          router: {
            path: '/order/myOrder',
            query: { id: 1, name: '待收货' }
          }
        },
        {
          name: '未支付',
          icon: require('../my/icon/NotPaid.png'),
          router: {
            path: '/order/myOrder',
            query: { id: 2, name: '未支付' }
          }
        },
        {
          name: '已完成',
          icon: require('../my/icon/finish.png'),
          router: {
            path: '/order/myOrder',
            query: { id: 3, name: '已完成' }
          }
        }
      ],
      myProduct: [
        {
          name: '待审核',
          icon: require('../my/icon/NotReview.png'),
          router: {
            path: '/baseFunction/myShop',
            query: { id: 0, name: '待审核' }
          }
        },
        {
          name: '已通过',
          icon: require('../my/icon/reviewPass.png'),
          router: {
            path: '/baseFunction/myShop',
            query: { id: 1, name: '已通过' }
          }
        },
        {
          name: '推荐商品',
          icon: require('../my/icon/recommand.png'),
          router: {
            path: '/baseFunction/myShop',
            query: { id: 2, name: '推荐商品' }
          }
        },
        {
          name: '不通过',
          icon: require('../my/icon/reviewNoPass.png'),
          router: {
            path: '/baseFunction/myShop',
            query: { id: 3, name: '不通过' }
          }
        }
      ],
      myRequest: [
        {
          name: '待审核',
          icon: require('../my/icon/NotReview.png'),
          router: {
            path: '/demand/myDemand',
            query: { id: 0, name: '待审核' }
          }
        },
        {
          name: '不通过',
          icon: require('../my/icon/reviewNoPass.png'),
          router: {
            path: '/demand/myDemand',
            query: { id: 1, name: '不通过' }
          }
        },
        {
          name: '未解决',
          icon: require('../my/icon/NotResolveIcon.png'),
          router: {
            path: '/demand/myDemand',
            query: { id: 2, name: '未解决' }
          }
        },
        {
          name: '未付款',
          icon: require('../my/icon/NotPaid.png'),
          router: {
            path: '/demand/myDemand',
            query: { id: 3, name: '未付款' }
          }
        },
        {
          name: '已付款',
          icon: require('../my/icon/NotPaid.png'),
          router: {
            path: '/demand/myDemand',
            query: { id: 4, name: '已付款' }
          }
        },
        {
          name: '已解决',
          icon: require('../my/icon/NotPaid.png'),
          router: {
            path: '/demand/myDemand',
            query: { id: 5, name: '已解决' }
          }
        }
      ],
      baseFunction: [
        {
          name: '我的收藏',
          icon: require('../my/icon/MyCollect.png'),
          router: 'baseFunction/myCollect'
        },
        {
          name: '收货地址',
          icon: require('../my/icon/AdressIcon.png'),
          router: 'baseFunction/address'
        },
        { name: '客服电话', icon: require('../my/icon/ServicePhone.png') },
        {
          name: '发布需求',
          icon: require('../my/icon/release.png'),
          router: 'baseFunction/releaseRequest'
        },
        {
          name: '发布商品',
          icon: require('../my/icon/releaseProduct.png'),
          router: 'baseFunction/releaseProduct'
        },
        {
          name: '浏览历史',
          icon: require('../my/icon/HistroyIcon.png'),
          router: 'baseFunction/history'
        },
        { name: '我的接单', icon: require('../my/icon/orders.png') },
        { name: '联系客服', icon: require('../my/icon/contactCustomer.png') }
      ]
    }
  },
  mounted() {
    this.$store.commit('user/SET_TITLE', '我的')
  },
  methods: {
    clickIndex() {
      this.choose = 1
    }
  }
}
</script>
