import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import AboutView from '../views/AboutView.vue'
import HelpView from '../views/HelpView.vue'
import ReceiveView from '../views/ReceiveView.vue'
import SendView from '../views/SendView.vue'
import SettingsView from '../views/SettingsView.vue'
import TxsView from '../views/TxsView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        component: HomeView
    },
    {
        path: '/about',
        component: AboutView
    },
    {
        path: '/help',
        component: HelpView
    },
    {
        path: '/receive',
        component: ReceiveView
    },
    {
        path: '/send',
        component: SendView
    },
    {
        path: '/settings',
        component: SettingsView
    },
    {
        path: '/txs',
        component: TxsView
    }]
})

export default router
