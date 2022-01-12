<!--  -->
<template>
  <div v-loading="loading">
    <addressItem :address="address"></addressItem>
    <div class="address-bottom-null"></div>
    <bottomButtom describe="新建地址"></bottomButtom>
  </div>
</template>

<script>
import addressItem from './components/addressItem'
import bottomButtom from '../../components/bottomButton'
import { getAdress } from '@/api/address'
export default {
  data() {
    return {
      loading: false,
      address: []
    }
  },

  components: { addressItem, bottomButtom },

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '收货地址')
    this.getAddressMethod()
  },

  methods: {
    bottomButtonMethod() {
      this.$router.push({ path: '/baseFunction/editAddress' })
    },
    getAddressMethod() {
      this.loading = true
      const params = {
        whichpage: 1,
        person_id: JSON.parse(this.$store.getters.getUser).id,
        pagesize: 20
      }
      getAdress(params)
        .then(res => {
          this.address = res.data
          setTimeout(() => {
            this.loading = false
          }, 1000)
        })
        .catch(error => {
          console.log('获取地址列表异常： ', error)
        })
    }
  }
}
</script>
<style>
.address-bottom-null {
  height: 60px;
}
</style>
