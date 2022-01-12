import router from './router'
import { getToken } from '@/utils/auth'

// import { getUrlParam } from './utils/request'

const whiteList = ['/login', '/auth-redirect', '/register'] // no redirect whitelist
const token = getToken()

router.beforeEach(async (to, from, next) => {
  console.log('路由守护文件', token)
  // start progress bar

  // set page title
  document.title = '商城demo'

  if (token) {
    console.log('有token')
    if (to.path === '/login') {
      // 如果已经登录，路径为login，则跳转到/home界面
      next({ path: '/' })
    } else {
      next()
      // determine whether the user has obtained his permission roles.length > 0
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      console.log('跳转到登录界面')
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})
