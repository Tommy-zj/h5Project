import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import { setToken, getUser } from '@/utils/auth'

// 后台api接口地址
// 线上测试环境
const url = 'http://wxfa.lasons.cn/bbkj/'
export const imgHost = 'http://wxfa.lasons.cn/picture/'
export const wss = 'ws://wxfa.lasons.cn:8088/bbkj/'
// 本地开发环境
// const url = 'http://127.0.0.1:8080/api/'
// export const imgHost = '//127.0.0.1:8088/picture/'
// export const wss = 'ws://127.0.0.1:8088/bbkj/'

/**
 * 获取url中的参数值（登录成功后后台会在跳转地址后拼接上认证后的token）
 */
function getUrlParam(name) {
  // 防止iframe嵌套，使用window.top
  var url = window.top.location.href
  if (url.indexOf('?') !== -1) {
    var urls = url.split('?')
    var params = urls[1].split('&')
    for (var i = 0; i < params.length; i++) {
      var param = params[i].split('=')
      if (param[0] === name) {
        return param[1]
      }
    }
  }
  return ''
}

export { url, getUrlParam }

// 将api接口地址暴露后挂载到全局

// create an axios instance
axios.defaults.withCredentials = true
const user = getUser()
var personId = ''
if (user) {
  personId = JSON.parse(user).id
}
const service = axios.create({
  baseURL: url,
  timeout: 10000, // request timeout
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    user: sessionStorage.getItem('user'),
    role: 'phone',
    personId: personId
  }
})

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.warn('fsfsf', res)
    // if the custom code is not 20000, it is judged as an error.

    if (res.code !== 200) {
      if (res.code === 403 || res.code === '403' || res.code === 401) {
        setToken('')
        // 防止iframe嵌套看，使用window.top
        // console.log('需要重新登陆', store)
        store.commit('base/SET_SHOW', true)
        store.commit('base/SET_TEXT', '账号需要重新登陆！')
        setTimeout(() => {
          store.commit('base/SET_SHOW', false)
          window.top.location.href = '/'
        }, 3000)

        return
      }
      if (res.code === 500) {
        Message({
          offset: 50,
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return res
      }
      if (res.code === 206 || res.code === 400) {
        return res
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        res.code === 50008 ||
        res.code === 50012 ||
        res.code === 50014 ||
        res.code === 401
      ) {
        // to re-login
        MessageBox.confirm(
          '您已注销，可以取消以停留在此页面，或重新登录',
          '确认注销',
          {
            confirmButtonText: '重新登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // console.log('返回的结果', res)
      return res
    }
  },
  error => {
    console.log('错误代码' + error) // for debug
    Message({
      offset: 50,
      message: error.message,
      type: 'error',
      customClass: 'jack',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
