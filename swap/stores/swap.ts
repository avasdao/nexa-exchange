/* Import modules. */
import { decodeAddress } from '@nexajs/address'
import { defineStore } from 'pinia'

/* Initialize Swap API endpoint. */
const ENDPOINT = 'https://nexa.exchange/v1'

/**
 * Swap Store
 */
export const useSwapStore = defineStore('swap', {
    state: () => ({
        SWAP_ENDPOINT: 'https://nexa.exchange/v1/swap/',

        _settleAddress: null,
        _isShowingVideoPreview: null,
        _videoPreviewClass: null,

        _isShowingNexa: false,
        _isValidAddress: false,

        _video: null,
        _scanner: null,
        _cameraError: null,

    }),

    getters: {
        settleAddress() {
            return this._settleAddress
        },

        isShowingNexa() {
            return this._isShowingNexa
        },

        isShowingVideoPreview() {
            return this._isShowingVideoPreview
        },

        isValidAddress() {
            return true
        },

    },

    actions: {
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

        /**
         * Validate Address
         *
         * Makes a remote call to the the Core endpoint of the API.
         */
        async isValidAddress_REF(_address) {
            let decoded

            if (!_address || _address === '') {
                return false
            }

            try {
                decoded = decodeAddress(_address)
                console.log('DECODED ADDRESS', decoded)

            } catch (err) {
                console.error('FIXME: SHOW UI ERROR!')
                console.error(err)
            }

            if (!decoded) {
                console.error('API ERROR!')

                return false
            }

            /* Validate address. */
            if (decoded.hash) {
                return true
            }

            return false
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

        openScanner() {
            showVideoPreview.value = true

            setTimeout(() => {
                /* Start scanner. */
                startScanner()
            }, 100)
        },

        setReceiver(_result) {
            // console.log('SET DESTINATION', _result)

            // showVideoPreview = 'hidden'
            showVideoPreview.value = false

            if (scanner) {
                scanner.destroy()
                scanner = null
            }
        },

        /**
         * Start Scanner
         *
         * NOTE: This DOES NOT work on any of the Android devices tested.
         *       However, it DOES work well on all iOS devices tested.
         */
        async startScanner() {
            console.log('SCANNER', scanner)
            if (scanner) {
                scanner.destroy()
                scanner = null

                // showVideoPreview = 'hidden'
                showVideoPreview.value = false

                return
            }

            try {
                navigator.getUserMedia =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia

                if (!navigator.mediaDevices.getUserMedia && !navigator.getUserMedia) {
                    cameraError = true
                } else {
                    /* Initialize video element. */
                    video = document.getElementById('video-display')

                    videoPreviewClass.value = 'flex w-full bg-yellow-300 border-4 border-yellow-500 p-1 rounded z-10'

                    scanner = new QrScanner(video, (_data) => {
                        console.log('SCANNER DATA', _data)

                        // FIXME: Build a new link parser
                        const address = _data
                        // const address = parseLink(_data)

                        /* Validate (scanner) address. */
                        if (address) {
                            settleAddress.value = address

                            setReceiver(address)
                        }

                        // validateAddress(address)
                        validateAddress()
                    })

                    /* Start scanner. */
                    await scanner.start()
                }
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                cameraError = true

                /* Bugsnag alert. */
                throw new Error(err)
            }
        },

    },
})
