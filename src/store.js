import Vue from 'vue'
import Vuex from 'vuex'
import decodeJWT from 'jwt-decode';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    wx:{}
  },

  getters: {
    //获取数据的方法
    isAuthentivated: state => state.isAuthenticated,
    wx: state => state.wx,
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
    }) {
      const token = window.localStorage.Token
      if (token) {
        try {
          var decoded = decodeJWT(token)
          console.log(decoded);

          console.log(' window.localStorage.Token :', window.localStorage.Token);
          commit('SET_AUTHENTICATED', true)
          commit('SET_WX', decoded)
        } catch (error) {
          console.log('error :', error);
        }

      }

    }
  }
})