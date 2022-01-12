<!-- 收藏界面 -->
<template>
  <div>
    <MyLoad :show="loading"></MyLoad>
    <shop :collectShop="shop"></shop>
  </div>
</template>

<script>
import shop from './components/shop'
import { getCollect, removeApi } from '@/api/collect'
import MyLoad from '@/views/components/MyLoad'
export default {
  data() {
    return {
      loading: false,
      person_id: 0,
      shop: [
        { name: 1, price: 1213 },
        { name: 2, price: 1213 },
        { name: 3, price: 1213 },
        { name: 4, price: 1213 },
        { name: 5, price: 1213 }
      ]
    }
  },
  components: { shop, MyLoad },

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '我的收藏')
    this.person_id = JSON.parse(this.$store.getters.getUser).id
    this.getCollectMethod()
  },

  methods: {
    getCollectMethod() {
      this.loading = true
      getCollect({ person_id: this.person_id, pageSize: 20, pageNo: 1 })
        .then(res => {
          this.shop = res.data
          console.log('获取到的收藏商品', res.data)
          setTimeout(() => {
            this.loading = false
          }, 1000)
        })
        .catch(error => {
          console.log('获取个人收藏报错', error)
        })
    },
    controllerDelete(id) {
      this.loading = true
      console.log('删除的id: ', id)
      removeApi({ id: id })
        .then(res => {
          setTimeout(() => {
            this.loading = false
            this.getCollectMethod()
          }, 1000)
        })
        .catch(error => {
          console.log('移除收藏列表报错: ', error)
        })
    }
  }
}
</script>
<style></style>
