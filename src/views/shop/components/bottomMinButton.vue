<!-- 底部小按钮 -->
<template>
  <div>
    <button
      type="primary"
      class="bottom-min-button"
      @click="FaterMethod()"
      v-text="text ? text : '支付定金'"
      :style="'position:absolute;' + right"
    ></button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: { text: String, right: String },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    FaterMethod() {
      this.$parent.bottomMinButtonMethod()
    }
  }
}
</script>
<style>
.bottom-min-button {
  height: 40px;
  width: 120px;
  border-radius: 40px;
  line-height: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
</style>
