// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        ['nuxt-matomo', { matomoUrl: '//matomo.avasdao.org/', siteId: 4 }],
    ],
})
