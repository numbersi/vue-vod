import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    wx: {},
    wd: '',
    source: '/zuida'
  },

  getters: {
    //获取数据的方法
    isAuthentivated: state => state.isAuthenticated,
    openid: state => state.wx.openid,
    wd: state => state.wd,
    source: state => state.source,
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
    SET_wd(state, wd) {
      if (wd) state.wx = wd;
      else state.wx = ''
    },
    set_value(state, data) {
      if (data) state[data.title] = data.value;
      else state[data.title] = ''
    },

  },
  actions: {
    setLogin({
      commit
    }, decoded) {
      if (decoded) {
        commit('SET_AUTHENTICATED', true)
        commit('SET_WX', decoded)
      } else {
        commit('SET_AUTHENTICATED', false)
        commit('SET_WX', {})
      }
    },
    setValue({
      commit
    }, data) {
      if (data) {
        commit('set_value', data)
      } else {
        commit("set_value", '')
      }
    },

  }
})