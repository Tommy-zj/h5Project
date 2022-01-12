<!-- 需求详情 -->
<template>
  <div>
    <MyLoad :show="loadding"></MyLoad>
    <div class="demand-details">
      <div class="demand-detalis-top">
        <div>标题: {{ demandData.description }}</div>
        <div>发起人: {{ demandData.name }}</div>
        <div>详情: {{ demandData.content }}</div>
      </div>
      <div
        class="demand-details-img"
        v-for="(item, index) in demandData.request_img"
        :key="index"
        v-if="item"
      >
        <img :src="imgHost + item" alt="" />
      </div>
      <div class="demand-details-content">
        <div>型号: {{ demandData.shop_type }}</div>
        <div>需求标签:{{ demandData.tag }}</div>
        <div>赏金: ￥{{ demandData.bounty }}</div>
        <div>发布时间: {{ demandCreateDate }}</div>
        <div class="demand-details-address">
          <img src="./icon/position.png" alt="" />
          <p>
            {{
              demandData.province_name +
                ' ' +
                demandData.city_name +
                ' ' +
                demandData.county_name
            }}
          </p>
        </div>
        <div>详细地址：{{ demandData.address }}</div>
      </div>
      <div class="demand-details-address-null"></div>
    </div>
  </div>
</template>

<script>
import MyLoad from '../components/MyLoad'
export default {
  data() {
    return {
      demandData: {},
      demandCreateDate: '',
      loadding: true
    }
  },

  components: { MyLoad },

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '需求详情')
    this.demandData = this.$route.query.demandData
    // console.log('demandData', this.demandData)
    const newDate = this.timestampToTime(1619680466976)
    // console.log('newDate', newDate)
    this.demandCreateDate = newDate
    setTimeout(() => {
      this.loadding = false
    }, 2000)
  },

  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-'
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      const D = date.getDate() + ' '
      const h = date.getHours() + ':'
      const m = date.getMinutes() + ':'
      const s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>
<style src="./components/css/demandDetails.css"></style>
