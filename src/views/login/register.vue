<!-- 编辑个人信息界面 -->
<template>
  <div>
    <my-load :show="show" :text="text"></my-load>
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
          <label class="weui-label">密码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            v-model="user.password"
            type="password"
            placeholder="登录密码"
          />
        </div>
      </div>
    </div>

    <div style="height:100px"></div>
    <bottomButton describe="保存"></bottomButton>
  </div>
</template>

<script>
import { register } from '@/api/login.js'
import bottomButton from '@/views/components/bottomButton'
import MyLoad from '@/views/components/MyLoad'
import VDistpicker from 'v-distpicker'

export default {
  data() {
    return {
      show: false,
      text: '',
      user: {
        name: '',
        phone: '',
        password: ''
      },
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

  computed: {},

  mounted() {
    this.$store.commit('user/SET_TITLE', '注册新账号')
    // console.log('user', user)
  },

  methods: {
    bottomButtonMethod() {
      // console.log('点击了保存', modifyMyInfo)
      // console.log(this.$store)
      this.show = true
      this.text = '账号注册中'
      setTimeout(() => {
        register(this.user)
          .then(res => {
            if (res.msg === 'yes') {
              // console.log('成功修改个人信息')
              this.$store.commit('user/SET_USER', JSON.stringify(this.user))
              this.text = '账号注册成功！'
              setTimeout(() => {
                this.show = false
                this.$router.go(-1) // 返回上一层
              }, 1500)
              return
            }
            this.text = '此已经被注册！'
            setTimeout(() => {
              this.show = false
            }, 1500)
          })
          .catch(error => {
            console.log('保存个人信息报错', error)
          })
      }, 1000)
    }
  }
}
</script>
<style></style>
