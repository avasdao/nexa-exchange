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

const newLoan = async () => {
    console.log('NEW LOAN REQUEST')
}

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

    <section>
        <div class="relative isolate overflow-hidden">
            <!-- Secondary navigation -->
            <header class="pb-4 pt-6 sm:pb-6">
                <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                    <h1 class="text-xl font-medium leading-7 text-gray-700">
                        My Balance Sheet
                    </h1>

                    <div class="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                        <a href="javascript://" class="text-indigo-600">Last 7 days</a>
                        <a href="javascript://" class="text-gray-700">Last 30 days</a>
                        <a href="javascript://" class="text-gray-700">All-time</a>
                    </div>

                    <button
                        @click="newLoan"
                        class="ml-auto flex items-center gap-x-1 rounded-md bg-lime-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                    >
                        <svg class="-ml-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                        </svg>
                        New Loan Request
                    </button>
                </div>
            </header>

            <!-- Stats -->
            <div class="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                <dl class="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                    <div class="flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8">
                        <dt class="text-sm font-medium leading-6 text-gray-500">Revenue</dt>
                        <dd class="text-xs font-medium text-gray-700">+0.00%</dd>
                        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$0.00</dd>
                    </div>

                    <div class="flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 sm:border-l">
                        <dt class="text-sm font-medium leading-6 text-gray-500">Overdue invoices</dt>
                        <dd class="text-xs font-medium text-rose-600">+0.00%</dd>
                        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$0.00</dd>
                    </div>

                    <div class="flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 lg:border-l">
                        <dt class="text-sm font-medium leading-6 text-gray-500">Outstanding invoices</dt>
                        <dd class="text-xs font-medium text-gray-700">+0.00%</dd>
                        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$0.00</dd>
                    </div>

                    <div class="flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 sm:border-l">
                        <dt class="text-sm font-medium leading-6 text-gray-500">Expenses</dt>
                        <dd class="text-xs font-medium text-rose-600">+0.00%</dd>
                        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$0.00</dd>
                    </div>
                </dl>
            </div>

            <div
                class="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                aria-hidden="true"
            >
                <div
                    class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                    style="clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%);"
                ></div>
            </div>
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-3 py-5 flex flex-col gap-4">
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
    </section>

    <Footer />
</template>
