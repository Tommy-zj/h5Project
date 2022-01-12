<!-- 技工界面 -->
<template>
  <div class="merchanic-data">
    <MyLoad :show="loadding"></MyLoad>
    <addressCard title="技工数据" :allData="merchanicData"></addressCard>
    <merchanicList :mechanics="mechanics"></merchanicList>
  </div>
</template>

<script>
import addressCard from '../demand/components/addressCard'
import merchanicList from './components/merchanicList'
import MyLoad from '../components/MyLoad'
import { getMerchanic } from '../../api/baseApi.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loadding: true,
      which: '',
      allNum: 0,
      cityNum: 0,
      provinceNum: 0,
      recentNum: 0,
      allMerchanic: 0,
      allLocal: 0,
      allAdd: 0,
      mechanics: [],
      merchanicData: { provinceNum: '', cityNum: '' },
      address: ''
    }
  },

  components: { addressCard, merchanicList, MyLoad },

  mounted() {
    this.$store.commit('user/SET_TITLE', this.$route.query.merchanic)
    this.which = this.$route.query.which
    this.address = this.$store.getters.getLocal
    // console.log('merchanic的address', this.address)
    this.getAllMerchanic(this.address)
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
      this.loadding = true
      this.which = 'province_name'
      this.getAllMerchanic(this.address)
    },
    clickCity() {
      // console.log('请求获取市数据')
      this.loadding = true
      this.which = 'city_name'
      this.getAllMerchanic(this.address)
    },
    clickMerchanic(index) {
      console.log(index)
      this.$router.push({
        path: '/merchanic/merchanicDetails',
        query: { user: index }
      })
    },
    getAllMerchanic(local) {
      // const that = this
      const address = local.split(' ')
      const data = {}
      data.whichpage = 1
      data.pagesize = 10
      data.which = this.which
      data.province_name = address[0]
      data.city_name = address[1]
      data.county_name = address[2]
      getMerchanic(data)
        .then(res => {
          // console.log('mechanic res', res)
          this.allMerchanic = res.allNum
          this.allLocal = res.cityNum
          this.allAdd = res.recentNum
          this.mechanics = res.data
          this.merchanicData.provinceNum = res.provinceNum
          this.merchanicData.cityNum = res.cityNum
          setTimeout(() => {
            this.loadding = false
          }, 2000)
        })
        .catch(error => {
          console.log('mechanic error', error)
        })
    }
  }
}
</script>
<style>
.merchanic-data {
  width: 92%;
  margin-left: 4%;
}
</style>
