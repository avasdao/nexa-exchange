<script setup>
/* Import modules. */
import numeral from 'numeral'

/* Set API endpoint. */
const API_ENDPOINT = 'https://nexa.exchange/ticker'

/* Set app URL. */
const APP_URL = 'https://app.nexa.exchange'

const showExtrasMenu = ref(false)
const showSolutionsMenu = ref(false)
const showMobileMenu = ref(false)

const tickerHandler = ref(null)
const ticker = ref(null)

let displayQuote = ref(null)
let priceChg24h = ref(null)
let vol24h = ref(null)

// const displayTicker = computed(() => {
//     if (!ticker.value) {
//         return 'n/a'
//     }

//     /* Set quote. */
//     const quote = ticker.value.quote

//     /* Validate quote. */
//     if (!quote) {
//         return 'n/a'
//     }

//     /* Set price. */
//     const price = quote?.USD?.price

//     /* Validate price. */
//     if (!price) {
//         return 'n/a'
//     }

//     /* Return formatted price. */
//     return numeral(price * 1000000).format('$0,0.00')
// })


const toggleSolutions = () => {
    showExtrasMenu.vaue = false
    showSolutionsMenu.value = !showSolutionsMenu.value
}

const toggleExtras = () => {
    showSolutionsMenu.value = false
    showExtrasMenu.value = !showExtrasMenu.value
}

const launchApp = () => {
    showSolutionsMenu.value = false

    // window.open(APP_URL)
}

const updateTicker = async () => {
    ticker.value = await $fetch('/ticker')
        .catch(err => console.error(err))
    console.info('Latest ticker:', ticker.value)

    const price = (ticker.value?.quote.USD.price * 1000000) || 'n/a'
    // console.log('PRICE', price)

    const pctChg24h = numeral(ticker.value?.quote.USD.pctChg24h / 100.0).format('0.0%') || 'n/a'
    // console.log('PCT CHANGE 24H', pctChg24h)

    const vol24 = numeral(ticker.value?.quote.USD.vol24).format('0,0.0a') || 'n/a'
    // console.log('VOLUME 24H', vol24)

    displayQuote.value = numeral(price).format('$0,0.00')

    priceChg24h.value = pctChg24h

    vol24h.value = vol24
}


// this.tickerHandler = setInterval(() => {
//     this.updateTicker()
// }, 30000)

updateTicker()

</script>

<template>
    <header class="relative bg-gray-900">
        <div class="pointer-events-none absolute inset-0 z-30 shadow" aria-hidden="true"></div>

        <div class="relative z-20">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
                <div>
                    <NuxtLink to="/" class="flex">
                        <span class="sr-only">Nexa Exchange</span>
                        <img class="h-12 w-auto sm:h-14" src="~/assets/logo.png" alt="Nexa Exchange Logo" />
                    </NuxtLink>
                </div>

                <NuxtLink to="/markets" class="lg:hidden">
                    <h2 class="flex flex-row items-center text-yellow-700 hover:text-yellow-600 font-medium group">
                        mNEXA/USD
                        <span class="ml-2 text-3xl text-yellow-500 group-hover:text-yellow-400">
                            {{displayQuote}}
                        </span>
                    </h2>

                    <div class="flex justify-end">
                        <span class="text-yellow-400 font-medium text-sm text-xl">
                            <span class="">
                                {{priceChg24h}}
                            </span>

                            <svg v-if="ticker?.quote.USD.pctChg24h > 0" class="inline w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>
                            <svg v-else class="inline w-6 h-6 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"></path>
                            </svg>

                            <span class="mx-1 text-yellow-700">
                                &bullet; &bullet;
                            </span>

                            <span class="">
                                {{vol24h}}
                            </span>
                        </span>
                    </div>
                </NuxtLink>

                <div class="-my-2 md:hidden">
                    <a href="https://app.nexa.exchange" target="_blank"
                        class="inline-flex items-center justify-center rounded-md bg-sky-100 p-2 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Open menu</span>
                        <svg class="w-8 h-auto text-sky-700 font-extrabold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"></path>
                        </svg>
                    </a>
                </div>

                <div class="hidden md:flex md:flex-1 md:items-center md:justify-between">
                    <nav class="flex space-x-10">

                        <a href="https://docs.nexa.exchange" target="_blank" class="py-1 text-base font-medium text-gray-100 hover:text-yellow-300">
                            Read The Docs
                        </a>

                    </nav>

                    <div class="flex items-center md:ml-12">
                        <NuxtLink to="/markets">
                            <h2 class="flex flex-row items-center text-yellow-700 hover:text-yellow-600 font-medium group">
                               mNEXA/USD
                               <span class="ml-2 text-3xl text-yellow-500 group-hover:text-yellow-400">
                                {{displayQuote}}
                            </span>
                            </h2>

                            <div class="flex justify-end">
                                <!-- <span class="text-yellow-400 font-medium text-xs">
                                    <span class="">+1.28%</span>
                                    <svg class="inline w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                    <span class="mx-1 text-yellow-700">&bullet; &bullet;</span>
                                    <span class="">2.31M</span>
                                </span> -->
                                <span class="text-yellow-400 font-medium text-sm sm:text-xl">
                                    <span class="">
                                        {{priceChg24h}}
                                    </span>

                                    <svg v-if="ticker?.quote.USD.pctChg24h > 0" class="inline w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                    </svg>
                                    <svg v-else class="inline w-6 h-6 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"></path>
                                    </svg>

                                    <span class="mx-1 text-yellow-700">
                                        &bullet; &bullet;
                                    </span>

                                    <span class="">
                                        {{vol24h}}
                                    </span>
                                </span>
                            </div>
                        </NuxtLink>

                        <a href="https://app.nexa.exchange" target="_blank" class="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Launch App
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-200 ease-out"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
        <div v-if="showMobileMenu" class="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden">
            <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div class="px-5 pt-5 pb-6 sm:pb-8">
                    <div class="flex items-center justify-between">
                        <div>
                            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                        </div>

                        <div class="-mr-2">
                            <button
                                type="button"
                                class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <span class="sr-only">Close menu</span>
                                <!-- Heroicon name: outline/x-mark -->
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="mt-6 sm:mt-8">
                        <nav>
                            <div class="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                                <a href="javascript://" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-200">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                        <!-- Heroicon name: outline/chart-bar -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-4 text-base font-medium text-gray-900">Analytics</div>
                                </a>

                                <a href="javascript://" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-200">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                        <!-- Heroicon name: outline/cursor-arrow-rays -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-4 text-base font-medium text-gray-900">Engagement</div>
                                </a>

                                <a href="javascript://" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-200">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                        <!-- Heroicon name: outline/shield-check -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-4 text-base font-medium text-gray-900">Security</div>
                                </a>

                                <a href="javascript://" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-200">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                        <!-- Heroicon name: outline/squares-2x2 -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-4 text-base font-medium text-gray-900">Integrations</div>
                                </a>
                            </div>

                            <div class="mt-8 text-base">
                                <a href="javascript://" class="font-medium text-indigo-600 hover:text-indigo-500">
                                    View all products
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>

                <div class="py-6 px-5">
                    <div class="grid grid-cols-2 gap-4">
                        <a href="javascript://" class="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                            Pricing
                        </a>

                        <NuxtLink to="/bootstrap" class="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                            Alpha - Bootstrap
                        </NuxtLink>

                        <a href="javascript://" class="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                            Company
                        </a>

                        <a href="https://docs.nexa.exchange" target="_blank" class="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                            Docs
                        </a>

                        <a href="https://blog.nexa.exchange" target="_blank" class="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                            Blog
                        </a>

                        <a href="javascript://" class="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                            Contact Sales
                        </a>
                    </div>

                    <div class="mt-6">
                        <a href="javascript://" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            {{displayQuote}}
                        </a>

                        <p class="mt-6 text-center text-base font-medium text-gray-500">
                            <a href="https://app.nexa.exchange" target="_blank" class="text-indigo-600 hover:text-indigo-500">
                                Launch App
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
