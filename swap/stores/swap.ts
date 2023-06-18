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

    }),

    getters: {
        // TODO
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
        async isValidAddress(_address) {
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

    },
})
