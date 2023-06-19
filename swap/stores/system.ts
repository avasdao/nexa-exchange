/* Import modules. */
import { defineStore } from 'pinia'
import numeral from 'numeral'

/* Set API endpoint. */
const API_ENDPOINT = 'https://nexa.exchange'

/**
 * System Store
 */
export const useSystemStore = defineStore('system', {
    state: () => ({
        /* Set constants. */
        ONE_SAT: BigInt('1'),
        ONE_NEX: BigInt('100'),
        ONE_KEX: BigInt('100000'),
        ONE_MEX: BigInt('100000000'),
        ONE_META: BigInt('1000000000000000000'),

        /* Initialize notifications. */
        _notif: {
            isShowing: false,
            icon: null,
            title: null,
            description: null,
            delay: 7000,
        },

        /**
         * Application Starts
         */
        _appStarts: 0,

        /**
         * Application Version
         */
        _appVersion: null,

        /**
         * Flags
         *
         * 1. Dark mode
         * 2. Unconfirmed transactions
         */
        _flags: null,

        /**
         * Locale
         *
         * Controls the localization language.
         * (default is english)
         */
        _locale: null,

        _ticker: null,

        _promoid: null,
    }),

    getters: {
        displayQuote() {
            return numeral(this.price).format('$0,0.00')
        },

        price() {
            if (!this._ticker) {
                return null
            }

            return this._ticker.quote.USD.price * 1000000.0
        },

        displayPrice() {
            return numeral(this.price).format('$0,0.00') || 'n/a'
        },

        pctChg24h() {
            return this._ticker?.quote.USD.pctChg24h / 100.0
        },

        displayPctChg24h() {
            return numeral(this.pctChg24h).format('0.0%') || 'n/a'
        },

        vol24h() {
            if (!this._ticker) {
                return null
            }

            return this._ticker.quote.USD.vol24
        },

        displayVol24h() {
            return numeral(this.vol24h).format('0,0.0a') || 'n/a'
        },

        promoid() {
            return this._promoid
        },

    },

    actions: {
        /**
         * Initialize Application
         *
         * Perform startup activities.
         */
        init() {
            console.info('Initializing Nexa Swap application...')

            this._appStarts++

            /* Start 30-second interval. */
            setInterval(this.updateTicker, 30000)
            this.updateTicker()
        },

        /**
         * Cleanup
         *
         * Perform application activities before shutdown.
         */
        cleanup() {
            console.info('Cleaning up...')
        },

        /**
         * Update Ticker
         *
         * Request ticker info from remote (Nexa Exchange) API.
         */
        async updateTicker() {
            /* Request ticker info. */
            this._ticker = await $fetch(API_ENDPOINT + '/ticker')
                .catch(err => console.error(err))
            // console.log('TICKER', this._ticker)
        },

    },
})
