// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            title: 'Nexa Exchange — Your Keys. Your Coins.',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Your #1 source for Nexa asset exchange.' },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
            script: [
                { src: '/js/matomo.js' },
            ],
        },
    },

    /* Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',
    ],

    /* Route Rules */
    routeRules: {
        /* Disable server-side rendering for Admin area. */
        '/admin/**': { ssr: false },

        /* Add CORS headers to API. */
        '/v1/**': { cors: true },

        /* Add CORS headers to root (System) endpoints. */
        '/auth': { cors: true },
        '/stats': { cors: true },
        '/status': { cors: true },

        /* Add CORS headers to root (Market) endpoints. */
        '/mcap': { cors: true },
        '/mex': { cors: true },
        '/nex': { cors: true },
        '/price': { cors: true },
        '/ticker': { cors: true },
    },
})
