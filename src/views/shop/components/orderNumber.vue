<!-- 订单界面的数量选择 -->
<template>
  <div class="order-number-body">
    购买数量
    <div class="order-number-border">
      <div class="order-number-control" @click="num > 1 ? reduce() : ''">-</div>
      <div class="order-number-num" v-text="num"></div>
      <div class="order-number-control" @click="add">+</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { num: this.$store.state.order.num }
  },
  watch: {
    '$store.state.order.num'(newval, oldval) {
      console.log('变了吗order', newval)
      this.num = newval
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    reduce() {
      console.log('--')
      var num = this.num - 1
      this.$store.commit('order/SET_NUM', num)
    },
    add() {
      var num = this.num + 1
      console.log('++', num)
      this.$store.commit('order/SET_NUM', num)
    }
  }
}
</script>
<style src="../css/shopOrder.css" scoped></style>
