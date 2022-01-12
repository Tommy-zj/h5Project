<!--  -->
<template>
  <div class="request-demand">
    <MyLoad ref="load" :show="show" :text="text"></MyLoad>
    <addressCard title="需求数据" :allData="demand"></addressCard>
    <demandItem :demand="demands"></demandItem>
  </div>
</template>

<script>
import addressCard from './components/addressCard'
import demandItem from './components/demandItem'
import MyLoad from '../components/MyLoad'
import { getRequest } from '../../api/baseApi.js'
import { mapGetters } from 'vuex'
import { getScrollHeight, getScrollTop, getWindowHeight } from '@/utils/screen'
export default {
  data() {
    return {
      which: '',
      allNum: 0,
      cityNum: 0,
      provinceNum: 0,
      show: false,
      recentNum: 0,
      demands: [],
      demand: { provinceNum: '', cityNum: '' },
      address: '',
      isNull: false,
      whichpage: 1,
      text: ''
    }
  },

  components: { addressCard, demandItem, MyLoad },

  mounted() {
    const demand = this.$route.query.demand
    this.which = this.$route.query.which
    console.log('demand', demand, this.which)
    this.address = this.$store.getters.getLocal
    this.getAllRequest(this.address)
    this.$store.commit('user/SET_TITLE', demand)
    window.addEventListener('scroll', this.load)
  },
  destroyed() {
    window.removeEventListener('scroll', this.load, false)
  },

  computed: {
    ...mapGetters(['getLocal'])
  },
  watch: {
    getLocal(val) {
      this.address = val
    }
  },

  methods: {
    clickProvince() {
      // console.log('请求获取省份消息')
      this.which = 'province_name'
      this.loadding = true
      this.whichpage = 1
      this.demands = []
      this.getAllRequest(this.address)
    },
    clickCity() {
      // console.log('请求获取市数据')
      this.loadding = true
      this.which = 'city_name'
      this.whichpage = 1
      this.demands = []
      this.getAllRequest(this.address)
    },
    getAllRequest(local) {
      // const that = this
      const address = local.split(' ')
      const data = {}
      data.whichpage = this.whichpage
      data.pagesize = 10
      data.which = this.which
      data.province_name = address[0]
      data.city_name = address[1]
      data.county_name = address[2]
      this.show = true
      getRequest(data)
        .then(res => {
          if (res.data.length > 0) {
            console.log('demand res', res)
            this.allNum = res.allNum
            this.cityNum = res.cityNum
            this.provinceNum = res.provinceNum
            this.recentNum = res.recentNum
            this.demands = this.demands.concat(res.data)
            this.demand.provinceNum = res.provinceNum
            this.demand.cityNum = res.cityNum
            setTimeout(() => {
              this.show = false
            }, 1500)
            return
          }
          setTimeout(() => {
            this.show = false
          }, 1500)
          this.isNull = true
        })
        .catch(error => {
          console.log('demand error', error)
        })
    },
    load() {
      const that = this
      if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 5) {
        console.log('到底了', that)
        if (this.isNull) {
          console.log('没有新消息了')
          this.$refs.load.nullData()
        } else {
          this.whichpage++
          this.getAllRequest(this.address)
        }
      }
    }
  }
}
</script>
<style src="./components/css/demandItem.css"></style>
