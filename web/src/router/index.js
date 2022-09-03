import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView'
import BridgesView from '../views/BridgesView'
import FaucetsView from '../views/FaucetsView'
import MarketsView from '../views/MarketsView'
import ReportsView from '../views/ReportsView'
import StatusView from '../views/StatusView'

const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/bridges',
        component: BridgesView,
    },
    {
        path: '/faucets',
        component: FaucetsView,
    },
    {
        path: '/markets',
        component: MarketsView,
    },
    {
        path: '/reports',
        component: ReportsView,
    },
    {
        path: '/status',
        component: StatusView,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
