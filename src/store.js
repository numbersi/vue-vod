import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    wx:{}
  },

  getters: {
    //获取数据的方法
    isAuthentivated: state => state.isAuthenticated,
    openid: state => state.wx.openid,
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      if (isAuthenticated) state.isAuthenticated = isAuthenticated;
      else state.isAuthenticated = false
    },
    SET_WX(state, wx) {
      if (wx) state.wx = wx;
      else state.wx = {}
    },
  },
  actions: {
    setLogin({
      commit
    },decoded) {
      if (decoded) {
          commit('SET_AUTHENTICATED', true)
          commit('SET_WX', decoded)
      }
    }
  }
})