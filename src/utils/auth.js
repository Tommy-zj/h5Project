import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  console.warn('提交的token' + Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getShowBottom() {
  return Cookies.get('showBottom')
}

export function setShowBottomCookie() {
  return Cookies.set('showBottom')
}

export function getChoose() {
  return Cookies.get('choose')
}

export function setChoose(choose) {
  return Cookies.set('choose', choose)
}

export function getTitle() {
  return Cookies.get('choose')
}

export function setTitle(title) {
  return Cookies.set('title', title)
}

export function getUser() {
  return Cookies.get('user')
}

export function setUser(title) {
  return Cookies.set('user', title)
}
