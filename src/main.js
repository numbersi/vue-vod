import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import xml from './utils/xml'
Vue.config.productionTip = false

var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ff984a357f07c7062d2ad3f347362bce";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
Vue.prototype.xml = xml
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')