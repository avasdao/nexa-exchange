import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView'
import MarketsView from '../views/MarketsView'

const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/markets',
        component: MarketsView,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
