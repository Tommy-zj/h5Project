<!-- 个人地址列表 -->
<template>
  <div>
    <MyLoad :show="loading" text="加载中"></MyLoad>
    <div class="address-top-null"></div>
    <div class="address-item" v-for="(item, index) in address" :key="index">
      <div class="address-top">
        <div>
          {{ item.user_name }}
        </div>
        <div class="address-phone-number">{{ item.tel_number }}</div>
        <img
          src="../../../../images/icon/delete.png"
          @click="deleteMethod(item.id)"
          alt=""
        />
      </div>
      <div @click="chooseAddress(item)">
        <div class="address">
          {{
            item.province_name + ' ' + item.city_name + ' ' + item.county_name
          }}
        </div>
        <div class="postCode">
          {{ item.postal_code }}
        </div>
      </div>
      <div class="address-edit">
        <div>
          {{ item.checks ? '默认' : '' }}
        </div>
        <div class="address-edit-font" @click="toEdit(item)">
          编辑
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addressDelete } from '@/api/address'
import MyLoad from '@/views/components/MyLoad'
export default {
  data() {
    return {
      loading: false,
      choose: false
    }
  },
  props: { address: Array },
  components: { MyLoad },

  mounted() {
    this.choose = this.$route.query.choose
  },

  computed: {},

  methods: {
    toEdit(address) {
      this.$router.push({
        path: '/baseFunction/editAddress',
        query: { edit: true, address: address }
      })
    },
    deleteMethod(id) {
      this.loading = true
      addressDelete({ id: id })
        .then(res => {
          setTimeout(() => {
            this.loading = false
            this.$parent.getAddressMethod()
          }, 1000)
        })
        .catch(error => {
          console.log('删除地址出错', error)
          this.loading = false
        })
    },
    chooseAddress(address) {
      if (this.choose) {
        sessionStorage.setItem('address', JSON.stringify(address))
        window.history.back()
      }
    }
  }
}
</script>
<style src="./css/address.css"></style>
