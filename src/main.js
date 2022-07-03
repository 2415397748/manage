import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'default-passive-events'
import layout from './layout'
import components from './components'
import 'xe-utils'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
import axios from 'axios';
Vue.prototype.$axios = axios;


Vue.use(Antd)
Vue.use(VXETable)
Vue.use(ElementUI)

//自动注册组件
Vue.use(layout)
Vue.use(components)


Vue.prototype.$bus = new Vue()

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
