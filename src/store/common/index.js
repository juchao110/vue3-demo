const common = {
  namespaced: true,
  state: {
    userInfo: 'nihao',
    count: 1,
    contentSpin: false,
    menuSpin: false
  },
  mutations: {
    ADDCOUNT: (state) => {
      state.count++
    },
    SETCONTENTSPIN: (state, value) => {
      state.contentSpin = value
    },
    SETMENUSPIN: (state, value) => {
      state.menuSpin = value
    },
    SETUSERINFO: (state, value) => {
      state.userInfo = value
    }
  },
  actions: {
    addCount({
      commit
    }, res) {
      commit('ADDCOUNT', res)
    },
    setUserInfo({
      commit
    }, res) {
      commit('SETUSERINFO', res)
    }
  }
}
export default common;