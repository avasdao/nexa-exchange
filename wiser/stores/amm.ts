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
            let target
let DEV_POOL

            /* Set target. */
            target = `${apiEndpoint}/pools/${_baseAsset}`
            console.log('TARGET', target)

            /* Request pools. */
            pools = await $fetch(target)
                .catch(err => console.error(err))
            console.log('POOLS', pools)

            if (!pools || pools.length === 0) {
                return alert(`Oops! There are NO pools currently available for that trade.`)
            }

// FIXME FOR DEVELOPMENT PURPOSES ONLY
DEV_POOL = pools.find(_pool => {
    return _pool.id === '0014d77c5faaf175ada810c45660eacbd54ac8bdcb240014b2912c4cc61f1b8cbe5c77ebd5eeea2641645f10022c011445f5b9d41dd723141f721c727715c690fedbbbd60000'
})
console.log('DEV POOL', DEV_POOL)

            /* Set (pool) script arguments. */
            // poolArgs = pools[0].poolArgs
            poolArgs = {
                admin: DEV_POOL.scriptArgs.admin,
                adminFee: DEV_POOL.scriptArgs.adminFee,
                provider: DEV_POOL.scriptArgs.providerPubkey,
                providerFee: DEV_POOL.scriptArgs.providerFee,
                payout: DEV_POOL.scriptArgs.payout,
                ceiling: DEV_POOL.scriptArgs.ceiling,
                floor: DEV_POOL.scriptArgs.floor,
            }
            console.log('POOL ARGS', poolArgs)

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
