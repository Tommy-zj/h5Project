<!-- 退款界面选择项 -->
<template>
  <div class="returns-info-item">
    <!-- 带标题 -->
    <div
      class="weui-cell weui-cell_select weui-cell_select-after"
      style="position: relative;width:100%"
    >
      <div class="weui-cell__hd">
        <label for="" class="weui-label" v-text="title"></label>
      </div>
      <div class="weui-cell__bd">
        <select class="weui-select" name="">
          <option
            :value="value"
            v-text="item.label"
            v-for="(item, index) in options"
            :key="index"
          ></option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { value: '' }
  },

  props: { options: Array, title: String },

  components: {},

  computed: {},

  methods: {}
}
</script>
<style src="./css/returnInfo.css"></style>
