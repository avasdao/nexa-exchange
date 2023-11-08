<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

useHead({
    title: `Pools — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const SATOSHIS_PER_NEXA = 100

const pools = ref(null)

const init = async () => {
    pools.value = await $fetch('/api/pools')
        .catch(err => console.error(err))
    console.log('POOLS', pools.value)
}

const totalTradeAmount = (_token) => {
    if (_token.nextFoundation) {
        if (_token.nextFoundation['NEX']) {
            return '$' + numeral(_token.nextFoundation['NEX']).format('0,0.00[000000]')
        }

        if (_token.nextFoundation['USD']) {
            return '$' + numeral(_token.nextFoundation['USD']).format('0,0.00[000000]')
        }
    }

    if (_token.foundation) {
        if (_token.foundation['NEX']) {
            return '$' + numeral(_token.foundation['NEX']).format('0,0.00[000000]')
        }

        if (_token.foundation['USD']) {
            return '$' + numeral(_token.foundation['USD']).format('0,0.00[000000]')
        }
    }

    return 'n/a'
}

const displayFloor = (_token) => {
    /* Initialize locals. */
    let rate

    if (_token.floor === 0) {
        return 'none'
    } else {
        rate = (_token.floor / 100.0) / SATOSHIS_PER_NEXA

        return `${numeral(1.00).format('0,0.00')} $${_token.ticker} per ${numeral(rate).format('0,0.00[00]')} $NEXA`
    }
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
    <header class="py-8 flex flex-col gap-3 justify-center items-center bg-gradient-to-b from-sky-700 to-sky-900 border-y-2 border-amber-300 shadow">
        <h1 class="text-6xl font-light text-sky-100 tracking-wider">
            Liquidity Pools
        </h1>

        <h3 class="flex flex-col justify-center items-center text-xl font-light text-sky-200 italic">
            instant asset swaps from trustless &amp; permissionless micro-pools
        </h3>
    </header>

    <main class="max-w-6xl mx-auto px-3 py-5 flex flex-col gap-4">
        <div class="px-4 sm:px-6 lg:px-8">

            <div class="-mx-4 mt-8 flow-root sm:mx-0">
                <table class="min-w-full">
                    <colgroup>
                        <col class="w-full sm:w-1/2" />
                        <col class="sm:w-1/6" />
                        <col class="sm:w-1/6" />
                        <col class="sm:w-1/6" />
                    </colgroup>

                    <thead class="border-b border-gray-300 text-gray-900">
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-0">
                                Pool Overview
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                TVL
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                Last Trade
                            </th>

                            <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-lg font-semibold text-gray-900 sm:pr-0">
                                24h Volume
                            </th>

                            <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-lg font-semibold text-gray-900 sm:pr-0">
                                &nbsp;
                            </th>
                        </tr>
                    </thead>

                    <tbody v-if="pools === null">
                        <tr class="border-b border-gray-200">
                            <td colspan="5" class="py-10">
                                <SkeletonPool />
                            </td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr v-for="token of pools" :key="token.id" class="border-b border-gray-200">
                            <td class="max-w-0 py-5 pl-4 pr-3 text-lg sm:pl-0">
                                <div class="flex flex-row gap-3">
                                    <img :src="token.iconUrl" class="h-16 w-auto" />

                                    <section class="flex flex-col gap-0">
                                        <div class="font-medium text-gray-900 text-2xl tracking-wider">
                                            {{token.title}}
                                        </div>

                                        <div class="flex flex-row gap-2 items-baseline">
                                            <span class="text-gray-500 text-xs uppercase">
                                                Trade Asset
                                            </span>

                                            <h4 class="text-sm text-sky-700">
                                                ${{token.ticker}}
                                            </h4>
                                        </div>

                                        <div class="flex flex-row gap-2 items-baseline">
                                            <span class="text-gray-500 text-xs uppercase">
                                                Trade Floor
                                            </span>

                                            <h4 class="text-sm text-sky-700">
                                                {{displayFloor(token)}}
                                            </h4>
                                        </div>

                                        <div class="flex flex-row gap-2 items-baseline">
                                            <span class="text-gray-500 text-xs uppercase">
                                                Owner
                                            </span>

                                            <NuxtLink to="https://twitter.com/0xShomari" target="_blank" class="flex flex-row gap-1 items-center text-sm text-blue-500 hover:text-blue-400">
                                                0xShomari

                                                <svg class="w-3 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                                                </svg>
                                            </NuxtLink>
                                        </div>

                                        <p class="mt-1 text-gray-500 text-xs italic">
                                            {{token.summary}}
                                        </p>
                                    </section>
                                </div>
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                $10.1337
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                {{totalTradeAmount(token)}}
                            </td>

                            <td class="py-5 pl-3 pr-4 text-right text-lg text-gray-500 sm:pr-0">
                                $0.0000
                            </td>

                            <td class="py-5 pl-6 pr-4 sm:pr-0 flex flex-col gap-3">
                                <button class="w-full px-5 py-2 bg-sky-500 text-sky-50 text-xl font-medium rounded-lg shadow hover:bg-sky-400">
                                    Swap
                                </button>

                                <button class="w-full px-5 py-2 bg-green-600 text-green-50 text-xl font-medium rounded-lg shadow hover:bg-sky-400">
                                    Farm
                                </button>

                                <NuxtLink :to="'https://nexa.exchange/token/' + token.id" target="_blank" class="w-full px-5 py-2 bg-amber-500 text-amber-50 text-xl font-medium rounded-lg shadow hover:bg-amber-400">
                                    Details
                                </NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </main>

    <Footer />
</template>
