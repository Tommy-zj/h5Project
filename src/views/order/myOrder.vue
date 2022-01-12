<!-- 我的订单列表 -->
<template>
  <div>
    <MyLoad :show="show"></MyLoad>
    <topCard topName="我的订单" :state="state"></topCard>
    <order :collectShop="shop" shop="yes"></order>
  </div>
</template>

<script>
import topCard from '../demand/components/topCard'
import order from './order'
import MyLoad from '@/views/components/MyLoad'
import { getOrder } from '@/api/order'
export default {
  data() {
    return {
      state: [
        { id: 0, name: '待发货' },
        { id: 1, name: '待收货' },
        { id: 2, name: '未支付' },
        { id: 3, name: '已完成' }
      ],
      state_id: this.$route.query.id,
      show: false,
      shop: [],
      person_id: JSON.parse(this.$store.getters.getUser).id
    }
  },

  components: { topCard, order, MyLoad },

  computed: {},

  mounted() {
    const name = this.$route.query.name
    console.log('name: ', name)
    var topTitle = '我的订单-' + name
    this.$store.commit('user/SET_TITLE', topTitle)
    this.getOrder()
  },

  methods: {
    getOrder() {
      this.show = true
      const params = {
        buy_id: this.person_id,
        pageSize: 20,
        pageNo: 1,
        status: this.state_id
      }
      getOrder(params)
        .then(res => {
          this.shop = res.data
          setTimeout(() => {
            this.show = false
          }, 1500)
        })
        .catch(error => {
          console.log('获取个人订单列表报错', error)
        })
    },
    changeState(state_id) {
      // console.log('获取不同状态的订单数消息')
      this.state_id = state_id
      this.getOrder()
    }
  }
}
</script>
<style></style>
