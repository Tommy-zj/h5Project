<!--  -->
<template>
  <div>
    <div class="order-body">
      <div class="order-body-line"></div>
      <div style="width:100%">
        <div class="order-body-top" v-text="topTitle"></div>
        <div class="order-body-contens">
          <div
            class="order-body-item"
            @click="clickIcon(item)"
            v-for="(item, index) in items"
            :key="index"
          >
            <img :src="item.icon" alt="" />
            <p v-text="item.name"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { items: Array, topTitle: String },
  data() {
    return {}
  },

  components: {},

  computed: {},

  methods: {
    clickIcon(router) {
      console.log('order', router)
      this.$router.push(router.router)
    }
  }
}
</script>
<style src="./css/order.css"></style>
