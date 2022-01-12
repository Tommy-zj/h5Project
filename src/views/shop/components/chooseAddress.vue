<!-- 选择地址 -->
<template>
  <div>
    <div class="shop-order-address" @click="toChooseAddress">
      <img
        class="shop-order-address-img"
        src="../../my/icon/AdressIcon.png"
        alt="地址图标"
      />

      <div class="shop-order-address-content">
        <div>{{ address.user_name }}:{{ address.tel_number }}</div>
        <div>
          {{ address.province_name + address.city_name + address.county_name }}
        </div>
        <div>
          {{ address.detailed_adress }}
        </div>
      </div>
      <img
        class="shop-order-right-row"
        src="../../../images/icon/back_right.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { findDefaultAddress } from '@/api/address'
export default {
  data() {
    return { address: {}, personId: JSON.parse(this.$store.getters.getUser).id }
  },

  components: {},

  computed: {},

  mounted() {
    this.findDefaultAddress()
  },

  methods: {
    findDefaultAddress() {
      findDefaultAddress({ person_id: this.personId })
        .then(res => {
          this.address = res.data
          this.getAddressBySessionStore()
        })
        .catch(error => {
          console.log('编辑订单获取默认地址异常', error)
        })
    },
    toChooseAddress() {
      this.$router.push({
        path: '/baseFunction/address',
        query: { choose: true }
      })
    },
    getAddressBySessionStore() {
      const address = JSON.parse(sessionStorage.getItem('address'))
      console.log('从sessionStore获取到的地址', address)
      if (address && address.user_name) {
        this.address = address
      }
    }
  }
}
</script>
<style src="../css/shopOrder.css" scoped></style>
