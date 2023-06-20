/* Import modules. */
import { decodeAddress } from '@nexajs/address'
import { defineStore } from 'pinia'
import QrScanner from 'qr-scanner'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

/**
 * Swap Store
 */
export const useSwapStore = defineStore('swap', {
    state: () => ({
        EXCHANGE_ENDPOINT: 'https://nexa.exchange/v1',

        _depositAsset: null,
        _settleAsset: null,
        _settleAddress: null,
        _settleAmount: null,

        _isValidAddress: false,
        _isShowingBch: false,
        _isShowingDash: false,
        _isShowingNexa: false,
        _isShowingUsdt: false,
        _isShowingVideoPreview: null,

        _video: null,
        _scanner: null,
        _cameraError: null,
        _videoPreviewClass: null,
    }),

    getters: {
        depositAsset() {
            return this._depositAsset
        },

        settleAsset() {
            return this._settleAsset
        },

        settleAddress() {
            return this._settleAddress
        },

        settleAmount() {
            return this._settleAmount
        },

        isShowingBch() {
            return this._isShowingBch
        },

        isShowingDash() {
            return this._isShowingDash
        },

        isShowingNexa() {
            return this._isShowingNexa
        },

        isShowingUsdt() {
            return this._isShowingUsdt
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
                /* Decode address. */
                decoded = decodeAddress(this.settleAddress)
            } catch (err) {
                console.error(err)
                /* Return the error message. */
                return err?.message
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
         * Reset Order
         *
         * Resets all (Swap) order parameters to their initial state.
         */
        resetOrder() {
            this._isShowingBch = false
            this._isShowingDash = false
            this._isShowingNexa = false
            this._isShowingUsdt = false

            this._depositAsset = null
            this._settleAsset = null
            this._settleAddress = null
            this._settleAmount = null
        },

        setDepositAsset(_asset) {
            /* Set deposit asset. */
            this._depositAsset = _asset
        },

        setSettleAsset(_asset) {
            /* Set settle asset. */
            this._settleAsset = _asset
        },

        setSettleAddress(_address) {
            /* Set settle address. */
            this._settleAddress = _address
        },

        setSettleAmount(_amount) {
            /* Set settle amount. */
            this._settleAmount = _amount
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
        async requestSwap() {
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
                    depositAsset: this.depositAsset,
                    depositNetwork: this.depositAsset,
                    settleAsset: this.settleAsset,
                    settleNetwork: this.settleAsset,
                    settleAddress: this.settleAddress,
                    settleAmount: this.settleAmount,
                    promoid: System.promoid
                }
            })

            response = await $fetch(this.EXCHANGE_ENDPOINT, {
                method,
                headers,
                body,
            })
            console.log('REQUEST SWAP', response)

            /* Set order id. */
            orderid = response.id
            console.log('ORDER ID', orderid)

            /* Reset order. */
            this.resetOrder()

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
