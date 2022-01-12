import { getCurrentTime } from '@/utils/time'
import store from '@/store'
import { wss } from '@/utils/request'
import { Notification } from 'element-ui'

var socket = ''
var heartflag = false

function initWebSocketBody() {
  // 初始化weosocket
  const wsUrl = wss + 'websocket/token/'
  const wsuri = wsUrl + '0/' + JSON.parse(store.getters.getUser).id + '/one'
  // console.log('Websocket', WebSocket)
  if (typeof WebSocket === 'undefined') {
    alert('您的浏览器不支持socket')
  }
  socket = new WebSocket(wsuri)
  console.log('初始化主连接')
  socket.onopen = websocketonopen
  socket.onerror = websocketonerror
  socket.onmessage = websocketonmessage
  heartflag = true
}
/**
 * 检查是否有个人信息，有了个人信息再启用websocket
 * @returns
 */
export function initWebSocket() {
  const user = store.getters.getUser
  if (user) {
    initWebSocketBody()
    return
  }
  setTimeout(() => {
    // console.log('内存中没有个人信息')
    initWebSocket()
  }, 3 * 1000)
}
function websocketonopen() {
  // 连接建立之后执行send方法发送数据
  // console.log('打开主连接中')

  heartflag = true
  heart()
  // this.websocketsend(JSON.stringify(actions));
}
function websocketonerror() {
  // 连接建立失败重连
  console.log('重连失败')
  heartflag = false
  initWebSocket()
}
function websocketonmessage(e) {
  // 数据接收
  // console.log('接收主线消息中：', e)
  if (e) {
    const reData = e.data
    console.log('主线消息：', reData)
    if (reData !== '&') {
      const newTipMessage = store.getters.getTipNum
      console.log('vuex中的值', newTipMessage)
      // console.log('给vuex设置值', newTipMessage + 1)
      store.commit('user/SET_TIPNUM', newTipMessage + 1)
      const message = JSON.parse(reData)
      if (message.buyer_id) {
        const newMessage = message.msg
        console.log('新消息：', newMessage)
        Notification({
          title: '新消息',
          message: newMessage,
          duration: 5 * 1000,
          customClass: 'jack'
        })
      }
    }
  }
}
function websocketsend(params) {
  // 数据发送
  socket.send(JSON.stringify(params))
}
export function websocketclose(e) {
  // 关闭
  this.heartflag = false
  console.log('断开连接', e)
}
// 心跳包，每隔3分钟发送一次
function heart() {
  var times = '北京时间'
  times += ': ' + getCurrentTime()
  // console.log('心跳开始了')
  // console.log('查看句柄', that.heartflag)
  if (heartflag) {
    var newMsg = {
      msg: '&'
    }
    websocketsend(newMsg)
    console.warn('心跳触发时间：' + times)
    setTimeout(() => {
      // console.warn('到点了，开始检查')
      heart()
    }, 3 * 60 * 1000)
  }
}
