<script setup>
/* Import modules. */
import { ref } from 'vue'
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

const displayTicker = computed(() => {
    if (!ticker.value) {
        return 'n/a'
    }

    /* Set quote. */
    const quote = ticker.value.quote

    /* Validate quote. */
    if (!quote) {
        return 'n/a'
    }

    /* Set price. */
    const price = quote?.USD?.price

    /* Validate price. */
    if (!price) {
        return 'n/a'
    }

    /* Return formatted price. */
    return numeral(price * 1000000).format('$0,0.00')
})


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

                <section class="sm:hidden">
                    <h2 class="flex flex-row items-center text-yellow-700 hover:text-yellow-600 font-medium cursor-default group">
                        mNEXA/USD <span class="ml-2 text-3xl text-yellow-500 group-hover:text-yellow-400">{{displayTicker}}</span>
                    </h2>

                    <div class="flex justify-end">
                        <span class="text-yellow-400 font-medium text-xs">
                            <span class="">+1.28%</span>
                            <svg class="inline w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                            <span class="mx-1 text-yellow-700">&bullet; &bullet;</span>
                            <span class="">2.31M</span>
                        </span>
                    </div>
                </section>

                <div class="-my-2 -mr-2 md:hidden">
                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        aria-expanded="false"
                        @click="showMobileMenu = !showMobileMenu"
                    >
                        <span class="sr-only">Open menu</span>
                        <!-- Heroicon name: outline/bars-3 -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                <div class="hidden md:flex md:flex-1 md:items-center md:justify-between">
                    <nav class="flex space-x-10">
                        <div>
                            <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
                            <button
                                type="button"
                                class="px-2 py-1 text-gray-100 group inline-flex items-center rounded-md bg-gray-900 text-base font-medium hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                aria-expanded="false"
                                @click="toggleSolutions"
                            >
                                <span>Solutions</span>
                                <!--
                    Heroicon name: mini/chevron-down

                    Item active: "text-gray-600", Item inactive: "text-gray-400"
                -->
                                <svg class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>

                            <!--
                'Solutions' flyout menu, show/hide based on flyout menu state.

                Entering: "transition ease-out duration-200"
                    From: "opacity-0 -translate-y-1"
                    To: "opacity-100 translate-y-0"
                Leaving: "transition ease-in duration-150"
                    From: "opacity-100 translate-y-0"
                    To: "opacity-0 -translate-y-1"
                -->
                            <div v-if="showSolutionsMenu" class="absolute inset-x-0 top-full z-10 hidden transform bg-white shadow-lg md:block">
                                <div class="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">

                                    <a href="javascript://" class="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-gray-200" @click="launchApp">
                                        <div class="flex md:h-full lg:flex-col">
                                            <div class="flex-shrink-0">
                                                <span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                                    <!-- Heroicon name: outline/chart-bar -->
                                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>

                                            <div class="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                                <div>
                                                    <p class="text-lg font-medium text-gray-900">
                                                        Asset Swap
                                                    </p>

                                                    <p class="mt-1 text-sm text-gray-500">
                                                        Instantly swap your Nexa assets on a decentralized order book.
                                                    </p>
                                                </div>

                                                <p class="mt-2 text-lg font-medium text-indigo-600 lg:mt-4">
                                                    Launch app
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="javascript://" class="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-gray-200" @click="launchApp">
                                        <div class="flex md:h-full lg:flex-col">
                                            <div class="flex-shrink-0">
                                                <span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                                    <!-- Heroicon name: outline/cursor-arrow-rays -->
                                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>

                                            <div class="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                                <div>
                                                    <p class="text-lg font-medium text-gray-900">
                                                        Pro Exchange
                                                    </p>

                                                    <p class="mt-1 text-sm text-gray-500">
                                                        Professional Market Makers trade a decentralized order book of Nexa assets.
                                                    </p>
                                                </div>

                                                <p class="mt-2 text-lg font-medium text-indigo-600 lg:mt-4">
                                                    Open Exchange
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="javascript://" class="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-gray-200">
                                        <div class="flex md:h-full lg:flex-col">
                                            <div class="flex-shrink-0">
                                                <span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                                    <!-- Heroicon name: outline/shield-check -->
                                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>

                                            <div class="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                                <div>
                                                    <p class="text-lg font-medium text-gray-900">
                                                        Cross-chain Bridge
                                                    </p>

                                                    <p class="mt-1 text-sm text-gray-500">
                                                        Bridge your Nexa assets across blockchains.
                                                    </p>
                                                </div>

                                                <p class="mt-2 text-lg font-medium text-indigo-600 lg:mt-4">
                                                    Open Bridge
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="javascript://" class="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-gray-200">
                                        <div class="flex md:h-full lg:flex-col">
                                            <div class="flex-shrink-0">
                                                <span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                                    <!-- Heroicon name: outline/squares-2x2 -->
                                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>

                                            <div class="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                                <div>
                                                    <p class="text-lg font-medium text-gray-900">
                                                        Asset Wallet
                                                    </p>

                                                    <p class="mt-1 text-sm text-gray-500">
                                                        Safely manage your Nexa assets <em>(incl. coins + tokens)</em> with this user-friendly wallet.
                                                    </p>
                                                </div>

                                                <p class="mt-2 text-lg font-medium text-indigo-600 lg:mt-4">
                                                    Open Wallet
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div class="bg-gray-50">
                                    <div class="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                                        <div class="flow-root">
                                            <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100">
                                                <!-- Heroicon name: outline/play -->
                                                <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                                </svg>
                                                <span class="ml-3">Watch Trading Demo</span>
                                            </a>
                                        </div>

                                        <div class="flow-root">
                                            <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100">
                                                <!-- Heroicon name: outline/check-circle -->
                                                <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span class="ml-3">View All Solutions</span>
                                            </a>
                                        </div>

                                        <div class="flow-root">
                                            <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100">
                                                <!-- Heroicon name: outline/phone -->
                                                <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                                    />
                                                </svg>
                                                <span class="ml-3">Contact Our Team</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NuxtLink to="/bootstrap" class="py-1 text-base font-medium text-gray-100 hover:text-yellow-300">
                            Bootstrap Phase
                        </NuxtLink>

                        <a href="https://docs.nexa.exchange" target="_blank" class="py-1 text-base font-medium text-gray-100 hover:text-yellow-300">
                            Read The Docs
                        </a>

                        <div>
                            <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
                            <button
                                type="button"
                                class="px-2 py-1 text-gray-100 group inline-flex items-center rounded-md bg-gray-900 text-base font-medium hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                aria-expanded="false"
                                @click="toggleExtras"
                            >
                                <span>Extras</span>
                                <!--
                    Heroicon name: mini/chevron-down

                    Item active: "text-gray-600", Item inactive: "text-gray-400"
                -->
                                <svg class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>

                            <!--
                'More' flyout menu, show/hide based on flyout menu state.

                Entering: "transition ease-out duration-200"
                    From: "opacity-0 -translate-y-1"
                    To: "opacity-100 translate-y-0"
                Leaving: "transition ease-in duration-150"
                    From: "opacity-100 translate-y-0"
                    To: "opacity-0 -translate-y-1"
                -->
                            <div v-if="showExtrasMenu" class="absolute inset-x-0 top-full z-10 hidden transform shadow-lg md:block">
                                <div class="absolute inset-0 flex">
                                    <div class="w-1/2 bg-white"></div>
                                    <div class="w-1/2 bg-gray-50"></div>
                                </div>

                                <div class="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                                    <nav class="grid gap-y-10 bg-white px-4 py-8 sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                                        <div>
                                            <h3 class="text-base font-medium text-gray-500">
                                                Company
                                            </h3>

                                            <ul role="list" class="mt-5 space-y-6">
                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/information-circle -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">About</span>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/building-office -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Customers</span>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/newspaper -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Press</span>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/briefcase -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Careers</span>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/shield-check -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Privacy</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 class="text-base font-medium text-gray-500">
                                                Resources
                                            </h3>

                                            <ul role="list" class="mt-5 space-y-6">
                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/user-group -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Community</span>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/globe-alt -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Partners</span>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/bookmark-square -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Guides</span>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-200">
                                                        <!-- Heroicon name: outline/computer-desktop -->
                                                        <svg class="h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                                                            />
                                                        </svg>
                                                        <span class="ml-4">Webinars</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>

                                    <div class="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                                        <div>
                                            <h3 class="text-base font-medium text-gray-500">
                                                From Our Blog
                                            </h3>

                                            <ul role="list" class="mt-6 space-y-6">
                                                <li class="flow-root">
                                                    <a href="javascript://" class="-m-3 flex rounded-lg p-3 hover:bg-gray-100">
                                                        <div class="hidden flex-shrink-0 sm:block">
                                                            <img
                                                                class="h-20 w-32 rounded-md object-cover"
                                                                src="https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80"
                                                                alt=""
                                                            />
                                                        </div>

                                                        <div class="w-0 flex-1 sm:ml-8">
                                                            <h4 class="truncate text-base font-medium text-gray-900">Boost your conversion rate</h4>
                                                            <p class="mt-1 text-sm text-gray-500">Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.</p>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="flow-root">
                                                    <a href="https://news.bitcoin.com/bitcoin%E2%80%A4com-announces-cex-education-program-to-reward-victims-of-centralized-crypto-failures-and-bolster-defi/" target="_blank" class="-m-3 flex rounded-lg p-3 hover:bg-gray-100">
                                                        <div class="hidden flex-shrink-0 sm:block">
                                                            <img
                                                                class="h-20 w-32 rounded-md object-cover"
                                                                src="https://i.ibb.co/GCtBt1d/image.png"
                                                                alt=""
                                                            />
                                                        </div>

                                                        <div class="w-0 flex-1 sm:ml-8">
                                                            <h4 class="truncate text-base font-medium text-gray-900">
                                                                CEX Education Program
                                                            </h4>

                                                            <p class="mt-1 text-sm text-gray-500">
                                                                Bitcoin.com announced the creation of a program that will reward people affected by centralized crypto company insolvencies while encouraging the adoption of decentralized finance and self-custody.
                                                            </p>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="mt-6 text-sm font-medium">
                                            <a href="javascript://" class="text-indigo-600 hover:text-indigo-500">
                                                View all posts
                                                <span aria-hidden="true"> &rarr;</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div class="flex items-center md:ml-12">
                        <section>
                            <h2 class="flex flex-row items-center text-yellow-700 hover:text-yellow-600 font-medium cursor-default group">
                               mNEXA/USD <span class="ml-2 text-3xl text-yellow-500 group-hover:text-yellow-400">{{displayTicker}}</span>
                            </h2>

                            <div class="flex justify-end">
                                <span class="text-yellow-400 font-medium text-xs">
                                    <span class="">+1.28%</span>
                                    <svg class="inline w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                    <span class="mx-1 text-yellow-700">&bullet; &bullet;</span>
                                    <span class="">2.31M</span>
                                </span>
                            </div>
                        </section>

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
                            {{displayTicker}}
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
