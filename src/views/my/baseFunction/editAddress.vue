<!-- 新建/编辑个人地址 -->
<template>
  <div v-loading="loading">
    <div style="height:1px"></div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">收货人</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="address.user_name"
            class="weui-input"
            type="text"
            placeholder="收货人"
          />
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="address.tel_number"
            type="text"
            placeholder="手机号码"
          />
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">邮政编码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="address.postal_code"
            class="weui-input"
            type="text"
            placeholder="邮政编码"
          />
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">所在地区</label>
        </div>
        <div class="weui-cell__bd">
          <input
            :readonly="true"
            @click="chooseAddress"
            class="weui-input"
            type="text"
            v-if="address.province_name == ''"
            placeholder="所在地区"
          />
          <span @click="chooseAddress">
            {{
              address.province_name +
                ' ' +
                address.city_name +
                ' ' +
                address.county_name
            }}</span
          >
        </div>
      </div>
    </div>
    <v-distpicker
      v-show="isShow"
      type="mobile"
      :province="address.province_name"
      :city="address.city_name"
      :area="address.county_name"
      @selected="clicked"
    ></v-distpicker>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">详细地址</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="address.detailed_adress"
            type="text"
            placeholder="详细地址"
          />
        </div>
      </div>
    </div>

    <!-- 开关 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__bd">设置默认地址</div>
        <div class="weui-cell__ft">
          <input class="weui-switch" v-model="address.checks" type="checkbox" />
        </div>
      </div>
    </div>
    <bottomButtom describe="保存"></bottomButtom>
  </div>
</template>

<script>
import bottomButtom from '../../components/bottomButton'
import VDistpicker from 'v-distpicker'
import { addApi, editApi } from '@/api/address'
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      address: {
        province_name: '',
        city_name: '',
        county_name: '',
        user_name: '',
        tel_number: '',
        postal_code: '',
        detailed_adress: '',
        person_id: 0,
        checks: 0,
        edit: ''
      }
    }
  },

  components: { bottomButtom, VDistpicker },

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '编辑地址')
    this.edit = this.$route.query.edit
    const address = this.$route.query.address
    if (address) {
      this.address = address
    }
  },

  methods: {
    clicked(e) {
      // console.log('clicked', e)
      this.address.province_name = e.province.value
      this.address.city_name = e.city.value
      this.address.county_name = e.area.value
      this.isShow = false
    },
    chooseAddress() {
      console.log('点击了选择地区', this)
      this.isShow = true
    },
    bottomButtonMethod() {
      console.log('点击保存')
      this.loading = true
      if (this.address.checks) {
        this.address.checks = 1
      } else {
        this.address.checks = 0
      }
      this.address.person_id = JSON.parse(this.$store.getters.getUser).id
      if (this.edit === true || this.edit === 'true') {
        editApi(this.address)
          .then(res => {
            console.log('新建地址完成', res)
            setTimeout(() => {
              this.loading = false
              this.$router.go(-1) // 返回上一层
            }, 1000)
          })

          .catch(error => {
            console.log('添加地址报错了', error)
            setTimeout(() => {
              this.loading = false
              this.$router.go(-1) // 返回上一层
            }, 1000)
          })
        return
      }
      addApi(this.address)
        .then(res => {
          console.log('新建地址完成', res)
          setTimeout(() => {
            this.loading = false
            this.$router.go(-1) // 返回上一层
          }, 1000)
        })

        .catch(error => {
          console.log('添加地址报错了', error)
          setTimeout(() => {
            this.loading = false
            this.$router.go(-1) // 返回上一层
          }, 1000)
        })
    }
  }
}
</script>
<style></style>
