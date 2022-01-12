<template>
  <div>
    <el-carousel style="width:92%;margin-left:4%;height:150px">
      <el-carousel-item
        v-for="(item, index) in carousels"
        :key="index"
        style="height:100%;width:100%;"
      >
        <img
          style="height:100%;width:100%;"
          :src="imgHost + item.image_url"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getCarousel } from '@/api/baseApi'
export default {
  data() {
    return {
      carousels: []
    }
  },
  props: { carouselProps: Array },
  mounted() {
    this.getCarousels()
  },
  watch: {
    // carouselProps: {
    //   handler(val) {
    //     console.log('carouselProps变化了: ', val)
    //     this.carousels = val
    //   }
    // }
    carouselProps(newval, oldval) {
      console.log('carouselProps变化了: ', newval)
      this.carousels = newval
    }
  },
  methods: {
    getCarousels() {
      console.log('this.carouselProps: ', this.carouselProps)
      if (this.carouselProps) {
        this.carsousels = this.carouselProps
        return
      }
      var carousels = JSON.parse(sessionStorage.getItem('carsousels'))
      if (carousels) {
        this.carousels = carousels
        return
      }
      carousels = this.$parent.carousels
      if (carousels) {
        this.carousels = carousels
        return
      }
      getCarousel()
        .then(res => {
          this.carousels = res.data
          sessionStorage.setItem('carsousels', JSON.stringify(res.data))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
