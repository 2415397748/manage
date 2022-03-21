import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'default-passive-events'

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.bus = new Vue;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
