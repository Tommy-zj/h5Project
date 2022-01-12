<!-- 我的需求 -->
<template>
  <div>
    <MyLoad :show="loading"></MyLoad>
    <topCard topName="我的需求" :state="state"></topCard>
    <div class="demand-list">
      <demandItem :demand="demand"></demandItem>
    </div>
  </div>
</template>

<script>
import topCard from './components/topCard'
import demandItem from './components/demandItem'
import { pageListDemand } from '@/api/demand'
import MyLoad from '@/views/components/MyLoad'
export default {
  data() {
    return {
      id: 1,
      loading: false,
      state: [
        { id: 0, name: '待审核' },
        { id: 1, name: '不通过' },
        { id: 2, name: '未解决' },
        { id: 3, name: '未付款' },
        { id: 4, name: '已付款' },
        { id: 5, name: '已解决' }
      ],
      status: this.$route.query.id,
      demand: []
    }
  },

  components: { topCard, demandItem, MyLoad },

  computed: {},

  mounted() {
    const name = this.$route.query.name
    console.log('name: ', name)
    var topTitle = '我的需求-' + name
    this.$store.commit('user/SET_TITLE', topTitle)
    this.getDemand()
  },

  methods: {
    getDemand() {
      this.loading = true
      const person_id = JSON.parse(this.$store.getters.getUser).id
      const params = {
        person_id: person_id,
        pageSize: 20,
        pageNo: 1,
        status: this.status
      }
      pageListDemand(params)
        .then(res => {
          this.demand = res.data
          setTimeout(() => {
            this.loading = false
          }, 1000)
        })
        .catch(error => {
          console.log('获取我的需求异常', error)
        })
    },
    changeState(id) {
      this.status = id
      this.getDemand()
    }
  }
}
</script>
<style src="./components/css/myDemand.css">
li {
  list-style: none;
}
</style>
