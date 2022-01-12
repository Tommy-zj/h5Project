const state = {
  num: 1,
  sendMethod: '到店自取'
}

const mutations = {
  SET_NUM: (state, num) => {
    state.num = num
  },
  SET_SEND_METHOD: (state, sendMethod) => {
    state.sendMethod = sendMethod
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
