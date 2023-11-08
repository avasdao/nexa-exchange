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

const plantations = ref(null)

const init = async () => {
    plantations.value = await $fetch('/api/plantations')
        .catch(err => console.error(err))
    console.log('PLANTATIONS', plantations.value)
}

const totalValueLocked = (_plantation) => {
    return '$133.70'
}

const buildFarm = () => {
    alert('Farm building is not yet available.')
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
            Loyalty Farms
        </h1>

        <h3 class="flex flex-col justify-center items-center text-xl font-light text-sky-200 italic">
            spend plantations to build Farms and collect a share of Plantation rewards
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
                                Plantation Overview
                            </th>

                            <th scope="col" class="hidden px-3 py-3.5 text-center text-lg font-semibold text-gray-900 sm:table-cell">
                                TVL
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

                    <tbody v-if="plantations === null">
                        <tr class="border-b border-gray-200">
                            <td colspan="5" class="table-cell py-5">
                                <SkeletonFarm />
                            </td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr v-for="plantation of plantations" :key="plantation.id" class="border-b border-gray-200">
                            <td class="max-w-0 py-5 pl-4 pr-3 text-lg sm:pl-0">
                                <div class="flex flex-row gap-3">
                                    <img :src="plantation.iconUrl" class="h-16 w-auto" />

                                    <section>
                                        <div class="font-medium text-gray-900 text-2xl tracking-wider">
                                            {{plantation.name}}
                                        </div>

                                        <div class="flex flex-row gap-2 items-baseline">
                                            <span class="text-gray-500 text-xs uppercase">
                                                Reward Asset
                                            </span>

                                            <h4 class="text-sm text-sky-700">
                                                ${{plantation.ticker}}
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

                                        <p class="mt-1 text-gray-600 text-xs italic leading-5 tracking-wider">
                                            {{plantation.summary}}
                                        </p>
                                    </section>
                                </div>
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                {{totalValueLocked(plantation)}}
                            </td>

                            <td class="hidden px-3 py-5 text-center text-lg text-gray-500 sm:table-cell">
                                3.33%
                            </td>

                            <td class="py-5 pl-3 pr-4 text-right text-lg text-gray-500 sm:pr-0">
                                $80.88
                            </td>

                            <td class="py-5 pl-6 pr-4 sm:pr-0 flex flex-col gap-3">
                                <button @click="buildFarm" class="w-full px-5 py-2 bg-green-600 text-green-50 text-xl font-medium rounded-lg shadow hover:bg-sky-400">
                                    Farm
                                </button>

                                <NuxtLink :to="'/plantation/' + plantation.id" class="w-full px-5 py-2 bg-amber-500 text-amber-50 text-xl font-medium rounded-lg shadow hover:bg-amber-400">
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
