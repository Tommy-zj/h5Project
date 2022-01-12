<!-- 退货退款方式 -->
<template>
  <div
    class="after-sales-method"
    @click="goods == 'no' ? refundMethod() : returnsMethod()"
  >
    <div class="after-sales-method-image">
      <img :src="goods == 'no' ? refund : returns" alt="" />
    </div>
    <div class="after-sales-method-content">
      <div class="after-sales-method-content-title" v-text="title"></div>
      <div v-text="details"></div>
    </div>
    <div class="after-sales-method-image-row">
      <img src="./icon/right.png" alt="" />
    </div>
  </div>
</template>

<script>
import refund from './icon/refund.png'
import returns from './icon/return.png'
export default {
  data() {
    return {
      refund: refund,
      returns: returns
    }
  },

  props: { title: String, details: String, goods: String },

  components: {},

  computed: {},

  methods: {
    returnsMethod() {
      console.log('退货退款')
      this.$router.push({ path: '/order/returns' })
    },
    refundMethod() {
      console.log('仅退款')
      this.$router.push({ path: '/order/refund' })
    }
  }
}
</script>
<style src="./css/afterSalesMethod.css"></style>
