// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/weui.css'
import weui from 'weui.js'
import 'weui'
import './permission'
import store from './store'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { imgHost, wss } from './utils/request'
import { initWebSocket } from '@/utils/socket'

Vue.prototype.imgHost = imgHost
Vue.prototype.wss = wss
Vue.use(ElementUI)
Vue.prototype.$weui = weui
Vue.prototype.$msg = Message

Vue.config.productionTip = false

initWebSocket()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
