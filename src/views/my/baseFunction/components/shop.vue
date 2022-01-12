<!-- 商品列表 -->
<template>
  <div>
    <div style="height:10px"></div>
    <div class="collect" v-for="(item, index) in collectShop" :key="index">
      <div @click="shop == 'yes' ? toOrder() : toShop(item.product_id, item)">
        <div class="shop-top">
          <img src="../../icon/shop.png" class="shop-icon" alt="" />
          <div>深圳市百邦科技</div>
          <div style="margin-left:10px">
            {{ item.ctime }}
          </div>
        </div>
        <div class="shop-middle">
          <img
            :src="imgHost + item.product_img"
            class="collect-shop-img"
            alt="商品图片"
          />
          <div class="shop-describe">
            <div v-text="item.product_name"></div>
            <div v-text="'￥' + item.product_price"></div>
            <div v-if="shop == 'yes'" v-text="'x' + item.number"></div>
          </div>
        </div>
      </div>

      <div class="bottomButtom">
        <div class="bottomBars" v-if="shop !== 'yes'">
          <div
            class="similar"
            @click="similar(item.second_id, item.product_name)"
          >
            看相似
          </div>
          <div class="delete" @click="toDelete(item.id)">
            删除
          </div>
        </div>
        <div class="count" v-if="shop == 'yes'">
          共计{{ item.number }}件商品 合计：￥{{ item.number * item.price }}
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

  props: { collectShop: Array, shop: String },

  components: {},

  computed: {},

  methods: {
    toShop(shopId, shop) {
      this.$router.push({
        path: '/noBottom/shopDetails',
        query: { shopId: shopId, shop: shop }
      })
    },
    toOrder() {
      this.$router.push({ path: '/order/orderDetails' })
    },
    similar(id, name) {
      this.$router.push({
        path: '/noBottom/category',
        query: { id: id, name: name }
      })
    },
    toDelete(id) {
      this.$parent.controllerDelete(id)
    }
  }
}
</script>
<style src="./css/collectShop.css"></style>
