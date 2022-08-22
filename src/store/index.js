import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const storage = window.sessionStorage;

export default new Vuex.Store({
	//state：相当于Vue的data
	//state：vuex的基本数据，用来存储变量
	state: {
		// token: '',
		// timerSwitch: false,
		// routeNavigation: [],
		token: storage.getItem('token')
			? JSON.parse(storage.getItem('token'))
			: '',
		routeNavigation: storage.getItem('router')
			? JSON.parse(storage.getItem('router'))
			: [],
		routerKey: storage.getItem('routerKey')
			? JSON.parse(storage.getItem('routerKey'))
			: 0,
		timerSwitch: storage.getItem('timerSwitch')
			? JSON.parse(storage.getItem('timerSwitch'))
			: false,
		timerPassword: storage.getItem('timerPassword')
			? JSON.parse(storage.getItem('timerPassword'))
			: '',
	},
	//getters:可以认为是 store 的计算属性，就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
	//且只有当它的依赖值发生了改变才会被重新计算，接受 state 作为其第一个参数
	getters: {},
	//mutations：类似于事件，每个 mutation 都有一个字符串的事件类型 (type)和 一个回调函数 (handler)。
	//这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
	mutations: {
		//登录退出
		logins: (state, token) => {
			//传入登录状态token
			storage.setItem('token', JSON.stringify(token));
			state.token = token;
		},
		logouts: (state) => {
			//清空登录状态token
			storage.removeItem('token');
			state.token = '';
		},

		//锁屏以及解锁
		timerIns: (state) => {
			state.timerSwitch = true;
			storage.setItem('timerSwitch', JSON.stringify(true));
		},
		timerOuts: (state) => {
			state.timerSwitch = false;
			storage.removeItem('timerSwitch', JSON.stringify(false));
		},

		//路由导航的添加以及删除
		routeNavigationAdds: (state, router) => {
			//添加路由导航
			//查询是否存在该路由
			const index = state.routeNavigation.find(
				(item) => item.title == router.title
			);
			router.key = ++state.routerKey;
			if (!index) {
				state.routeNavigation.push(router);
			}
			storage.setItem('router', JSON.stringify(state.routeNavigation));
			storage.setItem('routerKey', JSON.stringify(state.routerKey));
		},
		routeNavigationRemoves: (state, index) => {
			//删除路由导航
			state.routeNavigation.splice(index, 1);
			storage.setItem('router', JSON.stringify(state.routeNavigation));
		},
		timerPasswords: (state, timerPassword) => {
			//删除路由导航
			state.timerPassword = timerPassword;
			storage.setItem(
				'timerPassword',
				JSON.stringify(state.timerPassword)
			);
		},
	},
	//和mutation的功能大致相同，不同之处在于 ==》
	//1. Action 提交的是 mutation，而不是直接变更状态。 2. Action 可以包含任意异步操作。
	actions: {
		//登录退出
		login: (context, token) => {
			//context 就是当前的vuex实例对象；它拥有实例的所有方法
			context.commit('logins', token);
		},
		logout: (context) => {
			context.commit('logouts');
		},

		//锁屏以及解锁
		timerIn: ({ commit }) => {
			commit('timerIns');
		},
		timerOut: ({ commit }) => {
			commit('timerOuts');
		},

		//路由导航的添加以及删除
		routeNavigationAdd: ({ commit }, router) => {
			commit('routeNavigationAdds', router);
		},
		routeNavigationRemove: ({ commit }, index) => {
			commit('routeNavigationRemoves', index);
		},
		//设置锁屏密码
		timerPassword: ({ commit }, timerPassword) => {
			commit('timerPasswords', timerPassword);
		},
	},
	modules: {},
});
