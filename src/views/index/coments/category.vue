<template>
  <div>
    <div class="category">
      <div
        class="category-item-first"
        v-for="(item, index) in categorys"
        :key="index"
        @click="toCategory(index)"
      >
        <span style="height:70px">
          <img :src="imgHost + item.icon" class="category-icon" alt="" />
          <div></div>
          <span style="category-font" v-text="item.catalog_name"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: { categorys: Array },
  data() {
    return {
      index: 0
    }
  },
  methods: {
    toCategory(index) {
      this.$store.commit('user/SET_CHOOSE', 2)
      this.$router.push({
        path: '/second',
        query: { index: index }
      })
    }
  }
}
</script>

<style src="../css/first.css"></style>
