<!-- 底部按钮 -->
<template>
  <div class="bottom-button" @click="clickMethod()" v-text="describe"></div>
</template>

<script>
export default {
  props: { describe: String },
  data() {
    return {}
  },

  components: {},

  computed: {},

  methods: {
    clickMethod() {
      this.$parent.bottomButtonMethod()
    }
  }
}
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
.bottom-button {
  z-index: 99;
  position: fixed;
  width: 80%;
  height: 50px;
  border-radius: 50px;
  background-color: #67c23a;
  line-height: 50px;
  color: white;
  text-align: center;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
}
</style>
