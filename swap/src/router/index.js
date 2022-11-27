import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import HelpView from '../views/HelpView.vue'
import MonitoringStation from '../views/MonitoringStation.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        component: HomeView,
    },
    {
        path: '/about',
        component: AboutView,
    },
    {
        path: '/help',
        component: HelpView,
    },
    {
        path: '/:pathMatch(.*)*',
        component: MonitoringStation,
    }]
})

export default router
