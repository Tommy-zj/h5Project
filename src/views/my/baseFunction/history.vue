<!-- 浏览历史 -->
<template>
  <div>
    <MyLoad :show="loading"></MyLoad>
    <v-shop :collectShop="shops"></v-shop>
  </div>
</template>

<script>
import shop from '@/views/my/baseFunction/components/shop'
import { getHistory, deleteApi } from '@/api/history'
import MyLoad from '@/views/components/MyLoad'
export default {
  data() {
    return {
      loading: false,
      person_id: 0,
      shops: [
        { name: 1, price: 1213 },
        { name: 2, price: 1213 },
        { name: 3, price: 1213 },
        { name: 4, price: 1213 },
        { name: 5, price: 1213 }
      ]
    }
  },

  components: { 'v-shop': shop, MyLoad },

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '浏览历史')
    this.person_id = JSON.parse(this.$store.getters.getUser).id
    this.getHistoryMethod()
  },

  methods: {
    getHistoryMethod() {
      this.loading = true
      getHistory({ person_id: this.person_id })
        .then(res => {
          setTimeout(() => {
            this.shops = res.data
            this.loading = false
          }, 1500)
        })
        .catch(e => {
          console.log('获取个人浏览的时候异常: ', e)
        })
    },
    controllerDelete(id) {
      this.loading = true
      console.log('删除的id: ', id)
      deleteApi({ id: id })
        .then(res => {
          setTimeout(() => {
            this.loading = false
            this.getHistoryMethod()
          }, 2000)
        })
        .catch(error => {
          console.log('移除收藏列表报错: ', error)
        })
    }
  }
}
</script>
<style></style>
