<!--  -->
<template>
  <div>
    <div class="address-card-null"></div>
    <div class="address-card-choose">
      <div class="address-card-top">
        <div v-text="title"></div>
        <div v-text="'当前位置: ' + address"></div>
      </div>
      <div class="address-card-content">
        <div class="address-card-content-item" @click="province()">
          <div class="address-card-content-item-content">
            <div class="address-card-content-item-number">
              {{ allData.provinceNum ? allData.provinceNum : 0 }}
            </div>
            <div
              class="address-card-content-item-local"
              v-text="provinceName"
            ></div>
          </div>
        </div>

        <div class="address-card-content-item" @click="city()">
          <div class="address-card-content-item-content">
            <div
              class="address-card-content-item-number"
              v-text="allData.cityNum ? allData.cityNum : 0"
            ></div>
            <div
              class="address-card-content-item-local"
              v-text="cityName"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      provinceNum: this.allData.provinceNum,
      cityNum: this.allData.cityNum,
      provinceName: '省份',
      cityName: '市',
      address: ''
    }
  },

  props: { title: String, allData: Object },
  components: {},

  computed: {
    ...mapGetters(['getLocal'])
  },
  watch: {
    getLocal(val) {
      this.address = val
    }
  },
  mounted() {
    this.address = this.$store.getters.getLocal
    // console.log('adddressMounted', this.allData)
    const addressArr = this.address.split(' ')
    this.provinceName = addressArr[0]
    this.cityName = addressArr[1]
  },
  methods: {
    province() {
      this.$parent.clickProvince()
    },
    city() {
      this.$parent.clickCity()
    }
  }
}
</script>
<style src="./css/addressCard.css" scoped></style>
