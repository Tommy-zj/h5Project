<template>
  <div class="first-body">
    <MyLoad :show="show"></MyLoad>
    <carousel :carouselProps="carousels"></carousel>
    <category :categorys="left"></category>
    <Card></Card>
    <recommend :recommend="recommend"></recommend>
    <newDemand></newDemand>
  </div>
</template>
<script>
import { getIndexData } from '@/api/baseApi.js'
import Card from './coments/card'
import category from './coments/category'
import carousel from './coments/carousel'
import recommend from './coments/recommend'
import newDemand from './coments/newDemand'
import MyLoad from '@/views/components/MyLoad'
export default {
  name: 'App',
  components: { Card, category, carousel, recommend, newDemand, MyLoad },
  data() {
    return {
      choose: 1,
      left: [],
      center: { lng: 0, lat: 0 },
      // 地图的缩放比例
      zoom: 13,
      addressKeyword: '广东',
      local: this.$store.getters.getLocal,
      recommend: [],
      carousels: [],
      show: false
    }
  },
  mounted() {
    console.log('welcome')
    this.$store.commit('user/SET_TITLE', '首页')
    this.getIndexData()
    setTimeout(() => {
      this.getCurrentLocal()
    }, 2000)
  },
  methods: {
    getIndexData() {
      this.show = true
      var indexData = JSON.parse(sessionStorage.getItem('indexData'))
      console.log('indexData: ', indexData)
      if (indexData) {
        this.left = indexData.catalog
        this.recommend = indexData.recommend
        this.carousels = indexData.carousel
        setTimeout(() => {
          this.show = false
        }, 1500)
        return
      }
      getIndexData()
        .then(res => {
          this.left = res.data.catalog
          this.recommend = res.data.recommend
          this.carousels = res.data.carousel
          setTimeout(() => {
            this.show = false
          }, 1500)
          sessionStorage.setItem('indexData', JSON.stringify(res.data))
        })
        .catch(error => {
          console.log('获取首页通用数据报错', error)
        })
    },
    clickIndex() {
      this.choose = 1
    },
    /**
     * 获取当前地区地址
     **/
    getCurrentLocal() {
      if (this.local) {
        // this.$message({
        //   message: '城市名: ' + this.local,
        //   customClass: 'jack'
        // })
        return
      }
      this.local = '北京 北京市'
      var that = this
      // console.log('父组件的方法')
      var geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(
        function(r) {
          // console.log(r)
          // console.log(r.point.lng)
          // console.log(r.point.lat)
          that.center.lng = r.point.lng
          that.center.lat = r.point.lat
          that.getLocal(that.center)
        },
        { enableHighAccuracy: false } // 获取精准位置
      )
    },
    /*
     * 根据经纬度获取当前地址
     */
    getLocal(center) {
      const that = this
      // 百度地图坐标转换文字地址
      var myGeo = new window.BMap.Geocoder({ extensions_town: true })
      myGeo.getLocation(new window.BMap.Point(center.lng, center.lat), function(
        result
      ) {
        console.log('result: ', result)
        if (result) {
          const area = result.address
          that.local = area

          const address = area.split('省')
          const city = address[1].split('市')
          const areas = city[1].split('区')
          // console.log('split address', address[0], city[0], areas[0])
          const local = address[0] + '省 ' + city[0] + '市 ' + areas[0] + '区'
          that.addressKeyword = area
          that.$store.commit('user/SET_LOCAL', local)
          // console.log('index page area: ', local)
        }
      })
    }
  }
}
</script>

<style src="./css/first.css"></style>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
