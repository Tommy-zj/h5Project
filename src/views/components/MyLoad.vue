<!--  加载组件,封装了nullData方法，当获取的数据为空的时候可使用,this.$refs.load.nullData()调用 -->
<template>
  <div
    class="loading-body"
    v-if="show"
    v-loading="true"
    :element-loading-text="text ? text : '加载中！'"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      style: ''
    }
  },

  props: { show: Boolean, text: String },

  watch: {
    show: {
      deep: true,
      handler(newVal, oldVal) {
        // console.log('show的值变化了: ', newVal, oldVal)
        if (!newVal) {
          document.body.style.overflow = ''
        } else {
          document.body.style.overflow = 'hidden'
        }
      }
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    nullData(show, text) {
      // console.log('子组件的方法', this.$parent)
      this.$parent.show = true
      this.$parent.text = '到底了!'
      setTimeout(() => {
        this.$parent.show = false
      }, 1500)
    }
  }
}
</script>
<style>
.loading-body {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
  opacity: 0.9;
  overflow: hidden;
}
</style>
