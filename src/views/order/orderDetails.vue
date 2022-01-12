<!-- 订单详情 -->
<template>
  <div class="order-details">
    <sendCard></sendCard>
    <addressCard></addressCard>
    <orderContent></orderContent>
  </div>
</template>

<script>
import sendCard from './components/sendCard'
import addressCard from './components/addressCard'
import orderContent from './components/orderContent'
export default {
  data() {
    return {}
  },

  components: { sendCard, addressCard, orderContent },

  computed: {},

  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#ffffff')
    this.$store.commit('user/SET_TITLE', '订单详情')
  },

  beforeDestroy() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
  },

  methods: {}
}
</script>
<style></style>
