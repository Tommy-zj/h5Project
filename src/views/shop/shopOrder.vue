<!-- 编辑商品订单 -->
<template>
  <div class="shop-order-body">
    <MyLoad :show="loading" :text="text"></MyLoad>
    <chooseAddress ref="address"></chooseAddress>
    <orderShopContent></orderShopContent>
    <orderNumber ref="num"></orderNumber>
    <sendMethod ref="sendMethod"></sendMethod>
    <div class="shop-order-body-order-remark">
      订单备注<input
        type="text"
        class="order-remark-input"
        placeholder="选填，请先和商家协商"
        v-model="remark"
      />
    </div>
    <div class="shop-order-bottom">
      <div>共{{ num }}件,合计{{ shop.price * num }}元</div>
      <div style="width:125px;right:4%"></div>
      <bottomMinButton text="确认支付"></bottomMinButton>
    </div>
  </div>
</template>
df
<script>
import chooseAddress from './components/chooseAddress'
import orderShopContent from './components/orderShopContent'
import orderNumber from './components/orderNumber'
import sendMethod from './components/sendMethod'
import bottomMinButton from './components/bottomMinButton'
import MyLoad from '@/views/components/MyLoad'
import { toOrder } from '@/api/order.js'
export default {
  data() {
    return {
      shop: {},
      personId: JSON.parse(this.$store.getters.getUser).id,
      address: {},
      num: this.$store.state.order.num,
      remark: '',
      loading: false,
      text: ''
    }
  },

  watch: {
    '$store.state.order.num'(newval, oldval) {
      console.log('变了吗', newval)
      this.num = newval
    }
  },
  components: {
    chooseAddress,
    orderShopContent,
    orderNumber,
    sendMethod,
    bottomMinButton,
    MyLoad
  },

  computed: {},

  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#ffffff')
    this.$store.commit('user/SET_TITLE', '确定订单')
    this.shop = JSON.parse(sessionStorage.getItem('shop'))
    console.log('refs', this.$refs.num.num, this.$refs.address.address)
  },

  destroyed() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
  },

  methods: {
    bottomMinButtonMethod() {
      this.loading = true
      this.text = '订单生成中'
      const addressEtity = this.$refs.address.address
      const shop = JSON.parse(sessionStorage.getItem('shop'))
      const address =
        addressEtity.province_name +
        '_' +
        addressEtity.city_name +
        '_' +
        addressEtity.county_name +
        '_' +
        addressEtity.detailed_adress
      const data = {
        buyer_id: this.personId,
        num: this.$refs.num.num,
        amount: shop.price,
        second_catalog_id: shop.second_catalog_id,
        shop_id: shop.id,
        shop_name: shop.name,
        shop_numbering: shop.numbering,
        address: address,
        phone: addressEtity.tel_number,
        delivery: this.$store.state.order.sendMethod,
        buyer_name: addressEtity.user_name,
        remarks: this.remark,
        shop_img: shop.cover_img
      }
      toOrder(data)
        .then(res => {
          setTimeout(() => {
            this.text = '订单已生成'
          }, 1000)
          setTimeout(() => {
            this.load = false
            this.$router.go(-1)
          }, 2000)
        })
        .catch(error => {
          console.log('提交订单的时候异常', error)
        })
      console.log(data)
    }
  }
}
</script>
<style src="./css/shopOrder.css" scoped></style>
