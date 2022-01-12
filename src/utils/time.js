export function getCurrentTime() {
  // 获取当前时间并打印
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
  const gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
  // console.log(gettime)
  return gettime
}

// date.js
export function formatDate(date, fmt) {
  console.log(date, fmt)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
