<template>
  <div>
    <div class="request">
      <div class="request-top">当前地址: {{ address }}</div>
      <div class="request-title">需求数据</div>
      <div class="request-contents">
        <div class="request-item" @click="demandDetails('全部需求')">
          <p>{{ allNum }}</p>
          <div></div>
          <span>全部需求</span>
        </div>
        <div
          class="request-item"
          @click="demandDetails('最新新增需求', 'recent')"
        >
          <p>{{ recentNum }}</p>
          <div></div>
          <span>最近新增需求</span>
        </div>
        <div
          class="request-item"
          @click="demandDetails('附近需求', 'city_name')"
        >
          <p>{{ cityNum }}</p>
          <div></div>
          <span>附近需求</span>
        </div>
      </div>
    </div>

    <div class="request">
      <div class="request-title">技工数据</div>
      <div class="request-contents">
        <div class="request-item" @click="merchanicDetails('全部技工', '')">
          <p>{{ allMerchanic }}</p>
          <div></div>
          <span>全部技工</span>
        </div>
        <div
          class="request-item"
          @click="merchanicDetails('本地技工', 'city_name')"
        >
          <p>{{ allLocal }}</p>
          <div></div>
          <span>本地技工</span>
        </div>
        <div
          class="request-item"
          @click="merchanicDetails('昨日新增技工', 'recent')"
        >
          <p>{{ allAdd }}</p>
          <div></div>
          <span>昨日新增技工</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest, getMerchanic } from '../../../api/baseApi.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Card',
  data() {
    return {
      index: 0,
      which: '',
      allNum: 0,
      cityNum: 0,
      provinceNum: 0,
      recentNum: 0,
      allMerchanic: 0,
      allLocal: 0,
      allAdd: 0,
      address: ''
    }
  },
  computed: {
    ...mapGetters(['getLocal'])
  },
  watch: {
    getLocal(val) {
      this.address = val
      console.log('发生变化，重新获取地区信息')
      this.getAllRequest(this.address)
      this.getAllMerchanic(this.address)
    }
  },
  mounted() {
    this.address = this.$store.getters.getLocal
    this.getAllRequest(this.address)
    this.getAllMerchanic(this.address)
  },
  methods: {
    getAllRequest(local) {
      if (!local) {
        local = '北京 北京市'
      }
      // const that = this
      const address = local.split(' ')
      const data = {}
      data.whichpage = 1
      data.pagesize = 0
      data.which = this.which
      data.province_name = address[0]
      data.city_name = address[1]
      data.county_name = address[2]
      getRequest(data)
        .then(res => {
          // console.log('car res', res)
          this.allNum = res.allNum
          this.cityNum = res.cityNum
          this.recentNum = res.recentNum
        })
        .catch(error => {
          console.log('card error', error)
        })
    },
    getAllMerchanic(local) {
      if (!local) {
        local = '北京 北京市'
      }
      // const that = this
      const address = local.split(' ')
      const data = {}
      data.whichpage = 1
      data.pagesize = 0
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
        })
        .catch(error => {
          console.log('mechanic error', error)
        })
    },
    demandDetails(name, which) {
      // console.log('name : ', name)
      // this.$store.commit('user/SET_TITLE', name)
      this.$router.push({
        path: '/demand/demandList',
        query: { demand: name, which: which }
      })
    },
    merchanicDetails(name, which) {
      this.$router.push({
        path: '/merchanic/merchanic',
        query: { merchanic: name, which: which }
      })
    }
  }
}
</script>

<style src="../css/first.css"></style>
