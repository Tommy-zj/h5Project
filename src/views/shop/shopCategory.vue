<!--  -->
<template>
  <div class="shop-category">
    <topSearch style="position:fixed;z-index:100000"></topSearch>
    <topCard :topNum="90" :state="state"></topCard>
    <div style="height:20px"></div>
    <recommend
      style="margin-top:20px"
      :recommend="shop"
      title="hide"
    ></recommend>
  </div>
</template>

<script>
import topSearch from './components/topSearch'
import topCard from '../demand/components/topCard'
import recommend from '../index/coments/recommend'
import { getShopBysort } from '@/api/baseApi.js'
export default {
  data() {
    return {
      state: [
        { id: 1, name: '综合' },
        { id: 2, name: '销量' },
        { id: 3, name: '价格' },
        { id: 4, name: '默认' }
      ],
      shop: []
    }
  },

  components: { topSearch, topCard, recommend },

  computed: {},

  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
    this.$store.commit('user/SET_TITLE', this.$route.query.name)
    this.getProductBySort()
  },

  beforeDestroy() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
  },

  methods: {
    getProductBySort() {
      const params = {
        second_catalog_id: 15,
        first_catalog_id: 13,
        whichpage: 1,
        pagesize: 10
      }
      getShopBysort(params)
        .then(res => {
          this.shop = res.data
        })
        .catch(e => {
          console.log('按二级分类获取商品报错', e)
        })
    }
  }
}
</script>
<style>
.shop-category {
  background-color: white;
  height: 100%;
}
</style>
