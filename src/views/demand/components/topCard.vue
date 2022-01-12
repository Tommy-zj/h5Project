<!-- 顶部状态选择栏 -->
<template>
  <div>
    <div
      class="my-demand-top"
      :style="{ top: (topNum > 0 ? topNum : 50) + 'px' }"
    >
      <ul style="display:flex">
        <div
          :class="'my-demand-top-item' + [id == item.id ? '-click' : '']"
          v-for="(item, index) in state"
          :key="index"
        >
          <div v-text="item.name" @click="click(item)"></div>
        </div>
      </ul>
    </div>
    <div class="my-demand-top-null"></div>
  </div>
</template>

<script>
export default {
  data() {
    return { id: 1 }
  },

  props: { state: Array, topNum: Number, topName: String },

  components: {},

  computed: {},

  mounted() {
    // console.log('fsff: ', this.$route.query.id)
    this.id = this.$route.query.id
  },
  /**
  点击顶部栏，触发父组件的changeState方法，更新数据
  **/
  methods: {
    click(item) {
      console.log('click', item)
      this.id = item.id
      this.$store.commit('user/SET_TITLE', this.topName + '-' + item.name)
      this.$parent.changeState(item.id)
    }
  }
}
</script>
<style src="./css/myDemand.css"></style>
