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

        async swap(_trade, _amount) {
            /* Initialize locals. */
            let error
            let response
            let scriptArgs

            /* Set script arguments. */
            scriptArgs = _trade.scriptArgs

            /* Request trading post (swap). */
            response = await swap_v1(scriptArgs, _amount)
                .catch(err => {
                    console.error('ERROR', err)
                    error = err
                })
            // console.log('RESPONSE', response)

            /* Return response. */
            return error || response
        },

    },
})
