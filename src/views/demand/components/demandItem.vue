<!-- 需求列表 -->
<template>
  <div>
    <div
      @click="demandDetails(item)"
      class="demand-list-item"
      v-for="(item, index) in demand"
      :key="index"
    >
      <div class="demand-list-item-top">
        <img src="../icon/pressing.png" alt="" />
        {{ item.tag }}
      </div>
      <div class="demand-list-item-content">
        <div>
          {{ item.content }}
        </div>
        <div>商品类型: {{ item.shop_type }}</div>
        <div>
          {{
            item.province_name + ' ' + item.city_name + ' ' + item.county_name
          }}
        </div>
      </div>
      <div class="demand-list-item-null"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: { demand: Array },
  components: {},

  computed: {},

  methods: {
    demandDetails(data) {
      this.$router.push({
        path: '/demand/demandDetails',
        query: { demandData: data }
      })
    }
  }
}
</script>
<style src="./css/demandItem.css"></style>
