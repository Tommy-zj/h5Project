const state = {
  address: '广东省 广州市 白云区',
  show: false,
  text: ''
}

const mutations = {
  SET_SHOW: (state, show) => {
    state.show = show
  },
  SET_TEXT: (state, text) => {
    state.text = text
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
