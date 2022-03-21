import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	//state：相当于Vue的data
	//state：vuex的基本数据，用来存储变量
	state: {
		// 登录token
		token: ''
	},
	//getters:可以认为是 store 的计算属性，就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
	//且只有当它的依赖值发生了改变才会被重新计算，接受 state 作为其第一个参数
	getters: {},
	//mutations：类似于事件，每个 mutation 都有一个字符串的事件类型 (type)和 一个回调函数 (handler)。
	//这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
	mutations: {
		logins: (state, token) => {
			//传入登录状态token
			window.sessionStorage.setItem('token', JSON.stringify(token));
			state.token = token;
		},
		logouts: (state) => {
			//传入登录状态token
			window.sessionStorage.removeItem('token');
			state.token = '';
		},
	},
	//和mutation的功能大致相同，不同之处在于 ==》
	//1. Action 提交的是 mutation，而不是直接变更状态。 2. Action 可以包含任意异步操作。
	actions: {
		login: (context, token) => {
			//context 就是当前的vuex实例对象；它拥有实例的所有方法
			context.commit('logins', token)
		},
		logout: (context) => {
			context.commit('logouts')
		},
	},
	modules: {}
})
