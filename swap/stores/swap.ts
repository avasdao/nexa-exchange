/* Import modules. */
import { decodeAddress } from '@nexajs/address'
import { defineStore } from 'pinia'
import QrScanner from 'qr-scanner'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

/* Initialize Swap API endpoint. */
const ENDPOINT = 'https://nexa.exchange/v1'

/**
 * Swap Store
 */
export const useSwapStore = defineStore('swap', {
    state: () => ({
        SWAP_ENDPOINT: 'https://nexa.exchange/v1/swap/',

        _settleAddress: null,
        _videoPreviewClass: null,

        _isValidAddress: false,

        _isShowingBch: false,
        _isShowingNexa: false,
        _isShowingVideoPreview: null,

        _video: null,
        _scanner: null,
        _cameraError: null,

    }),

    getters: {
        settleAddress() {
            return this._settleAddress
        },

        isShowingBch() {
            return this._isShowingBch
        },

        isShowingNexa() {
            return this._isShowingNexa
        },

        isShowingVideoPreview() {
            return this._isShowingVideoPreview
        },

        isValidAddress() {
            /* Initialize locals. */
            let decoded

            if (!this.settleAddress || this.settleAddress === '') {
                return false
            }

            try {
                decoded = decodeAddress(this.settleAddress)
                console.log('DECODED ADDRESS', decoded)
            } catch (err) {
                console.error(err)
                return err
            }

            if (!decoded) {
                console.error('API ERROR!')

                return false
            }

            /* Validate address. */
            if (decoded.hash) {
                return true
            }

            /* Return false (by default). */
            return false
        },

        videoPreviewClass() {
            return this._videoPreviewClass
        },

    },

    actions: {
        /**
         * Start (New) Order
         *
         * Resets all (Swap) order parameters to their initial state.
         */
        startOrder() {
            this._isShowingNexa = false
        },

        /**
         * Request Swap
         *
         * Make a remote API request with order details.
         *
         * Will receive an order id.
         *
         * @param _destination
         * @returns
         */
        async requestSwap(_destination) {
            let body
            let headers
            let method
            let orderid
            let response

            method = 'POST'

            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

            body = JSON.stringify({
                method: 'swap',
                params: {
                    from: 'BCH',
                    fromNetwork: 'BCH',
                    to: 'NEXA',
                    toNetwork: 'NEXA',
                    address: _destination,
                    promoid: 'usze90', // System.promoid
                }
            })

            response = await $fetch(ENDPOINT + '/swap', {
                method,
                headers,
                body,
            })
            console.log('REQUEST SWAP', response)

            /* Set order id. */
            orderid = response.id

            /* Return order id. */
            return orderid
        },

        startNexa() {
            this._isShowingNexa = true
        },

        startUsdt() {
            /* Request swap. */
            this.requestSwap(settleAddress.value)
        },

        startBch() {
            /* Request swap. */
            this.requestSwap(settleAddress.value)
        },

        async openVideoPreview() {
            this._isShowingVideoPreview = true

            return await System.sleep(100)
        },

        setReceiver(_result) {
            this._settleAddress = _result

            this._isShowingVideoPreview = false

            if (this._scanner) {
                this._scanner.destroy()
                this._scanner = null
            }
        },

        /**
         * Start Scanner
         *
         * NOTE: This DOES NOT work on any of the Android devices tested.
         *       However, it DOES work well on all iOS devices tested.
         */
        async startScanner(_canvas) {
            let address

            if (this._scanner) {
                this._scanner.destroy()
                this._scanner = null

                this._isShowingVideoPreview = false

                return
            }

            try {
                navigator.getUserMedia =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia

                if (!navigator.mediaDevices.getUserMedia && !navigator.getUserMedia) {
                    this._cameraError = true
                } else {
                    /* Initialize video element. */
                    // this._video = document.getElementById('video-display')
                    // console.log('VIDEO', this._video)
                    // console.log('CANVAS', _canvas)

                    this._videoPreviewClass = 'p-1 w-full h-fit flex bg-yellow-900 border-2 border-yellow-400 rounded shadow-md z-10'

                    this._scanner = new QrScanner(_canvas, (_data) => {
                        // FIXME: Build a new link parser
                        address = _data
                        // address = parseLink(_data)

                        /* Validate (scanner) address. */
                        if (address) {
                            // this._settleAddress. = address

                            this.setReceiver(address)
                        }
                    })

                    /* Start scanner. */
                    await this._scanner.start()
                }
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                this._cameraError = true

                /* Bugsnag alert. */
                throw new Error(err)
            }
        },

    },
})
