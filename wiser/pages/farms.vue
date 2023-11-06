<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

useHead({
    title: `Farms — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const farms = ref(null)

const init = async () => {
    farms.value = await $fetch('/api/farms')
        .catch(err => console.error(err))
    console.log('FARMS', farms.value)
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

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-6xl mx-auto px-3 py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Loyalty Farms
        </h1>

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
                                Farm Overview
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                Ticker
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

                    <tbody>
                        <tr v-for="token of farms" :key="token.id" class="border-b border-gray-200">
                            <td class="max-w-0 py-5 pl-4 pr-3 text-lg sm:pl-0">
                                <div class="flex flex-row gap-3">
                                    <img :src="token.iconUrl" class="h-16 w-auto" />

                                    <section>
                                        <div class="font-medium text-gray-900 text-2xl tracking-wider">
                                            {{token.title}}
                                        </div>

                                        <p class="mt-1 flex flex-row gap-2 items-baseline">
                                            <span class="text-gray-500 text-xs uppercase">
                                                Owner
                                            </span>

                                            <NuxtLink to="https://twitter.com/0xShomari" target="_blank" class="text-base text-blue-500 hover:text-blue-400">
                                                0xShomari
                                            </NuxtLink>
                                        </p>

                                        <p class="mt-1 text-gray-500 text-xs">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis rerum ipsam dolorum iste iure hic cum ab illum obcaecati ea ullam enim, corporis, corrupti repudiandae eius non atque natus!
                                        </p>
                                    </section>
                                </div>
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                ${{token.ticker}}
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                {{totalTradeAmount(token)}}
                            </td>

                            <td class="py-5 pl-3 pr-4 text-right text-lg text-gray-500 sm:pr-0">
                                $13,370.12
                            </td>

                            <td class="py-5 pl-6 pr-4 sm:pr-0 flex flex-col gap-3">
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
</template>
