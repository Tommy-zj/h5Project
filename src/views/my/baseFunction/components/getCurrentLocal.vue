<!-- 发布需求页面 -->
<template>
  <div>
    <div class="local">
      <img src="../../icon/map.png" @click="getCurrentLocal" alt="" />
      <div v-text="local"></div>
    </div>
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      @click="clickMap"
      :double-click-zoom="true"
      style="width:100%;height:200px"
      ak="w99dyFRPo29qWt4gZRktT1bRaydyD366"
    >
      <bm-panorama></bm-panorama>
      <bm-marker
        :position="center"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
        :raiseOnDrag="true"
        :title="local"
        @dragend="dragend"
      >
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker,
  BmGeolocation,
  BmPanorama,
  BmLabel
} from 'vue-baidu-map'

export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      // 地图的缩放比例
      zoom: 13,
      addressKeyword: '广东',
      local: '北京北京市',
      BMap: '',
      location: '',
      keyword: ''
    }
  },

  components: {
    'bm-label': BmLabel,
    'bm-panorama': BmPanorama,
    'baidu-map': BaiduMap,
    'bm-geolocation': BmGeolocation,
    'bm-control': BmControl,
    'bm-view': BmView,
    'bm-auto-complete': BmAutoComplete,
    'bm-local-search': BmLocalSearch,
    'bm-marker': BmMarker
  },

  computed: {},
  mounted() {
    this.$store.commit('user/SET_TITLE', '发布需求')
    // 创建Map实例
  },

  methods: {
    clickMap(e) {
      console.log('e: ', e)
      const point = e.point
      // console.log('dragend', point)
      this.center.lng = point.lng
      this.center.lat = point.lat
      this.getLocal(this.center)
    },
    dragend(e) {
      console.log('dragend', e.currentTarget.point)
      this.getLocal(e.currentTarget.point)
    },
    handler({ BMap, map }) {
      console.log('map_handler')
      const _this = this
      _this.BMap = BMap
      _this.map = map
      _this.map_zoom = 15
      this.center.lng = 116.404
      this.center.lat = 39.915
    },
    getLocal(center) {
      const that = this
      // 百度地图坐标转换文字地址
      var myGeo = new window.BMap.Geocoder({ extensions_town: true })
      myGeo.getLocation(new window.BMap.Point(center.lng, center.lat), function(
        result
      ) {
        // console.log('result: ', result)
        if (result) {
          const area = result.address
          that.local = area
          that.$store.commit('user/SET_LOCAL', area)
          // console.log('area: ', area)
          that.addressKeyword = area
        }
      })
    },

    getCurrentLocal() {
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
        { enableHighAccuracy: true } // 获取精准位置
      )
    }
  }
}
</script>
<style>
.local {
  background-color: white;
  display: flex;
  line-height: 30px;
}
.local img {
  width: 20px;
  height: 23px;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
