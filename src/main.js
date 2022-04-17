import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'default-passive-events'
import components from './layout'

Vue.use(components);

// import sidentify from './layout/verification_code.vue'
// import HeadNavigation from './layout/HeadNavigation.vue'
// import LeftNavigation from './layout/LeftNavigation.vue'
// import userslist from './layout/table.vue'

// Vue.component('sidentify',sidentify)
// Vue.component('HeadNavigation',HeadNavigation)
// Vue.component('LeftNavigation',LeftNavigation)
// Vue.component('userslist',userslist)

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$bus=new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
