<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

useHead({
    title: `Borrow — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const lenders = ref(null)

const init = async () => {
    lenders.value = await $fetch('/api/lenders')
        .catch(err => console.error(err))
    console.log('LENDERS', lenders.value)
}

const totalValueLocked = (_token) => {
    return '$133.70'
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
            Borrow Crypto
        </h1>

        <h3 class="flex flex-col justify-center items-center text-xl font-light text-sky-200 italic">
            and you will NEVER have to worry about parting with your Precious!
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
                        <col class="sm:w-1/6" />
                    </colgroup>

                    <thead class="border-b border-gray-300 text-gray-900">
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-0">
                                Lender Overview
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                Rating
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                APY %
                            </th>

                            <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-lg font-semibold text-gray-900 sm:pr-0">
                                24h Volume
                            </th>

                            <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-lg font-semibold text-gray-900 sm:pr-0">
                                &nbsp;
                            </th>
                        </tr>
                    </thead>

                    <tbody v-if="lenders === null">
                        <tr class="border-b border-gray-200">
                            <td colspan="5" class="table-cell py-5">
                                <SkeletonLender />
                            </td>
                        </tr>
                    </tbody>

                    <tbody v-if="lenders?.length === 0">
                        <tr class="border-b border-gray-200">
                            <td colspan="5" class="table-cell p-16 text-center">
                                <h3 class="text-xl italic text-gray-500">
                                    Sorry, we don't have any Lenders available at this time..
                                </h3>
                            </td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr v-for="token of lenders" :key="token.id" class="border-b border-gray-200">
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

                                        <p class="mt-1 text-gray-600 text-xs italic leading-5 tracking-wider">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis rerum ipsam dolorum iste iure hic cum ab illum obcaecati ea ullam enim, corporis, corrupti repudiandae eius non atque natus!
                                        </p>
                                    </section>
                                </div>
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                ${{token.ticker}}
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                {{totalValueLocked(token)}}
                            </td>

                            <td class="py-5 pl-3 pr-4 text-right text-lg text-gray-500 sm:pr-0">
                                $80.88
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

    <Footer />
</template>
