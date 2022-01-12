<!-- 订单详细内容  -->
<template>
  <div class="order-contents">
    <div class="order-contents-top">
      深圳市百邦科技有限公司
    </div>
    <div class="order-contents-content">
      <img
        src="https://img1.baidu.com/it/u=3122136587,3938996930&fm=26&fmt=auto"
        alt=""
      />
      <div class="order-contents-center">
        <div>
          型号:333
        </div>
        <div>
          重量:22kg
        </div>
      </div>
      <div class="order-contents-right">
        <div>
          实付:￥33.33
        </div>
        <div>
          单价:￥33.33
        </div>
        <div>
          数量:*1
        </div>
      </div>
    </div>
    <div class="order-contents-bottom">
      <div class="order-contents-bottom-button" @click="afterSales()">
        申请售后
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  components: {},

  computed: {},

  methods: {
    afterSales() {
      this.$router.push({ path: '/order/afterSales' })
    }
  }
}
</script>
<style src="./css/orderContent.css"></style>
