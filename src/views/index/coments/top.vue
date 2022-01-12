<template>
  <div>
    <div class="top">
      <img
        v-if="showBack === 'yes'"
        class="back"
        @click="back()"
        src="../../../images/icon/back.png"
        alt=""
      />
      <p v-text="title"></p>
      <div class="quit-icon">
        <el-dropdown trigger="click" @command="logout">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div style="margin-top:50px"></div>
  </div>
</template>
<script>
import { setToken, getTitle, setUser } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { logout } from '@/api/baseApi'
export default {
  props: { showBack: String },
  data() {
    return {
      title: getTitle()
    }
  },
  computed: {
    ...mapGetters(['showTitle'])
  },
  watch: {
    showTitle(val) {
      // console.log('监听变化', val)
      this.title = val
    }
  },
  mounted() {
    this.title = '我的'
  },
  methods: {
    logout(e) {
      console.log(e)
      if (e === 'logout') {
        this.$store.commit('base/SET_SHOW', true)
        this.$store.commit('base/SET_TEXT', '账号退出中!')
        setToken('')
        setUser('')
        logout()
          .then(res => {
            setTimeout(() => {
              this.$store.commit('base/SET_TEXT', '账号正常退出!')
              setTimeout(() => {
                this.$store.commit('base/SET_SHOW', false)
                window.top.location.href = '/'
              }, 1500)
            }, 3000)
          })
          .catch(e => {
            console.log('登出异常', e)
            window.top.location.href = '/'
          })
      }

      // window.top.location.href = 'http://192.168.101.59:8000'
    },
    back() {
      window.history.back()
    }
  }
}
</script>
<style>
@import '../css/home.css';
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 20px;
}
.fuck-you-made {
  width: 80%;
}
.self-create-message {
  width: 50%;
}
</style>

<style lang="less">
.jack {
  min-width: 40vw !important;
  width: 90vw !important;
}
</style>
