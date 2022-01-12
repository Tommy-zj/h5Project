<!-- 商品详情页 -->
<template>
  <div class="body">
    <MyLoad :show="loading"></MyLoad>
    <img class="shop-img" :src="imgHost + shop.cover_img" alt="" />
    <div class="shop-describe">
      <div class="describe-item">
        <p>商品名称：{{ shop.name }}</p>
        <p>商品价格: ￥{{ shop.price }}</p>
      </div>
      <div class="describe-item">
        <p>商品编码：{{ shop.numbering }}</p>
        <p>
          产地:
          {{
            shop.province_name + ' ' + shop.city_name + ' ' + shop.county_name
          }}
        </p>
      </div>
      <div class="describe-item">
        <p>历史销量：{{ shop.browsing_history }}</p>
        <p>商品详情: {{ shop.detail }}</p>
      </div>
    </div>
    <div class="bottom-img">
      <div v-for="(item, index) in shop.imgs" :key="index">
        <img class="shop-img" :src="imgHost + item" alt="" />
      </div>
    </div>
    <div class="bottom-bar">
      <img
        @click="deleteCollect"
        v-if="collect"
        src="../../images/icon/collected.png"
        alt=""
      />
      <img
        @click="addCollect(shop)"
        v-if="!collect"
        src="../../images/icon/collect.png"
        alt=""
      />
      <bottom-min-button right="right:4%"></bottom-min-button>
    </div>
    <div class="bottom-null"></div>
  </div>
</template>

<script>
import { getShopExtra } from '@/api/baseApi'
import { getShopByShopId, isCollect, deleteApi, addApi } from '@/api/collect'
import MyLoad from '@/views/components/MyLoad'
import { historyAddApi } from '@/api/history'
import bottomMinButton from './components/bottomMinButton'
export default {
  name: 'ShopDetails',
  components: { bottomMinButton, MyLoad },
  data() {
    return {
      loading: false,
      collect: false,
      shop: {},
      shopId: 0,
      personId: 0
    }
  },
  mounted() {
    this.$store.commit('user/SET_TITLE', '商品详情')
    this.shop = JSON.parse(window.sessionStorage.getItem('shop'))
    this.shopId = this.$route.query.shopId
    console.log('商品和商品id', this.shop, this.shopId)
    this.loading = true
    this.personId = JSON.parse(this.$store.getters.getUser).id
    this.getShopExtraMethod()
  },
  methods: {
    getShopExtraMethod() {
      // 获取商品的额外信息
      // console.log('shopId', this.shopId)
      const query = {
        id: 0
      }
      if (this.shopId) {
        this.getShopByShopIdMethod()
        return
      }

      query.id = this.shop.id
      getShopExtra(query)
        .then(res => {
          const self = this
          const shop = Object.assign(self.shop, res.data)
          this.shop = shop
          window.sessionStorage.setItem('shop', JSON.stringify(this.shop))
          this.shopId = shop.id
          this.isCollectMethod()
          this.historyAddMethod()
          setTimeout(function() {
            self.loading = false
          }, 1000)
        })
        .catch(error => {
          console.log('shopDetails error', error)
        })
    },
    getShopByShopIdMethod() {
      getShopByShopId({ id: this.shopId })
        .then(res => {
          this.loading = false
          this.shop = res.user
          window.sessionStorage.setItem('shop', JSON.stringify(this.shop))
          // console.log('SHoip', this.shop)
          this.isCollectMethod()
          this.historyAddMethod()
        })
        .catch(e => {
          console.log('获取商品详情出错')
        })
    },
    isCollectMethod() {
      isCollect({ person_id: this.personId, product_id: this.shopId })
        .then(res => {
          this.collect = res.data
        })
        .catch(error => {
          console.log('判断商品是否被收藏异常', error)
        })
    },
    deleteCollect() {
      // 点击删除商品
      deleteApi({ person_id: this.personId, product_id: this.shopId })
        .then(res => {
          this.isCollectMethod()
        })
        .catch(res => {
          console.log('取消收藏异常: ', res)
        })
    },
    addCollect(shop) {
      // 点击收藏商品
      const params = {
        person_id: this.personId,
        product_id: this.shopId,
        product_img: shop.imgs[0],
        product_price: shop.price,
        product_name: shop.name,
        second_id: shop.second_catalog_id
      }
      addApi(params)
        .then(res => {
          this.isCollectMethod()
        })
        .catch(res => {
          console.log('添加收藏异常: ', res)
        })
    },
    bottomMinButtonMethod(shop) {
      // 点击支付现金
      console.log('orderShop: ', shop)
      this.$router.push({
        query: { shop: this.shop },
        path: '/noBottom/shopOrder'
      })
    },
    historyAddMethod() {
      // 添加浏览信息
      const shop = this.shop
      const params = {
        person_id: this.personId,
        product_id: this.shopId,
        product_img: shop.imgs[0],
        product_price: shop.price,
        product_name: shop.name,
        second_id: shop.second_catalog_id
      }
      historyAddApi(params)
        .then(res => {
          console.log('添加商品浏览历史成功了!: ', res)
        })
        .catch(error => {
          console.log('添加商品浏览历史异常: ', error)
        })
    }
  }
}
</script>
<style src="./css/shopDetails.css"></style>
