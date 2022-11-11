import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '../views/Admin.vue'
import Auth from '../views/Auth.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/admin',
        component: Admin,
        meta: { requiresAuth: true },
    },
    {
        path: '/auth',
        component: Auth,
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    const loggedIn = false//store.state.user
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !loggedIn) {
        next('/auth');
    }

    next()
})

export default router
