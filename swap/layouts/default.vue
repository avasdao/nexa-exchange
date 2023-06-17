<script setup>
/* Import modules. */
import numeral from 'numeral'


/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

onBeforeMount(() => {
    System.$state = JSON.parse(localStorage.getItem('system'))
    // add additional states here...
})

watch(System.$state, (_state) => {
    localStorage.setItem('system', JSON.stringify(_state))
})



/* Set API endpoint. */
const API_ENDPOINT = 'https://nexa.exchange/ticker'

// let quote = ref(0)
let displayQuote = ref(null)
let priceChg24h = ref(null)
let vol24h = ref(null)

/**
 * Update Quote
 */
const updateQuote = async () => {
    const response = await fetch(API_ENDPOINT)
    const ticker = await response.json()
    // console.log('TICKER', ticker)

    const price = (ticker?.quote.USD.price * 1000000) || 'n/a'
    // console.log('PRICE', price)

    const pctChg24h = numeral(ticker?.quote.USD.pctChg24h / 100.0).format('0.0%') || 'n/a'
    // console.log('PCT CHANGE 24H', pctChg24h)

    const vol24 = numeral(ticker?.quote.USD.vol24).format('0,0.0a') || 'n/a'
    // console.log('VOLUME 24H', vol24)

    displayQuote.value = numeral(price).format('$0,0.00')

    priceChg24h.value = pctChg24h

    vol24h.value = vol24
}

/* Start 30-second interval. */
setInterval(updateQuote, 30000)
updateQuote()

onMounted(() => {
    console.log('Mounted!', System.ONE_MEX)

})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="w-screen h-screen grid lg:grid-cols-2 lg:divide-x-4 divide-amber-300">

        <div class="lg:hidden px-3 py-2">
            <h3 class="text-sm text-gray-500 font-medium uppercase">
                Swap Navigation
            </h3>

            <nav class="w-full my-2 grid grid-cols-3 gap-3">
                <NuxtLink to="/" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                    Home
                </NuxtLink>

                <NuxtLink to="/guide" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                    Guide
                </NuxtLink>

                <NuxtLink to="/help" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                    Help
                </NuxtLink>
            </nav>
        </div>

        <div class="hidden lg:block flex flex-col justify-between items-center bg-gradient-to-b from-amber-200 to-white">
            <img
                alt="Nexa Swap Logo"
                class="logo mt-12 w-32 h-32"
                src="@/assets/logo.png"
            />

            <div class="w-3/4">
                <h1 class="text-6xl font-bold uppercase bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                    Nexa
                </h1>

                <h1 class="text-9xl font-bold bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent">
                    Swap
                </h1>

                <nav class="w-full my-5 grid grid-cols-3 gap-3">
                    <NuxtLink to="/" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                        Home
                    </NuxtLink>

                    <NuxtLink to="/guide" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                        Guide
                    </NuxtLink>

                    <NuxtLink to="/help" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                        Help
                    </NuxtLink>
                </nav>

                <section class="w-full mt-3 px-5 py-2 bg-gray-800 rounded-md">
                    <h2 class="flex flex-row items-center text-yellow-700 hover:text-yellow-600 font-medium cursor-default group">
                        mNEXA/USD
                        <span class="ml-2 text-4xl text-yellow-500 group-hover:text-yellow-400">
                            {{displayQuote}}
                        </span>
                    </h2>

                    <div class="flex justify-end">
                        <span class="text-yellow-400 font-medium text-2xl">
                            <span class="">
                                {{priceChg24h}}
                            </span>

                            <svg class="inline w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>

                            <span class="mx-1 text-yellow-700">
                                &bullet; &bullet;
                            </span>

                            <span class="">
                                {{vol24h}}
                            </span>
                        </span>
                    </div>
                </section>

                <!-- <h3 class="my-3 italic text-red-400 text-center">
                    ☠️ This project is in alpha. Use at your own risk.
                </h3> -->

            </div>

            <Footer class="px-5" />
        </div>

        <slot />
    </main>
</template>
