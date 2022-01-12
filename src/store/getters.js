const getters = {
  token: state => state.user.token,
  showBottom: state => state.user.showBottom,
  showChoose: state => state.user.choose,
  showTitle: state => state.user.title,
  getLocal: state => state.user.local,
  getUser: state => state.user.user,
  getTipNum: state => state.user.tipNum
}
export default getters
