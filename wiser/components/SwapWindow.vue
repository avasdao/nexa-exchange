<script setup lang="ts">
import {
    encodeAddress,
    listUnspent,
} from '@nexajs/address'

import { getTokens } from '@nexajs/token'
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

const activePool = ref(null)
const amount = ref(null)
const quote = ref(null)
const error = ref(null)
const txidem = ref(null)

const isShowingSettings = ref(false)

const baseIcon = ref(null)
const quoteIcon = ref(null)

watch(quote, (_newQuote, _oldQuote) => {
    // console.log('QUOTE CHANGED', _newQuote, _oldQuote)
    console.log('CONSTANT PRODUCT', cProduct.value)

    let baseQuantity
    let balanceRequired
    let tradeQuantity

    /* Calculate base quantity. */
    // NOTE: Measured in satoshis.
    baseQuantity = BigInt(_newQuote * 100)
    console.log('BASE QUANTITY', baseQuantity)

    /* Calculate remaining balance requirement. */
    balanceRequired = cProduct.value / (baseQuantity + BigInt(activePool.value.satoshis))
    console.log('BALANCE REQUIRED', balanceRequired)
    console.log('POOL BALANCE', BigInt(activePool.value.tokens))

    amount.value = BigInt(activePool.value.tokens) - balanceRequired
    console.log('TRADE AMOUNT', amount.value)
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
    satoshis = BigInt(activePool.value.satoshis)

    /* Set tokens. */
    tokens = BigInt(activePool.value.tokens)

    /* Calculate constant product. */
    cProduct = satoshis * tokens

    /* Return constant product. */
    return cProduct
})

const closeSettings = () => {
    isShowingSettings.value = false
}

const reverseAssetPair = () => {
    let tempHolder

    tempHolder = baseIcon.value

    baseIcon.value = quoteIcon.value

    quoteIcon.value = tempHolder
}

const swap = async () => {
    /* Initialize locals. */
    let action
    let baseAsset
    let quoteAsset
    let response
    let scriptArgs
    let txResult

    /* Set action. */
    action = 'BUY'

    /* Set base asset. */
    baseAsset = STUDIO_ID_HEX

    /* Set quote asset. */
    quoteAsset = '0' // $NEXA is the (default) quote asset

    /* Validate swap amount. */
    if (!amount.value || amount.value === null) {
        return alert(`Oops! You MUST enter an amount to continue.`)
    }

    /* Confirm on UI. */
    if (confirm(`Are you sure you want to make this swap?`)) {
        response = await Amm
            .swap(baseAsset, quoteAsset, action, amount.value)
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

    /* Set base icon. */
    baseIcon.value = 'https://bafkreigyp7nduweqhoszakklsmw6tbafrnti2yr447i6ary5mrwjel7cju.nexa.garden' // nex.svg

    /* Set quote icon. */
    quoteIcon.value = 'https://nexa.studio/icon.svg'

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
                    v-model="quote"
                />

                <div class="h-16">
                    <img :src="baseIcon" class="relative -mt-20 w-16 h-auto p-2" />
                </div>
            </div>

            <div class="-mb-12 z-20 col-span-2 flex flex-row justify-center">
                <div @click="reverseAssetPair" class="group p-2 bg-amber-100 hover:bg-amber-500 rounded-full cursor-pointer">
                    <svg class="w-6 h-auto text-amber-500 group-hover:text-amber-100" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"></path>
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
                        step="0.01"
                        placeholder="0.00"
                        class="pl-20 pr-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-6xl text-indigo-300 focus:outline-none"
                        v-model="amount"
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
                    />
                </section>

                <p class="py-3 text-gray-300 text-xs sm:text-sm">
                    When available, liquidity is automagically aggregated to offer you the best prices with your preferred rewards.
                </p>

                <button @click="swap" class="mb-3 px-5 py-3 w-full text-sky-100 font-medium text-3xl bg-sky-500 rounded-lg shadow hover:bg-sky-400">
                    Make Swap
                </button>
            </div>
        </section>
    </main>

    <SwapSettings
        v-if="isShowingSettings"
        @close="closeSettings"
    />
</template>
