<template>
  <div class="shop-body">
    <p class="shop-p" v-if="title != 'hide'">
      推荐商品
    </p>
    <div v-for="(item, index) in recommend" :key="index">
      <div class="create-time" v-if="item.create_time > 0">
        发布时间： {{ item.create_time | getFormatDate }}
      </div>
      <div class="shop" @click="clickShop(item)">
        <img :src="imgHost + item.cover_img" alt="商品图片" />
        <div class="detalis">
          <p>名称：{{ item.name }}</p>
          <p>型号：{{ item.numbering }}</p>
          <p>价格：￥{{ item.price }}</p>
          <p>浏览历史：{{ item.browsing_history }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/time'
export default {
  data() {
    return {}
  },
  props: { recommend: Array, title: String },
  filters: {
    getFormatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    clickShop(item) {
      // 点击商品，跳转到商品详情页面
      // console.log('点击')
      window.sessionStorage.setItem('shop', JSON.stringify(item))
      this.$router.push({
        path: '/noBottom/shopDetails'
      })
    }
  }
}
</script>

<style>
.shop-body {
  width: 92%;
  margin: 0 auto;
}
.shop-p {
  margin: 10px 0;
}
.shop {
  background-color: white;
  padding-top: 10px;
  height: 120px;
  display: flex;
  vertical-align: middle;
  margin-bottom: 10px;
}
.shop img {
  margin-left: 10px;
  height: 110px;
}
.detalis {
  margin-left: 10px;
}
.detalis p {
  line-height: 22px;
  font-size: 12px;
}
.create-time {
  background-color: white;
  padding: 5px 0 5px 5px;
}
</style>
