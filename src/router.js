import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import decodeJWT from 'jwt-decode';
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/index',
      component: resolve => require(['./components/IndexLayout.vue'], resolve),
      beforeEnter: async (to, from, next) => {
        console.log('to :', to);
        if (to.path == '/index/login') {
          next()
        } else {
          const token = window.localStorage.Token
          if (token) {
            let decoded = decodeJWT(token)

            if (decoded.exp - Math.round(new Date().getTime() / 1000).toString() > 0) {
              store.dispatch('setLogin', decoded)
            } else {
              window.localStorage.removeItem('Token')
              store.dispatch('setLogin', false)
            }
          }
          next()
        }
      },
      children: [{
          path: 'login',
          beforeEnter: async (to, from, next) => {
            console.log('to :', to);
            console.log('from :', from);
            const {
              token
            } = to.query
            let decoded = ''
            if (token) {
              decoded = decodeJWT(token)
              if (decoded.exp - Math.round(new Date().getTime() / 1000).toString() > 0) {
                window.localStorage.setItem('Token', token)
              }
              if (decoded.wd) {
                store.dispatch('setValue', {
                  title: 'wd',
                  value: decoded.wd
                })
                next('/index/search')
              } else {
                next('/index')
              }
            }
          }
        },
        {
          path: '',
          component: resolve => require(['./views/Index.vue'], resolve),
        },
        {
          name: 'search',
          path: 'search',
          component: resolve => require(['./views/Search.vue'], resolve),
        },
        {
          name: 'detail',
          path: 'detail',
          component: resolve => require(['./views/Detail.vue'], resolve),
        },
      ]
    },
    // {
    //   path: '/vod/:_id',
    //   component: resolve => require(['./views/DetailVod.vue'], resolve)
    // }
  ]
})
export default router