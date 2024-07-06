<script setup lang="ts">
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'

useHead({
    title: `Tokens — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize runtime config. */
const runtimeConfig = useRuntimeConfig()
// console.log('RUNTIME CONFIG', runtimeConfig)

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const tokens = ref(null)

const init = async () => {
    console.log('endpoint', runtimeConfig?.public?.API_ENDPOINT)
    console.log('endpoint-raw', runtimeConfig?.public?.API_ENDPOINT_RAW)
    console.log('endpoint-nuxt', runtimeConfig?.public?.API_ENDPOINT_NUXT)
    const assets = await $fetch(runtimeConfig?.public?.API_ENDPOINT + '/assets')
    // tokens.value = await $fetch('/api/tokens')
        .catch(err => console.error(err))
    console.log('ASSETS', assets)

    tokens.value = assets.filter(_asset => {
        return typeof _asset.ticker !== 'undefined'
    })
}

const displayPrice = (_token) => {
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

const displayGenesis = (_token) => {
    /* Initialize locals. */
    let genesis

    if (
        _token?.genesis?.blocktime === 0 ||
        _token?.genesis?.blocktime === null ||
        typeof _token?.genesis?.blocktime === 'undefined'
    ) {
        return 'n/a'
    } else {
        genesis = moment.unix(_token.genesis.blocktime).format('lll')

        return genesis
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
            Tokens
        </h1>

        <h3 class="flex flex-col justify-center items-center text-xl font-light text-sky-200 italic">
            a complete listing of ALL registered assets
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
                                Asset Overview
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                Ticker
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                Market Value
                            </th>

                            <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-lg font-semibold text-gray-900 sm:pr-0">
                                24h Volume
                            </th>

                            <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-lg font-semibold text-gray-900 sm:pr-0">
                                &nbsp;
                            </th>
                        </tr>
                    </thead>

                    <tbody v-if="tokens === null">
                        <tr class="border-b border-gray-200">
                            <td colspan="5" class="table-cell py-5">
                                <SkeletonToken />
                            </td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr v-for="token of tokens" :key="token.id" class="border-b border-gray-200">
                            <td class="max-w-0 py-5 pl-4 pr-3 text-lg sm:pl-0">
                                <div class="flex flex-row gap-3">
                                    <img :src="token.icon" class="h-16 w-auto" />

                                    <section>
                                        <div class="font-medium text-gray-900 text-2xl tracking-wider">
                                            {{token.name}}
                                        </div>

                                        <p class="mt-1 text-gray-600 text-xs italic leading-5 tracking-wider">
                                            {{token?.summary}}
                                        </p>

                                        <div class="mt-1 flex flex-row gap-2 items-baseline">
                                            <span class="text-gray-500 text-xs uppercase">
                                                Ticker
                                            </span>

                                            <h4 class="text-sm text-sky-700">
                                                ${{token.ticker}}
                                            </h4>
                                        </div>

                                        <div class="flex flex-row gap-2 items-baseline">
                                            <span class="text-gray-500 text-xs uppercase">
                                                Genesis
                                            </span>

                                            <h4 class="text-sm text-gray-700">
                                                {{displayGenesis(token)}}
                                            </h4>
                                        </div>

                                    </section>
                                </div>
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                ${{token.ticker}}
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                {{displayPrice(token)}}
                            </td>

                            <td class="py-5 pl-3 pr-4 text-right text-lg text-gray-500 sm:pr-0">
                                $1,337.88
                            </td>

                            <td class="py-5 pl-6 pr-4 sm:pr-0 flex flex-col gap-3">
                                <button class="w-full px-5 py-2 bg-sky-500 text-sky-50 text-xl font-medium rounded-lg shadow hover:bg-sky-400">
                                    Swap
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
