import Vue from 'vue';
import VueRouter from 'vue-router';
import logIn from '../views/logIn.vue';
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

//公用路由
const routes = [
	{
		name: '登录',
		path: '/logIn',
		component: logIn,
	},
	//路由重定向，函数中可以加判断方法
	{
		name: 'any',
		path: '*',
		redirect: (to) => {
			return { path: '/logIn' };
		},
	},
	{
		name: '首页',
		path: '/index',
		redirect: (to) => {
			return { path: '/index/summarizationData' };
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/index.vue'),
		children: [
			{
				name: '数据汇总',
				path: 'dataCollect',
				component: () => import('@/views/homePage/dataCollect.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
			{
				name: '用户管理',
				path: 'userControl',
				component: () => import('@/views/homePage/userControl.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
			{
				name: '权限管理',
				path: 'rightControl',
				component: () => import('@/views/homePage/rightControl.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
			{
				name: '二维码',
				path: 'quickMark',
				component: () => import('@/views/homePage/quickMark.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
			{
				name: '商品列表',
				path: 'commodityList',
				component: () => import('@/views/homePage/commodityList.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
			{
				name: '分类管理',
				path: 'classifyControl',
				component: () => import('@/views/homePage/classifyControl.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
			{
				name: '订单管理',
				path: 'orderControl',
				component: () => import('@/views/homePage/orderControl.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
			{
				name: 'post请求',
				path: 'post',
				component: () => import('@/views/homePage/post.vue'),
				//  meta: {
				//   requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
				// },
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});
// 解决路由守卫重定向报错问题
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

// to：代表将要访问的路径 from：代表从哪个路径跳转而来 next：是一个函数，代表放行
// next函数有两种写法：next()，代表放行；next(‘路径’)，代表强制跳转
router.beforeEach((to, from, next) => {
	// console.log('从哪个路径跳转而来', from.path);
	// console.log('要访问的路径', to.path);
	// next()
	// 1.如果访问的是登录页面（无需权限），直接放行
	if (to.path === '/logIn') next();
	// /home
	// 2.如果访问的是有登录权限的页面，先要获取token
	const tokenStr = window.sessionStorage.getItem('token');
	// console.log('tokenStr', tokenStr);
	// 2.1如果token为空，强制跳转到登录页面；否则，直接放行
	if (!tokenStr) next('/logIn');
	next();
});

export default router;
