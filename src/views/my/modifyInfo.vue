<!-- 编辑个人信息界面 -->
<template>
  <div>
    <MyLoad :show="loadding" :text="message"></MyLoad>
    <div style="height:1px"></div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="user.name"
            type="text"
            placeholder="姓名"
          />
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="user.phone"
            type="text"
            placeholder="手机号"
          />
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">电子邮箱</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="user.mail"
            type="text"
            placeholder="电子邮箱"
          />
        </div>
      </div>
    </div>
    <div
      style="height:100%;width:90%;padding:10px 5%;background-color:white;margin-top:10px"
    >
      <textarea
        class="weui-textarea"
        placeholder="个人描述"
        rows="6"
        v-model="user.introduce"
      ></textarea>
      <div class="weui-textarea-counter">
        <span>{{ getIntroduceLength() }}</span
        >/200
      </div>
    </div>
    <!-- 输入框 -->
    <div style="margin-top:10px;background-color:white;padding:10px 15px">
      地址：
      <span
        v-on:click="editAddress"
        style="background-color:white;padding:10px 15px;line-height:40px"
        >{{ user.province_name }} {{ user.city_name }}
        {{ user.county_name }}</span
      >
    </div>
    <v-distpicker
      v-if="isShow"
      type="mobile"
      :province="user.province_name"
      :city="user.city_name"
      :area="user.county_name"
      @selected="clicked"
    ></v-distpicker>
    <div style="height:100px"></div>
    <bottomButton describe="保存"></bottomButton>
  </div>
</template>

<script>
import { modifyMyInfo } from '@/api/person.js'
import bottomButton from '@/views/components/bottomButton'
import VDistpicker from 'v-distpicker'
import MyLoad from '@/views/components/MyLoad'

export default {
  data() {
    return {
      user: {},
      isShow: false,
      message: '正在提交数据!',
      loadding: false
    }
  },

  components: {
    bottomButton,
    VDistpicker,
    MyLoad
  },
  watch: {
    'user.introduce'() {
      if (this.getIntroduceLength() > 200) {
        this.user.introduce = String(this.user.introduce).slice(0, 200)
      }
    }
  },
  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '编辑个人信息')
    const user = JSON.parse(this.$store.getters.getUser)
    this.user = JSON.parse(JSON.stringify(user))
    // console.log('user', user)
  },

  methods: {
    editAddress() {
      this.isShow = true
    },
    clicked(e) {
      // console.log('clicked', e)
      this.user.province_name = e.province.value
      this.user.city_name = e.city.value
      this.user.county_name = e.area.value
      this.isShow = false
    },
    bottomButtonMethod() {
      this.user.person_id = this.user.id
      // console.log('点击了保存', modifyMyInfo)
      // console.log(this.$store)
      this.loadding = true
      modifyMyInfo(this.user)
        .then(res => {
          if (res.code === 200) {
            // console.log('成功修改个人信息')
            this.$store.commit('user/SET_USER', JSON.stringify(this.user))
            this.message = '信息修改完成！'
            setTimeout(() => {
              this.loadding = false
              this.$router.go(-1) // 返回上一层
            }, 1000)
          }
        })
        .catch(error => {
          console.log('保存个人信息报错', error)
        })
    },
    getIntroduceLength() {
      if (this.user.introduce) {
        return this.user.introduce.length
      }
    }
  }
}
</script>
<style></style>
