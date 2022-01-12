<!-- 退款信息 -->
<template>
  <div class="returns-info">
    <div class="returns-info-top">
      退款信息
    </div>
    <chooseItem
      :options="options"
      v-if="refund != 'yes'"
      title="货物状态"
    ></chooseItem>
    <chooseItem :options="options" title="退款原因"></chooseItem>
    <div class="returns-info-item">
      <div class="returns-info-item-left">
        退款金额
      </div>
      <div class="returns-info-item-right">
        ￥444
      </div>
    </div>
    <chooseItem
      v-if="refund != 'yes'"
      :options="options"
      title="选择退货方式"
    ></chooseItem>
  </div>
</template>

<script>
import chooseItem from './chooseItem'
export default {
  props: { refund: String },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },

  components: { chooseItem },

  computed: {},

  methods: {}
}
</script>
<style src="./css/returnInfo.css"></style>
