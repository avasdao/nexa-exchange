<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'
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

const address = ref(null)
const balance = ref(0)
const tokens = ref(null)
const tokenBalances = ref(null)

/* Initialize route. */
const route = useRoute()
// console.log('ROUTE', route)

console.log('PARAMS', route?.params)
/* Set (route) path. */
address.value = route?.params.address?.[0]
console.log('ADDRESS', address.value)


/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const balanceDisplay = computed(() => {
    if (!balance.value) {
        return '0.00 NEXA'
    }

    return numeral(balance.value / 100.0).format('0,0.00') + ' $NEXA'
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
    let coinBalance
    let info
    let tokenid
    let tokenids
    let tokenBalances
    let unconfirmed

    coinBalance = await getAddressBalance(address.value)
    console.log('COIN BALANCE', coinBalance)

    balance.value = coinBalance.confirmed + coinBalance.unconfirmed

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

        const decimals = 8 // FIXME FOR DEV PURPOSES ONLY

        const satoshis = confirmed[tokenid] || 0 + unconfirmed[confirmed] || 0
        const amount = satoshis / 10**decimals

        tokens.value.push({
            id: tokenid,
            ...info,
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
        <div class="my-5">
            <h1 class="text-4xl font-medium">
                {{address}}
            </h1>
        </div>

        <div class="grid grid-cols-2 gap-4">

            <section class="flex flex-col gap-3 p-3 bg-indigo-200 border-2 border-indigo-300 rounded-lg shadow">
                <h2 class="text-2xl text-indigo-700 font-medium">
                    Coin Assets
                </h2>

                <h3 class="text-2xl font-medium">
                    {{balanceDisplay}}
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

                        <h4 class="text-sm text-sky-300">
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
