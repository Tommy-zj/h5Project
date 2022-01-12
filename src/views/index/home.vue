<template>
  <body>
    <div class="page">
      <v-top :showBack="'no'"></v-top>
      <MyLoad :show="show" :text="text"></MyLoad>
      <router-view />
      <v-bottom-bar></v-bottom-bar>
    </div>
  </body>
</template>
<script>
import BottomBar from './coments/bottomBar'
import top from './coments/top'
import { getCurrentTime } from '@/utils/time'
import MyLoad from '@/views/components/MyLoad'
export default {
  name: 'Home',
  data() {
    return {
      person_id: JSON.parse(this.$store.getters.getUser).id,
      socket: '',
      heartflag: '',
      show: false,
      text: ''
    }
  },
  watch: {
    '$store.state.base.show'(newval, oldval) {
      // alert(newval)
      this.show = newval
    },
    '$store.state.base.text'(newval, oldval) {
      this.text = newval
    }
  },
  computed: {},
  components: { 'v-bottom-bar': BottomBar, 'v-top': top, MyLoad },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
    const body = document.querySelector('.page')
    const docHeight = document.body.clientHeight
    const docWidth = document.body.clientWidth
    console.log('fsf', docHeight, 'and', docWidth)
    body && body.style.setProperty('--docHeight', docHeight + 'px')
    // this.initWebSocket()
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background:#f2f2f2')
  },
  beforeDestroy() {
    // document.querySelector('body').removeAttribute('style')
  },
  methods: {
    initWebSocket() {
      // 初始化weosocket
      const wsUrl = this.wss + 'websocket/token/'
      const wsuri = wsUrl + '0/' + this.person_id + '/one'
      // console.log('Websocket', WebSocket)
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      }
      this.socket = new WebSocket(wsuri)
      console.log('初始化主连接')
      this.socket.onopen = this.websocketonopen
      this.socket.onerror = this.websocketonerror
      this.socket.onmessage = this.websocketonmessage
      this.heartflag = true
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      // console.log('打开主连接中')
      this.heartflag = true
      this.heart()
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      // 连接建立失败重连
      console.log('重连失败')
      this.heartflag = false
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      // console.log('接收主线消息中：', e)
      if (e) {
        const reData = e.data
        console.log('连接上了服务器，主线消息：', reData)
        if (reData !== '&') {
          const newTipMessage = this.$store.getters.getTipNum
          console.log('vuex中的值', newTipMessage)
          // console.log('给vuex设置值', newTipMessage + 1)
          this.$store.commit('user/SET_TIPNUM', newTipMessage + 1)
        }
      }
    },
    websocketsend(params) {
      // 数据发送
      this.socket.send(JSON.stringify(params))
    },
    websocketclose(e) {
      // 关闭
      this.heartflag = false
      console.log('断开连接', e)
    },
    // 心跳包，每隔3分钟发送一次
    heart() {
      var times = '北京时间'
      times += ': ' + getCurrentTime()
      // console.log('心跳开始了')
      var that = this
      // console.log('查看句柄', that.heartflag)
      if (that.heartflag) {
        var newMsg = {
          msg: '&'
        }
        that.websocketsend(newMsg)
        console.log('心跳触发时间：' + times)
        setTimeout(() => {
          console.warn('到点了，开始检查')
          that.heart()
        }, 60 * 1000)
      }
    }
  }
}
</script>
<style src="./css/home.css"></style>
