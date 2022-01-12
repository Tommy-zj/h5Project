<!-- 申请售后 -->
<template>
  <div>
    <afterSalesShop></afterSalesShop>
    <div class="after-sales-content">
      <div
        class="after-sales-top-title"
        style="line-height:40px;margin-top:5px"
      >
        退货方式
      </div>
      <afterSalesMethod
        title="我要退款(无需退货)"
        details="没收到货，或与卖家协商，同意不退货只退款"
        goods="no"
      ></afterSalesMethod>
      <afterSalesMethod
        title="我要退货退款"
        details="已签收，需要退还收到的货物"
        goods="yes"
      ></afterSalesMethod>
    </div>
  </div>
</template>

<script>
import afterSalesShop from './components/afterSalesShop'
import afterSalesMethod from './components/afterSalesMethod'
export default {
  data() {
    return {}
  },

  components: { afterSalesMethod, afterSalesShop },

  computed: {},

  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#ffffff')
    this.$store.commit('user/SET_TITLE', '申请售后')
  },

  beforeDestroy() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
  },

  methods: {}
}
</script>
<style src="./components/css/afterSales.css"></style>
