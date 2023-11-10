/* Import modules. */
import { defineStore } from 'pinia'

import swap_v1 from './amm/swap_v1.js'

/**
 * Automated Market Maker Store
 */
export const useAmmStore = defineStore('amm', {
    state: () => ({
        // TBD
    }),

    getters: {
        session(_state) {
            // return _state._session
        },

    },

    actions: {
        load(_tradeid) {
            return {
                id: 'my-test-amm',
            }
        },

        getCategoryById(_cateogry) {
            return 'My Category'
        },

        async swap(
            _baseAsset,
            _tradeAsset,
            _action,
            _amount,
        ) {
            /* Initialize locals. */
            let error
            let pools
            let response
            let scriptArgs

            /* Request pools. */
            pools = await $fetch('/api/pools')
                .catch(err => console.error(err))
            console.log('POOLS', pools)

            /* Set (pool) script arguments. */
            scriptArgs = pools[0].scriptArgs

            /* Request trading post (swap). */
            response = await swap_v1(
                scriptArgs, _baseAsset, _tradeAsset, _action, _amount)
                .catch(err => {
                    console.error('ERROR', err)
                    error = err
                })
            console.log('SWAP RESPONSE', response)

            /* Return response. */
            return error || response
        },

    },
})
