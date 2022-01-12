<!-- 订单界面商品消息 -->
<template>
  <div>
    <MyLoad :show="loading"></MyLoad>
    <div class="order-shop-title">
      深圳市百邦科技有限公司
    </div>
    <div class="order-shop-content">
      <img class="order-shop-img" :src="imgHost + shop.cover_img" />
      <div class="order-shop-content-right">
        <div>{{ shop.name }} ￥{{ shop.price }}</div>
        <div>型号: {{ shop.numbering }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MyLoad from '@/views/components/MyLoad'
export default {
  data() {
    return { shop: {}, test: '', loading: false }
  },

  components: { MyLoad },

  computed: {},

  created() {
    this.loading = true
  },

  mounted() {
    this.shop = JSON.parse(sessionStorage.getItem('shop'))
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },

  methods: {}
}
</script>
<style src="../css/shopOrder.css" scoped></style>
