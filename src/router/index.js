import Vue from 'vue'
import VueRouter from 'vue-router'
import logIn from '../views/logIn.vue'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        name: '登录',
        path: '/logIn',
        component: logIn,
    },
    {
        name: '主页面',
        path: '/index',
        redirect: (to) => {
            return { path: '/index/userslist' }
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/index.vue'),
        children: [{
                name: '用户管理',
                path: 'userControl',
                component: () =>
                    import ('@/views/homePage/userControl.vue'),
                //  meta: {
                //   requiresAuth: true
                // },
            },
            {
                name: '角色列表',
                path: 'usersList',
                component: () =>
                    import ('@/views/homePage/roleList.vue'),
                //  meta: {
                //   requiresAuth: true
                // },
            },
        ],
        // meta: {
        //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        //   },
    },

    //路由重定向，函数中可以加判断方法
    {
        name: 'any',
        path: '*',
        redirect: (to) => {
            return { path: '/logIn' }
        },
    },
]

const router = new VueRouter({
        mode: 'history',
        routes,
    })
    // 解决路由守卫重定向报错问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

// to：代表将要访问的路径 from：代表从哪个路径跳转而来 next：是一个函数，代表放行
// next函数有两种写法：next()，代表放行；next(‘路径’)，代表强制跳转
router.beforeEach((to, from, next) => {
    // console.log('从哪个路径跳转而来', from.path);
    // console.log('要访问的路径', to.path);
    // next()
    // 1.如果访问的是登录页面（无需权限），直接放行
    if (to.path === '/logIn') next()
        // /home
        // 2.如果访问的是有登录权限的页面，先要获取token
    const tokenStr = window.sessionStorage.getItem('token')
        // console.log('tokenStr', tokenStr);
        // 2.1如果token为空，强制跳转到登录页面；否则，直接放行
    if (!tokenStr) next('/logIn')
    next()
})

export default router