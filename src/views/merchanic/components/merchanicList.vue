<!-- 技工列表 -->
<template>
  <div>
    <div
      class="merchanic-list"
      v-for="(item, index) in mechanics"
      :key="index"
      @click="clickMerchanic(item)"
    >
      <img :src="item.avatar" alt="" />
      <div class="merchanic-list-content">
        <div>
          {{ item.name }}
        </div>
        <div>
          {{ item.introduce }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: { mechanics: Array },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    clickMerchanic(index) {
      this.$parent.clickMerchanic(index)
    }
  }
}
</script>
<style src="./css/merchanicList.css"></style>
