<script setup lang="ts">
/* Import modules. */
import { decodeAddress } from '@nexajs/address'
import numeral from 'numeral'

import { listUnspent } from '@nexajs/address'

import {
    getAddressBalance,
    getAddressTokenBalance,
    getGenesisInfo,
} from '@nexajs/rostrum'

useHead({
    title: 'Address — Nexa Exchange',
    meta: [
        { name: 'description', content: 'Nexa Exchange.' }
    ],
})

const Router = useRouter()

const address = ref(null)
const balance = ref(0)
const error = ref(null)
const tokens = ref(null)
const tokenBalances = ref(null)

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const balanceDisplay = computed(() => {
    if (!balance.value) {
        return '0.00'
    }

    return numeral(parseFloat(balance.value) / 100.0).format('0,0.00')
})

const tokenBalancesDisplay = computed(() => {
    if (!tokenBalances.value) {
        return null
    }

    const assets = []

    const tokenids = Object.keys(tokenBalances.value)

    // for (let i = 0; i < tokenids.length; i++) {
    //     /* Set token id. */
    //     const tokenid = tokenids[i]

    //     /* Request token info. */
    //     const info = await getGenesisInfo(tokenid)
    //     console.log('INFO', info)

    //     const decimals = 8

    //     assets.push({
    //         id: tokenid,
    //         tokens: tokenBalances.value[tokenid],
    //         tokensDisplay: 'hi',//parseFloat(token?.tokens / 10**decimals) + ' ' + token?.info?.ticker,
    //         info,
    //     })
    // }

    console.log('ASSETS', assets)
    return assets
})

const init = async () => {
    let confirmed
    // let coinBalance
    let info
    let tokenid
    let tokenids
    let tokenBalances
    let unconfirmed
    let unspent

    /* Initialize route. */
    const route = useRoute()
    // console.log('ROUTE', route)

    console.log('PARAMS', route?.params)
    /* Set (route) path. */
    address.value = route?.params.address
    console.log('ADDRESS', address.value)

    unspent = await listUnspent(address.value)
    console.log('UNSPENT', unspent)

    balance.value = unspent
        .filter(_u => _u.hasToken === false)
        .reduce(
            (_total, _unspent) => (_total + _unspent.satoshis), BigInt(0)
        )
    console.log('balance.value', balance.value)

    tokenBalances = await getAddressTokenBalance(address.value)
    console.log('TOKEN BALANCES', tokenBalances)

    confirmed = tokenBalances.confirmed
    console.log('CONFIRMED', confirmed)

    unconfirmed = tokenBalances.unconfirmed
    console.log('UNCONFIRMED', unconfirmed)

    tokenids = Object.keys(confirmed)
    console.log('TOKEN IDS (confirmed):', tokenids)

    /* Initialize tokens.*/
    tokens.value = []

    for (let i = 0; i < tokenids.length; i++) {
        /* Set token id. */
        tokenid = tokenids[i]

        /* Request token info. */
        info = await getGenesisInfo(tokenid)
        console.log('INFO', info)

        const decimals = info.decimal_places // FIXME FOR DEV PURPOSES ONLY

        const satoshis = confirmed[tokenid] || 0 + unconfirmed[confirmed] || 0
        const amount = satoshis / 10**decimals

        tokens.value.push({
            id: tokenid,
            ...info,
            unspent,
            satoshis,
            amount,
            decimals,
        })

        // assets.push({
        //     id: tokenid,
        //     tokens: tokenBalances.value[tokenid],
        //     tokensDisplay: 'hi',//parseFloat(token?.tokens / 10**decimals) + ' ' + token?.info?.ticker,
        //     info,
        // })
    }



    // tokenBalances.value = tokenBalance.confirmed// + tokenBalance.unconfirmed
    // console.log('tokenBalances.value', tokenBalances.value)
}

const loadAddress = () => {
    /* Re-initialize error. */
    error.value = null

    /* Validate address. */
    if (!address.value || address.value.trim() === '') {
        return
    }

    try {
        /* Decode address. */
        const decoded = decodeAddress(address.value.trim())

        /* Validate hash. */
        if (!decoded?.hash) {
            error.value = `Oops! The address you entered is invalid.`
            return
        }

        /* Go to address page. */
        Router.push('/address/' + address.value.trim())
    } catch (err) {
        console.error(err)
        error.value = err.message
    }
}

// const qtyDisplay = computed((_token) => {
//     return 'trying...'
// })

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="max-w-7xl mx-auto py-5">
        <!-- <div class="mx-3 my-0 sm:my-5">
            <h1 class="text-2xl sm:text-4xl font-medium truncate">
                {{address}}
            </h1>
        </div> -->

        <section class="my-3 px-3 flex flex-col sm:flex-row gap-3">
            <div class="min-w-0 flex-1">
                <label for="receiving-address" class="sr-only">Receiving address</label>

                <input
                    id="receiving-address"
                    type="text"
                    placeholder="Enter your wallet address"
                    v-model="address"
                    @keyup="loadAddress"
                    class="block w-full rounded-md border-2 border-amber-400 shadow px-4 py-3 text-2xl text-amber-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                />

                <p class="my-2 text-lg text-rose-300 font-medium">
                    {{error}}
                </p>
            </div>

            <div class="-mt-2 mb-3 sm:mt-0 sm:mb-0 sm:ml-3">
                <button
                    type="button"
                    class="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 font-medium text-white text-2xl shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    @click="loadAddress"
                >
                    Load Address
                </button>
            </div>
        </section>

        <div class="mt-3 sm:mt-0 px-3 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <section class="flex flex-col gap-3 p-3 bg-indigo-200 border-2 border-indigo-300 rounded-lg shadow">
                <h2 class="text-2xl text-indigo-700 font-medium">
                    Coin Assets
                </h2>

                <h3 class="text-2xl font-medium">
                    {{balanceDisplay}}
                    <span class="text-base text-gray-500">$NEXA</span>
                </h3>
            </section>

            <section class="flex flex-col gap-3 p-3 bg-amber-200 border-2 border-amber-300 rounded-lg shadow">
                <h2 class="text-2xl text-amber-700 font-medium">
                    Token Assets
                </h2>

                <NuxtLink
                    :to="'/token/' + token.group"
                    v-for="token of tokens" :key="token.id"
                >
                    <div class="w-full px-3 py-2 text-sky-50 bg-sky-800 border-2 border-sky-600 rounded-lg shadow hover:bg-sky-700">
                        <h3 class="text-2xl font-medium">
                            {{token.name}}
                        </h3>

                        <h4 class="text-lg font-medium tracking-widest">
                            ${{token.ticker}}
                        </h4>

                        <h4 class="text-sm text-sky-300 truncate">
                            {{token.group}}
                        </h4>

                        <h3 class="flex flex-row gap-1 items-end font-medium">
                            <span class="text-2xl">{{numeral(token.amount).format('0,0.00[000000]')}}</span>

                            <span class="text-base text-sky-300">${{token.ticker}}</span>
                        </h3>
                    </div>
                </NuxtLink>
            </section>

        </div>

    </main>

    <AppFooter />
</template>
