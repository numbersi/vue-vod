import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      beforeEnter: async (to, from, next) => {
        const {
          token,
          wd
        } = to.query
        if(token){
          window.localStorage.setItem('Token',token)
        }
        if (wd) {
          next('/index?wd=' + wd)
        }else{
          next('/index')
        }
      }
    },
    {
      path: '/index',
      component: resolve => require(['./views/Index.vue'], resolve),
    },
    {
      path: '/vod/:_id',
      component: resolve => require(['./views/DetailVod.vue'], resolve)
    }
  ]
})
export default router