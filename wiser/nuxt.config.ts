// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'WiserSwap',
            meta: [
                { name: 'description', content: 'Swap your Nexa assets.' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            script: [
                { src: '/js/matomo.js' },
            ],
        },
    },

    /* Progressive Web Application Settings */
    pwa: {
        manifest: {
            name: 'WiserSwap',
            // short_name: 'WiserSwap'
            description: `Swap your Nexa assets.`,
            lang: 'en',
            theme_color: '#6a5acd',
            background_color: '#6a5acd',
            // useWebmanifestExtension: false,
        },
        meta: {
            name: 'WiserSwap',
            description: `Swap your Nexa assets.`,
            author: `Nexa Exchange DAO`,
        },
        // icon: false, // disables the icon module
        workbox: {
            // workboxURL: 'TBD',
            // enabled: true, // FOR DEV PURPOSES ONLY
        },
    },

    // FIXME
    runtimeConfig: {
        public: {
            API_ENDPOINT: 'https://nexa.exchange/v1',
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',

        /* Internationalization for Nuxt */
        '@nuxtjs/i18n',

        /* Progressive Web Application */
        '@kevinmarrec/nuxt-pwa',
    ],

    /* Route Rules */
    routeRules: {
        /* Disable server-side rendering for entire site. */
        // NOTE: Allows for IPFS (hosting) + Web-based (rendering).
        '/**': { ssr: false },
    },
})
