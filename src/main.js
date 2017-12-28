import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './config/routes'
import store from './store/'
import components from './components/' //加载公共组件

import './css/common.css'
import './less/common.less'

// 创建组件
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})

// 创建路由
Vue.use(VueRouter)
const router = new VueRouter({
    routes
})
// 路由被触发时调用
router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.user.id) //true用户已登录， false用户未登录

    // 用户没有登录且不在登录页面
    if (auth && !isLogin && path !== '/login') {
        //  跳转到登录页面
        return next({ path: '/login' })
    }
    // 确保要调用 next 方法，否则钩子就不会被 resolved。
    next()
})

new Vue({ store, router }).$mount('#app')