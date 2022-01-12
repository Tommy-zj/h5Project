<!-- 退货退款 -->
<template>
  <div>
    <afterSalesShop></afterSalesShop>
    <returnInfo></returnInfo>
  </div>
</template>

<script>
import afterSalesShop from './components/afterSalesShop'
import returnInfo from './components/returnInfo'
export default {
  data() {
    return {}
  },

  components: { afterSalesShop, returnInfo },

  computed: {},

  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#ffffff')
    this.$store.commit('user/SET_TITLE', '退货退款')
  },

  beforeDestroy() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
  },

  methods: {}
}
</script>
