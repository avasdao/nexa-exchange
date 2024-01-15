/* Import modules. */
import { defineStore } from 'pinia'

import swap_v1 from './amm/swap_v1.js'

const runtimeConfig = useRuntimeConfig()
const apiEndpoint = runtimeConfig.public.API_ENDPOINT

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
            _amount,
        ) {
            /* Initialize locals. */
            let error
            let poolArgs
            let pools
            let response
            let DEV_POOL

            /* Request pools. */
            pools = await $fetch(`${apiEndpoint}/pools`)
                .catch(err => console.error(err))
            console.log('POOLS', pools)

            if (!pools || pools.length === 0) {
                return alert(`Oops! There are NO pools currently available for that trade.`)
            }

// FIXME FOR DEVELOPMENT PURPOSES ONLY
DEV_POOL = pools.find(_pool => {
    return _pool.id === 'nprqq9xh03064ut44k5pp3zkvr4vh422ez7ukfqqzjefztzvcc03hr97t3m7h40wagnyzezlzqpzcqg5gh6mn4qa6u33g8mjr3e8w9wxjrldhw7kqqqq47nsfsmf'
})

            /* Set (pool) script arguments. */
            // poolArgs = pools[0].poolArgs
            poolArgs = {
                provider: DEV_POOL.providerid,
                payout: DEV_POOL.providerid,
                fee: DEV_POOL.fee,
                base: DEV_POOL.base,
                ceiling: DEV_POOL.ceiling,
                floor: DEV_POOL.floor,
            }

            /* Request trading post (swap). */
            response = await swap_v1(
                poolArgs, _baseAsset, _tradeAsset, _amount)
                // .catch(err => {
                //     console.error('ERROR', err)
                //     error = err
                // })
            console.log('SWAP RESPONSE', response)

            /* Return response. */
            // return error || response
            return response
        },

    },
})
