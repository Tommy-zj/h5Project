<!-- 聊天室 -->
<template>
  <div class="chat-body">
    <v-chat-content :messages="showMessage"></v-chat-content>
    <div class="chat-bottom-null" id="null"></div>
    <v-bottom-input :send="test"></v-bottom-input>
  </div>
</template>

<script>
import chatContent from './comments/chatContent'
import bottomInput from './comments/bottomInput'
import { getCurrentTime } from '@/utils/time'
import { getMessage, editCtime } from '@/api/chat'
export default {
  data() {
    return {
      person_id: JSON.parse(this.$store.getters.getUser).id,
      socket: '',
      heartflag: '',
      other_id: this.$route.query.otherId,
      messages: [],
      room: '',
      showMessage: []
    }
  },
  components: { 'v-chat-content': chatContent, 'v-bottom-input': bottomInput },
  mounted() {
    this.$store.commit('user/SET_TITLE', '聊天室')
    this.initWebSocket(this.other_id, this.person_id)
    // 总新消息减去此人的新消息个数
    var tipNum = this.$store.getters.getTipNum
    const itemTipNum = this.$route.query.getTipNum
    tipNum = tipNum = itemTipNum
    this.$store.commit('user/SET_TIPNUM', tipNum)
    this.getMessage()
    this.editCtime()
  },

  beforeDestroy() {
    this.socket.close()
  },
  methods: {
    initWebSocket(other_id, person_id) {
      var room
      if (other_id > person_id) {
        room = other_id + 'to' + person_id
      } else {
        room = person_id + 'to' + other_id
      }
      this.room = room
      // 初始化weosocket
      const wsUrl = this.wss + 'websocket/token/'
      const wsuri = wsUrl + other_id + '/' + person_id + '/' + room
      console.log('Websocket', WebSocket)
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      }
      this.socket = new WebSocket(wsuri)
      console.log('初始化连接')
      this.socket.onopen = this.websocketonopen
      this.socket.onerror = this.websocketonerror
      this.socket.onmessage = this.websocketonmessage
      this.heartflag = true
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      console.log('打开聊天室连接中')
      this.heartflag = true
      this.heart()
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      // 连接建立失败重连
      console.log('聊天室重连失败')
      this.heartflag = false
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      // console.log('聊天室接收消息中', e)
      if (e.data !== '&') {
        var data = JSON.parse(e.data)
        console.log('查看收到的新消息', data.data[0].msg)
        const message = data.data
        if (message.length === 1) {
          for (const i in message) {
            this.$set(message[i], 'timeShow', 1)
            if (message[i].msg.length > 0 && message[i] != null) {
              message[i].msg = decodeURI(message[i].msg)
              this.messages.push(message[i])
            }
          }
          this.showMessage = this.messages
          this.messages = this.showMessage
          this.showTime()
        }
      }
    },
    test() {
      this.messages.push({
        create_id: 78,
        msg: 'fuck',
        timestamp: 499997979,
        ctime: 2021 - 3242 - 42424 - 42
      })
    },
    getTime() {
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      const ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      var result = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
      console.log(result)
      return result
    },

    websocketsend(params) {
      // 数据发送
      if (params.length > 0) {
        var timestamp = Date.parse(new Date())
        var message = {
          create_id: this.person_id,
          msg: encodeURIComponent(params),
          timestamp: timestamp,
          ctime: this.getTime()
        }
        this.socket.send(JSON.stringify(message))
      }
    },
    websocketclose(e) {
      // 关闭
      this.heartflag = false
      console.log('聊天室断开连接', e)
    },
    // 心跳包，每隔3分钟发送一次
    heart() {
      var times = '聊天室'
      times += ': ' + getCurrentTime()
      console.log('聊天室心跳开始了')
      // util.formatTime(new Date());
      var that = this
      if (that.heartflag) {
        var newMsg = {
          msg: '&'
        }
        that.websocketsend(newMsg)
        console.log(times + ': 三分钟心跳')
        setTimeout(() => {
          that.heart()
        }, 3 * 60 * 1000)
      }
    },
    getMessage() {
      const params = {
        pageSize: 15,
        pageNo: 1,
        fileName: this.room
      }
      getMessage(params)
        .then(res => {
          const newMsg = res.data.data
          console.log('查看获取的新消息', newMsg)
          // 转码
          if (newMsg.length > 0) {
            for (let i = newMsg.length - 1; i > 0; i--) {
              this.$set(newMsg[i], 'timeShow', 1)
              if (newMsg !== '') {
                newMsg[i].msg = decodeURI(newMsg[i].msg)
              }
              this.messages.unshift(newMsg[i])
            }
            this.showTime()
            console.log('渲染的消息', this.messages)
            this.showMessage = this.messages
          }
        })
        .catch(error => {
          console.log('获取聊天记录异常', error)
        })
    },
    // 修改个人的最新消息时间戳
    editCtime() {
      editCtime({ person_id: this.person_id, other_id: this.other_id })
        .then(res => {})
        .catch(error => {
          console.log('更新时间戳异常', error)
        })
    },
    // 消息列表中的消息是否显示时间
    showTime() {
      var time = 0
      var data = this.messages
      for (const i in data) {
        // console.log("查看每一个消息", res.data[i])
        data[i].msg.replace('%3F', '?')
        if (Math.abs(data[i].timestamp - time) < 300 * 1000) {
          // console.log('这个消息不用显示时间')
          data[i].timeShow = 0
          // time = data[i].ctime
        } else {
          // console.warn('这个要显示时间')
          data[i].timeShow = 1
          time = data[i].timestamp
        }
      }
      this.showMessage = this.messages
    }
  }
}
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
@import './css/chatRoom.css';
</style>
