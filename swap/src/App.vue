<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import numeral from 'numeral'

/* Verify the URL (location), for security reasons. */
const myLocation = document.location
// console.log('MY LOCATION', myLocation)
const hash = myLocation.hash // #/3f080076-d30b-4d32-b51a-120ae63f6905
const hostname = myLocation.hostname // localhost

/* Validate all mirrors. */
if (hostname === 'nexaswap.com') {
    window.location.replace('https://swap.nexa.exchange') // NOTE: We have no history added here.
    // FIXME: Be sure to attach the "original" path or hash!!
}

/* Set API endpoint. */
const API_ENDPOINT = 'https://api.nexa.exchange/v1/ticker/quote/NEX'

// let quote = ref(0)
let displayQuote = ref(null)

const updateQuote = async () => {
    const response = await fetch(API_ENDPOINT)
    const quote = await response.json()
    // console.log('QUOTE', quote)

    displayQuote.value = numeral(quote.price).format('$0,0.00[00]')
}

updateQuote()

</script>

<template>
    <header>
        <img
            alt="Nexa Swap Logo"
            class="logo w-40 h-40"
            src="@/assets/logo.png"
        />

        <div class="">
            <h1 class="text-6xl font-bold uppercase bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                Nexa
            </h1>
            <h1 class="text-9xl font-bold bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent">
                Swap
            </h1>

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/help">Help</RouterLink>
            </nav>

            <h3 class="italic text-red-400">
                ☠️ This project is in alpha. Use at your own risk.
            </h3>

            <section class="mt-3 px-5 py-2 bg-gray-800 rounded-md">
                <h2 class="flex flex-row items-center text-yellow-700 hover:text-yellow-600 font-medium cursor-default group">
                    NEX/USD <span class="ml-2 text-3xl text-yellow-500 group-hover:text-yellow-400">{{displayQuote}}</span>
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

        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
