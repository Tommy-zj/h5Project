<template>
  <div>
    <MyLoad :show="show" :text="text"></MyLoad>
    <div style="width:100%;margin:80px 0;text-align:center">
      <img src="../../images/logo.png" style="width:200px;" />
    </div>
    <div class="weui-cells weui-cells_form">
      <label for="js_input1" class="weui-cell weui-cell_active">
        <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
        <div class="weui-cell__bd">
          <input
            id="js_input1"
            class="weui-input"
            placeholder="填写本人微信号"
            v-model="account"
          />
        </div>
      </label>
      <label for="js_input2" class="weui-cell weui-cell_active">
        <div class="weui-cell__hd"><span class="weui-label">昵称</span></div>
        <div class="weui-cell__bd">
          <input
            id="js_input1"
            class="weui-input"
            type="password"
            placeholder="填写密码"
            v-model="password"
          />
        </div>
      </label>
      <div
        class="weui-bottom-fixed-opr"
        style="position:fixed;bottom:20px;left:50%;transform: translateX(-50%);"
      >
        <a
          href="javascript:;"
          @click="login"
          role="button"
          class="weui-btn weui-btn_primary"
          >登录</a
        >
        <div class="register">
          <a href="javascript:;" @click="register">账号注册</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setToken, setUser } from '@/utils/auth'
import { toLogin } from '@/api/login'
import MyLoad from '@/views/components/MyLoad'
export default {
  name: 'Login',
  data() {
    return {
      text: 'hello world!',
      account: '13265355964',
      password: '111111',
      show: false
    }
  },
  components: { MyLoad },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#ffffff')
  },
  methods: {
    login() {
      this.show = true
      this.text = '账号登陆中！'
      const loginParams = {
        phone: this.account,
        password: this.password
      }
      if (this.password !== '' && this.account !== '') {
        toLogin(loginParams)
          .then(data => {
            const { code, user, msg } = data
            if (code === 200) {
              setTimeout(() => {
                if (msg === 'no') {
                  this.text = '账号或密码错误！'
                  setTimeout(() => {
                    this.show = false
                  }, 1500)
                  this.$message({
                    message: '账号或密码错误',
                    duration: 5 * 1000,
                    customClass: 'jack'
                  })
                  return
                }
                console.log('查看结果', code, user)
                this.$store.commit('user/setShowBottom', false)
                setToken(user.name + user.email)
                setUser(JSON.stringify(user))
                this.show = false
                this.$message({
                  message: '账号登录成功！',
                  type: 'success',
                  duration: 3 * 1000
                  // customClass: 'jack'
                })
                setTimeout(() => {
                  window.top.location.href = '/'
                }, 3000)
              }, 1500)
            }
            if (code === 204 || code === '204') {
              this.text = '后台数据异常，请稍后重试！'
              setTimeout(() => {
                this.show = false
                window.top.location.href = '/'
              }, 1500)
            }
          })
          .catch(error => {
            console.warn('登录异常：', error)
          })
        // this.$router.replace({ path: '/second' })
        // window.top.location.href = 'http://192.168.101.59:8000'
      } else {
        alert('账号或密码不能为空')
      }
    },
    register() {
      console.log('点击了注册账号')
      this.$router.push({ path: '/register' })
    }
  }
}
</script>
<style lang="less">
.register {
  position: absolute;
  left: 50%;
  margin-top: 7px;
  font-size: 13px;
  transform: translateX(-50%);
}
.jack {
  width: 90% !important;
  min-width: 30%;
}
</style>
