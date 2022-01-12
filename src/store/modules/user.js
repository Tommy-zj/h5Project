import {
  getToken,
  removeToken,
  setToken,
  getShowBottom,
  setShowBottomCookie,
  getChoose,
  setChoose,
  getTitle,
  setTitle,
  getUser,
  setUser
} from '../../utils/auth'
const state = {
  token: getToken(),
  showBottom: getShowBottom(),
  choose: getChoose(),
  title: getTitle(),
  local: sessionStorage.getItem('local'),
  user: getUser(),
  tipNum: 0
}

const mutations = {
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  setShowBottom: (state, condition) => {
    // console.log('调用了这个方法嘛: ', condition)
    state.showBottom = condition
    setShowBottomCookie(condition)
  },
  SET_CHOOSE: (state, choose) => {
    state.choose = choose
    console.log('vuex', choose)
    setChoose(choose)
  },
  SET_TITLE: (state, title) => {
    state.title = title
    setTitle(title)
  },
  SET_LOCAL: (state, local) => {
    sessionStorage.setItem('local', local)
    state.local = local
  },
  SET_USER: (state, user) => {
    state.user = user
    setUser(user)
  },
  SET_TIPNUM: (state, tipNum) => {
    state.tipNum = tipNum
  }
}

const actions = {
  login({ commit }, token) {
    commit('SET_TOKEN', token)
    setToken(token)
  },

  logout({ commit }) {
    commit('SET_TOKEN', '')
    removeToken()
  },
  setShowBottomAction({ commit, show }) {
    commit('setShowBottom', show)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
