import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutView from '../views/AboutView.vue'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'about',
    component: AboutView
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
	meta:{requireAuth:true}
  }
]

const router = new VueRouter({
  routes
})

// to：代表将要访问的路径 from：代表从哪个路径跳转而来 next：是一个函数，代表放行
// next函数有两种写法：next()，代表放行；next(‘路径’)，代表强制跳转
router.beforeEach((to, from, next) => {
  // 1.如果访问的是登录页面（无需权限），直接放行
  if (to.path === '/') return next()
  // 2.如果访问的是有登录权限的页面，先要获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 2.1如果token为空，强制跳转到登录页面；否则，直接放行
  if (!tokenStr) return next('/')
  next()
})


export default router
