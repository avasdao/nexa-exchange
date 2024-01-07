<script setup lang="ts">
import JSConfetti from 'js-confetti'
import numeral from 'numeral'

import {
    encodeAddress,
    listUnspent,
} from '@nexajs/address'
import { hexToBin } from '@nexajs/utils'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

/* Initialize stores. */
import { useAmmStore } from '@/stores/amm'
import { useWalletStore } from '@/stores/wallet'
const Amm = useAmmStore()
const Wallet = useWalletStore()

/* Set constants. */
const STUDIO_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'

// TEMP USE FOR DEV PURPOSES ONLY
// ALWAYS DECODE FROM CONTRACT ADDRESS
const DEV_SCRIPT_PUBKEY = hexToBin('0014b3b45264dad11b2ff9fe5879863457e3737832ce0014b2912c4cc61f1b8cbe5c77ebd5eeea2641645f100200011445f5b9d41dd723141f721c727715c690fedbbbd6020001000000')

const activeInput = ref(null)
const activePool = ref(null)
const baseAssetName = ref(null)
const baseAssetId = ref(null)
const baseIcon = ref(null)
const baseQuantity = ref(null)
const error = ref(null)
const quoteAssetId = ref(null)
const quoteAssetName = ref(null)
const quoteIcon = ref(null)
const quoteQuantity = ref(null)
const txidem = ref(null)

const isShowingSettings = ref(false)

/* Initialize globals. */
let action

/* Initialize confetti. */
const jsConfetti = new JSConfetti()

watch(baseQuantity, (_newBase, _oldBase) => {
    console.log('BASE CHANGED', typeof _newBase, _newBase, _oldBase)
    // console.log('CONSTANT PRODUCT', cProduct.value)

    /* Validate user input. */
    if (activeInput.value === 'QUOTE') {
        return
    }

    /* Initialize locals. */
    let baseUnits
    let balanceRequired

    /* Reset tx idem. */
    txidem.value = null

    if (baseAssetId.value === '0') {
        /* Calculate base quantity. */
        // NOTE: Measured in satoshis.
        baseUnits = Math.ceil(_newBase * 100)
        console.log('BASE UNITS', baseUnits)

        /* Calculate remaining balance requirement. */
        balanceRequired = (cProduct.value / (BigInt(baseUnits) + activePool.value.satoshis))
        console.log('QUOTE UNITS REQUIRED', typeof balanceRequired, balanceRequired)
        console.log('POOL COIN BALANCE', typeof activePool.value.satoshis, activePool.value.satoshis)
        console.log('POOL TOKEN BALANCE', typeof activePool.value.tokens, activePool.value.tokens)

        // FIXME We need to account for decimals.

        quoteQuantity.value = Number(activePool.value.tokens - balanceRequired)
        console.log('TRADE QUOTE', typeof quoteQuantity.value, quoteQuantity.value)
    } else {
        baseUnits = Math.ceil(_newBase)
        console.log('BASE UNITS', baseUnits)

        /* Calculate remaining balance requirement. */
        balanceRequired = (cProduct.value / (BigInt(baseUnits) + activePool.value.tokens))
        console.log('QUOTE UNITS REQUIRED', typeof balanceRequired, balanceRequired)
        console.log('POOL COIN BALANCE', typeof activePool.value.satoshis, activePool.value.satoshis)
        console.log('POOL TOKEN BALANCE', typeof activePool.value.tokens, activePool.value.tokens)

        // FIXME We need to account for decimals.

        quoteQuantity.value = Number(activePool.value.satoshis - balanceRequired) / 100.0
        console.log('TRADE QUOTE', typeof quoteQuantity.value, quoteQuantity.value)
    }
})

watch(quoteQuantity, (_newQuote, _oldQuote) => {
    console.log('QUOTE CHANGED', typeof _newQuote, _newQuote, _oldQuote)
    // console.log('CONSTANT PRODUCT', cProduct.value)

    /* Validate user input. */
    if (activeInput.value === 'BASE') {
        return
    }

    /* Initialize locals. */
    let quoteUnits
    let balanceRequired

    /* Reset tx idem. */
    txidem.value = null

    if (baseAssetId.value === '0') {
        /* Calculate base quantity. */
        // NOTE: Measured in satoshis.
        quoteUnits = Math.ceil(_newQuote)
        console.log('QUOTE UNITS', quoteUnits)

        /* Calculate remaining balance requirement. */
        balanceRequired = (cProduct.value / (BigInt(quoteUnits) + activePool.value.tokens))
        console.log('BASE UNITS REQUIRED', typeof balanceRequired, balanceRequired)
        console.log('POOL COIN BALANCE', typeof activePool.value.satoshis, activePool.value.satoshis)
        console.log('POOL TOKEN BALANCE', typeof activePool.value.tokens, activePool.value.tokens)

        // FIXME We need to account for decimals.

        baseQuantity.value = Number(activePool.value.satoshis - balanceRequired) / 100.0
        console.log('TRADE BASE', typeof baseQuantity.value, baseQuantity.value)
    } else {
        /* Calculate base quantity. */
        // NOTE: Measured in satoshis.
        quoteUnits = Math.ceil(_newQuote * 100)
        console.log('QUOTE UNITS', quoteUnits)

        /* Calculate remaining balance requirement. */
        balanceRequired = (cProduct.value / (BigInt(quoteUnits) + activePool.value.satoshis))
        console.log('BASE UNITS REQUIRED', typeof balanceRequired, balanceRequired)
        console.log('POOL COIN BALANCE', typeof activePool.value.satoshis, activePool.value.satoshis)
        console.log('POOL TOKEN BALANCE', typeof activePool.value.tokens, activePool.value.tokens)

        // FIXME We need to account for decimals.

        baseQuantity.value = Number(activePool.value.tokens - balanceRequired)
        console.log('TRADE BASE', typeof baseQuantity.value, baseQuantity.value)
    }
})

const cProduct = computed(() => {
    /* Validate active pool. */
    if (!activePool.value) {
        return BigInt(0)
    }

    /* Initialize locals. */
    let satoshis
    let cProduct
    let tokens

    /* Set satoshis. */
    satoshis = activePool.value.satoshis

    /* Set tokens. */
    tokens = activePool.value.tokens

    /* Calculate constant product. */
    cProduct = (satoshis * tokens)

    /* Return constant product. */
    return cProduct
})

const closeSettings = () => {
    isShowingSettings.value = false
}

const reverseAssetPair = () => {
    /* Reset all. */
    activeInput.value = null
    txidem.value = null
    baseQuantity.value = null
    quoteQuantity.value = null

    /* Initialize locals. */
    let tempHolder

    /* Flip asset id values. */
    tempHolder = baseAssetId.value
    baseAssetId.value = quoteAssetId.value
    quoteAssetId.value = tempHolder

    /* Flip asset name values. */
    tempHolder = baseAssetName.value
    baseAssetName.value = quoteAssetName.value
    quoteAssetName.value = tempHolder

    /* Flip asset pair values. */
    tempHolder = baseIcon.value
    baseIcon.value = quoteIcon.value
    quoteIcon.value = tempHolder
}

const swap = async () => {
    /* Initialize locals. */
    let displayAction
    let response
    let txResult

    if (action === 'BUY') {
        displayAction = 'SELL'
    } else {
        displayAction = 'BUY'
    }

    /* Validate swap values. */
    if (!quoteQuantity.value || quoteQuantity.value === null) {
        return alert(`Oops! You MUST enter a swap amount to continue.`)
    }

    /* Confirm on UI. */
    if (confirm(`WiserSwap is currently in BETA! Slippage is very HIGH due to the currently very low liquidity. Are you sure you want to ${displayAction} ${numeral(quoteQuantity.value).format('0,0.00[00]')} ${quoteAssetName.value} for ${numeral(baseQuantity.value).format('0,0.00[00]')} ${baseAssetName.value}?`)) {
        response = await Amm
            .swap(baseAssetId.value, quoteAssetId.value, quoteQuantity.value)
            .catch(err => console.error(err))
        console.log('SWAP RESPONSE', response)

        if (!response) {
            return
        }

        try {
            txResult = JSON.parse(response)
            console.log('TX RESULT', txResult)

            if (txResult.error?.message) {
                // alert(txResult.error.message)
                error.value = txResult.error.message
            } else {
                // alert(txResult.result)
                txidem.value = txResult.result

                /* Reset all. */
                activeInput.value = null
                baseQuantity.value = null
                quoteQuantity.value = null

                // BURST CONFETTI
                jsConfetti.addConfetti({
                    // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                    // confettiColors: [
                    //     '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
                    // ],
                    // confettiRadius: 6,
                    confettiNumber: 300,
                })
            }
        } catch (err) {
            console.error(err)

            error.value = response
        }

    }
}

const init = async () => {
    /* Initialize locals. */
    let contractAddress
    let contractUnspent

    /* Set base asset. */
    baseAssetId.value = '0' // $NEXA is the (default) base asset

    /* Set trade asset name. */
    baseAssetName.value = 'Nexa'

    /* Set base icon. */
    baseIcon.value = 'https://bafkreigyp7nduweqhoszakklsmw6tbafrnti2yr447i6ary5mrwjel7cju.nexa.garden' // nex.svg

    /* Set quote asset. */
    quoteAssetId.value = STUDIO_ID_HEX // FOR DEVELOPMENT PURPOSES ONLY

    /* Set trade asset name. */
    quoteAssetName.value = 'Studio Time'

    /* Set quote icon. */
    quoteIcon.value = 'https://nexa.studio/icon.svg'

    /* Set action. */
    action = 'SELL'

    /* Set active input. */
    activeInput.value = 'BASE'

    /* Encode the public key hash into a P2PKH nexa address. */
    contractAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        DEV_SCRIPT_PUBKEY,
    )
    console.info('\nCONTRACT ADDRESS', contractAddress)

    contractUnspent = await listUnspent(contractAddress)
        .catch(err => console.error(err))
    // FOR DEV PURPOSES ONLY -- take the LARGEST input
    contractUnspent = [contractUnspent.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]
    // FOR DEV PURPOSES ONLY -- add scripts
    console.log('\nCONTRACT UNSPENT', contractUnspent)

    activePool.value = contractUnspent[0]
    console.log('ACTIVE POOL', activePool.value)
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
    <main class="">
        <header class="w-full px-3 flex justify-between">
            <section class="flex flex-col gap-1">
                <h1 class="text-2xl text-amber-800 font-light tracking-widest">
                    <span class="font-bold text-amber-700">Swap</span> |
                    Limit |
                    Bridge
                </h1>

                <h3 class="text-sm text-amber-700 font-light tracking-wide">
                    Instantly buy or sell tokens at superior prices
                </h3>
            </section>

            <svg @click="isShowingSettings = true" class="w-7 h-auto text-rose-600 cursor-pointer hover:text-rose-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
        </header>

        <section class="w-full mt-2 mb-5 flex flex-col gap-5 px-5 py-0 bg-gray-700 border border-yellow-500 rounded-2xl shadow-md">
            <div class="col-span-2 py-2">
                <h3 class="text-indigo-300 font-medium uppercase">
                    From
                </h3>

                <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="pl-20 pr-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-6xl text-indigo-300 focus:outline-none"
                    v-model="baseQuantity"
                    @focus="activeInput = 'BASE'"
                />

                <div class="h-16">
                    <img :src="baseIcon" class="relative -mt-20 w-16 h-auto p-2" />
                </div>
            </div>

            <div class="-mb-12 z-20 col-span-2 flex flex-row justify-center">
                <div @click="reverseAssetPair" class="group p-2 bg-amber-100 hover:bg-amber-500 rounded-full cursor-pointer">
                    <svg class="w-6 h-auto text-amber-500 group-hover:text-amber-100" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
                    </svg>
                </div>
            </div>

            <div class="col-span-2 py-2 flex flex-col justify-between">
                <section>
                    <h3 class="text-indigo-300 font-medium uppercase">
                        To
                    </h3>

                    <input
                        type="number"
                        step="1"
                        placeholder="0"
                        class="pl-20 pr-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-6xl text-indigo-300 focus:outline-none"
                        v-model="quoteQuantity"
                        @focus="activeInput = 'QUOTE'"
                    />

                    <div class="h-16">
                        <img :src="quoteIcon" class="relative -mt-20 w-16 h-auto p-2" />
                    </div>
                </section>

                <section>
                    <h3 class="mt-8 text-gray-300 text-lg">
                        Recipient <span class="text-gray-400 text-base italic">(optional)</span>
                    </h3>

                    <h4 class="text-red-300 text-xs sm:text-sm">
                        Please DO NOT use this service to transfer your tokens to an address of a centralized exchange (mexc, coinex...).
                    </h4>

                    <input
                        type="text"
                        placeholder="Wallet Address"
                        class="px-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-2xl text-indigo-300 focus:outline-none"
                        disabled
                    />
                </section>

                <p class="py-3 text-gray-300 text-xs sm:text-sm">
                    When available, liquidity is automagically aggregated to offer you the best prices with your preferred rewards.
                </p>

                <button @click="swap" class="mb-3 px-5 py-3 w-full text-sky-100 font-medium text-3xl bg-sky-500 rounded-lg shadow hover:bg-sky-400">
                    Begin Swap
                </button>
            </div>

            <div v-if="txidem" class="col-span-2 mb-3 px-3 py-2 flex flex-col gap-3 border-t-2 border-amber-300">
                <h3 class="text-gray-100 text-base font-medium text-center">
                    Congratulations!
                    Your swap was completed successfully!
                </h3>

                <div class="w-full truncate">
                    <h4 class="text-xs uppercase text-amber-200 font-medium tracking-wider">
                        Transaction Idem
                    </h4>

                    <div class="flex flex-row gap-1 items-center">
                        <NuxtLink :to="'https://explorer.nexa.org/tx/' + txidem" target="_blank" class="text-lg text-blue-200 font-medium truncate">
                            {{txidem}}
                        </NuxtLink>

                        <svg class="w-10 h-auto text-blue-200" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <SwapSettings
        v-if="isShowingSettings"
        @close="closeSettings"
    />
</template>
