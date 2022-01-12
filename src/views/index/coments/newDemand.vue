<template>
  <div class="shop-body">
    <p class="shop-p">
      最新需求
    </p>
    <v-demand-item></v-demand-item>
  </div>
</template>

<script>
import demandItem from '../../demand/components/demandItem'
export default {
  data() {
    return {}
  },
  components: { 'v-demand-item': demandItem },
  methods: {
    clickShop() {
      console.log('点击')
      this.$router.push('/noBottom/shopDetails')
    }
  }
}
</script>

<style>
.shop-body {
  width: 94%;
  margin: 0 auto;
}
.shop-p {
  margin: 10px 0;
}
.shop {
  background-color: white;
  padding-top: 10px;
  height: 120px;
  display: flex;
  vertical-align: middle;
  margin-bottom: 10px;
}
.shop img {
  margin-left: 10px;
  height: 110px;
}
.detalis {
  margin-left: 10px;
}
.detalis p {
  line-height: 22px;
  font-size: 12px;
}
</style>
