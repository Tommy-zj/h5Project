<!-- 我的商品页面 -->
<template>
  <div>
    <MyLoad :show="show"></MyLoad
    ><topCard :state="state" topName="我的商品"></topCard>
    <recommend :recommend="shops" title="hide"></recommend>
  </div>
</template>

<script>
import topCard from '@/views/demand/components/topCard'
import MyLoad from '@/views/components/MyLoad'
import recommend from '@/views/index/coments/recommend'
import { getPersonProduct } from '@/api/addProduct'
export default {
  data() {
    return {
      state: [
        { id: 0, name: '待审核' },
        { id: 1, name: '已通过' },
        { id: 2, name: '推荐商品' },
        { id: 3, name: '不通过' }
      ],
      state_id: this.$route.query.id,
      show: false,
      shops: [],
      pageNo: 1,
      person_id: JSON.parse(this.$store.getters.getUser).id
    }
  },

  components: { topCard, MyLoad, recommend },

  computed: {},

  mounted() {
    const name = this.$route.query.name
    console.log('name: ', name)
    var topTitle = '我的商品-' + name
    this.$store.commit('user/SET_TITLE', topTitle)
    this.getPersonProduct()
  },

  methods: {
    /*
    点击顶部状态栏，刷新商品列表
    */
    changeState(id) {
      console.log('点击的id: ', id)
      this.state_id = id
      this.getPersonProduct()
    },
    getPersonProduct() {
      const params = {
        person_id: this.person_id,
        pagesize: 10,
        whichpage: this.pageNo,
        status: this.state_id
      }
      getPersonProduct(params)
        .then(res => {
          this.shops = res.data
        })
        .catch(error => {
          console.log('获取个商品异常: ' + error)
        })
    }
  }
}
</script>
<style></style>
