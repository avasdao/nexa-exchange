<script setup lang="ts">
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'

import {
    getAddressTokenHistory,
    getTransaction,
} from '@nexajs/rostrum'

const ENDPOINT = 'https://nexa.exchange/v1/ticker/quote'

const STUDIO_POOL_ADDR = 'nexa:nprqq9xh03064ut44k5pp3zkvr4vh422ez7ukfqqzjefztzvcc03hr97t3m7h40wagnyzezlzqpzcqg5gh6mn4qa6u33g8mjr3e8w9wxjrldhw7kqqqq47nsfsmf'

const listDisplay = ref(null)
const tokenid = ref(null)
const tokenidHex = ref(null)
const txHistory = ref(null)

const displayAge = (_timestamp) => {
    let formatted

    formatted = moment.unix(_timestamp).fromNow()

    /* Use abbreviations. */
    formatted = formatted.replaceAll('minutes', 'mins')
    formatted = formatted.replaceAll('minute', 'min')
    formatted = formatted.replaceAll('hours', 'hrs')
    formatted = formatted.replaceAll('hour', 'hr')

    return formatted
}

const init = async () => {
    /* Initialize locals. */
    let history
    let input
    let output
    let price
    let satoshisIn
    let satoshisOut
    let ticker
    let tokenid
    let tokenidHex
    let tokensIn
    let tokensOut
    let transaction
    let usdValue

    /* Set list display. */
    listDisplay.value = 5

    tokenidHex = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000' // STUDIO

    ticker = await $fetch(`${ENDPOINT}/${tokenidHex}`)
        .catch(err => console.error(err))
    console.log('TICKER', ticker)

    price = ticker.price
    console.log('PRICE', price)

    history = await getAddressTokenHistory(STUDIO_POOL_ADDR)
        .catch(err => console.error(err))

    /* Select the most recent (transactions). */
    history = history.transactions.reverse().slice(0, 20)
    // console.log('CONTRACT HISTORY', history)

    /* Initailize transaction history. */
    txHistory.value = []

    history.forEach(async _tx => {
        transaction = await getTransaction(_tx.tx_hash)
        // console.log('TRANSACTION', _tx.tx_hash, transaction)

        input = transaction.vin[0]
        // console.log('TX INPUT', input)

        satoshisIn = input.value_satoshi
        // console.log('TX INPUT (satoshis):', satoshisIn)

        tokensIn = input.groupQuantity
        // console.log('TX INPUT (tokens):', tokensIn)

        output = transaction.vout[0]
        // console.log('TX OUTPUT', output)

        satoshisOut = output.value_satoshi
        // console.log('TX OUTPUT (satoshis):', satoshisOut)

        tokensOut = output.scriptPubKey.groupQuantity
        // console.log('TX OUTPUT (tokens):', tokensOut)

        /* Calculate USD value. */
        usdValue = Math.abs(tokensOut - tokensIn) * price
        // usdValue = (tokensOut - tokensIn) * price
        usdValue = numeral(usdValue).format('$0,0.00')

        txHistory.value.push({
            txidem: transaction.txidem,
            quote: {
                ticker: 'STUDIO',
                quantity: (tokensOut - tokensIn),
            },
            usdValue,
            timestamp: transaction.time,
        })

    })
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="w-full px-3 sm:px-10">
        <ul v-if="txHistory" role="list" class="divide-y divide-amber-300">

            <li v-for="swap of txHistory.slice(0, listDisplay)" :key="swap.txidem" class="py-3">
                <NuxtLink :to="'https://explorer.nexa.org/tx/' + swap.txidem" target="_blank" class="px-3 py-2 grid grid-cols-4 gap-x-3 items-center border border-transparent rounded hover:bg-amber-50 hover:border-amber-200">
                    <div class="col-span-2 flex flex-row items-center gap-2">
                        <img src="https://nexa.studio/icon.svg" alt="" class="w-10 sm:w-12 h-auto flex-none" />

                        <h3 class="flex flex-col truncate text-xs sm:text-sm font-medium text-gray-400">
                            <span class="-mb-1 lg:-mb-0 text-lg sm:text-xl text-semibold text-gray-600 tracking-widest">
                                {{numeral(Math.abs(swap.quote.quantity)).format('0,0[.]00')}}
                            </span>

                            {{swap.quote.ticker}}
                        </h3>
                    </div>

                    <h3 class="flex truncate text-xl sm:text-2xl font-bold text-rose-600 justify-center tracking-widest">
                        {{swap.usdValue}}
                    </h3>

                    <time datetime="2023-01-23T11:00" class="flex justify-end text-xs sm:text-sm text-gray-500 italic">
                        {{displayAge(swap.timestamp)}}
                    </time>
                </NuxtLink>
            </li>

        </ul>

        <div v-if="txHistory && listDisplay < 20" class="flex justify-end">
            <button @click="listDisplay = listDisplay + 5" class="px-3 py-1 bg-amber-200 rounded-lg shadow text-base text-amber-800 font-medium border-2 border-amber-400 tracking-wider hover:bg-amber-300">
                show (5) more...
            </button>
        </div>

    </main>
</template>
