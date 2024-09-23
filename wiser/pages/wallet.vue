<script setup>
/* Import modules. */
import numeral from 'numeral'

/* Define properties. */
const props = defineProps({
    isFullScreen: Boolean,
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useWalletStore } from '@/stores/wallet'
import { useSystemStore } from '@/stores/system'
const Profile = useProfileStore()
const Wallet = useWalletStore()
const System = useSystemStore()

const mnemonic = ref(null)
const tokens = ref(null)

const isShowingAssets = ref(false)
const isShowingDeposit = ref(false)
const isShowingSend = ref(false)
const isShowingHistory = ref(false)
const isShowingSwap = ref(false)

const displayBalance = computed(() => {
    /* Validate asset. */
    if (!Wallet.asset || !Wallet.asset.amount) {
        return '0.00'
    }

    let decimalValue
    let bigIntValue

    if (Wallet.asset.group === '0') {
        decimalValue = Wallet.asset.satoshis * BigInt(1e4)
    } else {
        decimalValue = Wallet.asset.amount * BigInt(1e4)
    }

    if (Wallet.asset.decimal_places > 0) {
        bigIntValue = decimalValue / BigInt(10**Wallet.asset.decimal_places)
    } else {
        bigIntValue = decimalValue
    }

    return numeral(parseFloat(bigIntValue) / 1e4).format('0,0[.]00[0000]')

    /* Initialize locals. */
    // let amount
    // let balance

//     if (Wallet.asset?.decimal_places > 0 && Wallet.asset?.group !== '0') {
//         /* Adjust for decimals. */
// // FIXME: Preserve decimal precision/accuracy.
//         amount = Wallet.asset.amount / BigInt(10**Wallet.asset.decimal_places)

//         /* Set balance. */
//         balance = amount || 0.00
//     } else {
//         /* Set balance. */
//         balance = Wallet.asset.amount || 0.00
//     }

//     /* Return (formatted) balance. */
//     return numeral(balance).format('0,0[.]00[0000]') + '*'
})

const displayBalanceUsd = computed(() => {
    /* Validate asset. */
    if (!Wallet.asset || !Wallet.asset.fiat || !Wallet.asset.fiat.USD) {
        return '0.00'
    }

    /* Initialize locals. */
    let balanceUsd

    /* Set balance. */
    balanceUsd = Wallet.asset.fiat.USD || 0.00

    /* Return formatted value. */
    return numeral(balanceUsd).format('$0,0.00[0000]')
})

const tokensBalanceUsd = computed(() => {
    let totalTokens = BigInt(0)
    let totalUsd = 0.0

    let decimals
    let fiat
    let tokenAmount
    let tokenUsd

    Object.keys(tokens.value).forEach(_tokenid => {
        decimals = 0 // FOR DEV PURPOSES ONLY
        tokenUsd = 0.00 // FOR DEV PURPOSES ONLY

        /* Set total tokens. */
        totalTokens += tokens.value[_tokenid]
        // console.log('TOTAL TOKENS', totalTokens)

        /* Calculate decimal value. */
        tokenAmount = totalTokens * BigInt(tokenUsd * 100) // convert to cents
        tokenAmount = tokenAmount / BigInt(1e6) // reduce to 4 decimals (+ restore cents)
        // console.log('TOKEN AMOUNT', tokenAmount)

        fiat = parseFloat(tokenAmount) / 1e4
        // console.log('FIAT AMOUNT', fiat)

        /* Add (fiat) value. */
        totalUsd += fiat
    })

    /* Return (fiat) value. */
    return '~' + numeral(totalUsd).format('$0,0.00')
})

/**
 * Set Tab
 */
const setTab = (_tab) => {
    /* Clear all tabs. */
    isShowingAssets.value = false
    isShowingSend.value = false
    isShowingDeposit.value = false
    isShowingHistory.value = false
    isShowingSwap.value = false

    if (_tab === 'assets') {
        isShowingAssets.value = true
    }

    if (_tab === 'send') {
        isShowingSend.value = true
    }

    if (_tab === 'deposit') {
        isShowingDeposit.value = true
    }

    if (_tab === 'history') {
        isShowingHistory.value = true
    }

    if (_tab === 'swap') {
        isShowingSwap.value = true
    }
}

const init = async () => {
    /* Set (default) tab. */
    setTab('assets')

    /* Validate tokens. */
    // if (Wallet.tokens) {
    //     // /* Initialize tokens. */
    //     tokens.value = {}

    //     // /* Handle tokens. */
    //     Wallet.tokens.forEach(_token => {
    //         if (!tokens.value[_token.tokenid]) {
    //             tokens.value[_token.tokenid] = BigInt(0)
    //         }

    //         /* Add tokens to total. */
    //         tokens.value[_token.tokenid] += _token.tokens
    //     })
    //     // console.log('WALLET TOKENS', Wallet.tokens)
    // }
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
// })
</script>

<template>
    <Loading v-if="Wallet.isLoading" />

    <WalletSetup v-else-if="!Wallet.isReady" class="px-3" />

    <main v-else class="max-w-6xl mx-auto px-3 py-5 grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div class="col-span-4">
            <section @click="setTab('assets')" class="cursor-pointer group px-5 py-3 bg-gradient-to-b from-sky-100 to-sky-50 border-t border-x border-sky-400 rounded-t-lg rounded-x-lg shadow-md hover:bg-sky-100">
                <div class="flex flex-row w-full justify-between items-center mb-1" :class="[ isShowingAssets ? 'visible' : 'hidden' ]">
                    <h3 class="text-base tracking-tight uppercase text-sky-600 font-medium text-center opacity-40 group-hover:opacity-100 group-hover:scale-105 duration-300 ease-in-out">
                        My Portfolio Summary
                    </h3>

                    <img :src="Wallet.asset?.iconUrl" class="-mt-3 -mr-2 p-2 h-10 w-auto opacity-40 group-hover:opacity-100 group-hover:h-11 duration-300 ease-in-out" />
                </div>

                <div class="flex flex-col items-end">
                    <h3 class="text-xs tracking-widest text-sky-700 font-medium uppercase">
                        Spendable ${{Wallet.asset?.ticker}}
                    </h3>

                    <h2 class="text-3xl text-gray-600 font-medium">
                        {{displayBalance}}
                    </h2>

                    <h3 class="text-xl text-gray-500 font-medium">
                        {{displayBalanceUsd}}
                    </h3>
                </div>

                <section :class="[ isShowingAssets ? 'visible' : 'hidden' ]">
                    <div class="my-2 border-t border-sky-500" />

                    <div class="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <h3 class="text-xs tracking-widest text-sky-700 font-medium uppercase">
                                Tokens
                            </h3>

                            <h2 v-if="tokens" class="text-base text-gray-600 font-medium">
                                {{tokensBalanceUsd}} <small class="text-sky-400">x{{Object.keys(tokens).length}}</small>
                            </h2>
                            <h2 v-else class="text-base text-gray-600 font-medium">
                                none
                            </h2>
                        </div>

                        <div>
                            <h3 class="text-xs tracking-widest text-sky-700 font-medium uppercase">
                                Collectibles
                            </h3>

                            <h2 class="text-base text-gray-600 font-medium">
                                none
                            </h2>
                        </div>
                    </div>
                </section>
            </section>

            <div class="block">
                <nav class="isolate grid grid-cols-4 divide-x divide-gray-200 rounded-x-lg rounded-b-lg shadow" aria-label="Tabs">
                    <!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->
                    <div @click="setTab('deposit')" class="cursor-pointer bg-gray-700 rounded-bl-lg group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10" aria-current="page" :class="[ isShowingSend ? 'text-gray-100' : 'text-gray-400' ]">
                        <svg class="w-4 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                        </svg>
                        <span class="text-xs sm:text-sm">Deposit</span>
                        <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5" :class="[ isShowingSend ? 'bg-sky-500' : 'bg-transparent' ]"></span>
                    </div>

                    <div @click="setTab('send')" class="cursor-pointer bg-gray-700 text-gray-400 group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-center text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10">
                        <svg class="w-4 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path>
                        </svg>
                        <span class="text-xs sm:text-sm">Send</span>
                        <span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                    </div>

                    <div @click="setTab('history')" class="cursor-pointer bg-gray-700 text-gray-400 group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-center text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10">
                        <svg class="w-5 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                        </svg>
                        <span class="text-xs sm:text-sm">History</span>
                        <span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                    </div>

                    <div @click="setTab('swap')" class="cursor-pointer bg-gray-700 text-gray-400 rounded-br-lg group relative min-w-0 flex flex-row justify-center items-center gap-1 overflow-hidden py-2 px-2 text-center text-sm font-medium hover:bg-gray-50 hover:text-gray-600 focus:z-10">
                        <svg class="w-4 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path>
                        </svg>
                        <span class="text-xs sm:text-sm">Swap</span>
                        <span aria-hidden="true" class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                    </div>
                </nav>
            </div>

            <div class="my-5">
                <WalletAssets v-if="isShowingAssets" :isFullScreen="isFullScreen" />
                <WalletSend v-if="isShowingSend" :isFullScreen="isFullScreen" />
                <WalletDeposit v-if="isShowingDeposit" :isFullScreen="isFullScreen" />
                <WalletHistory v-if="isShowingHistory" :isFullScreen="isFullScreen" />
                <WalletSwap v-if="isShowingSwap" :isFullScreen="isFullScreen" />
            </div>
        </div>

        <section class="px-5 py-2 col-span-3 flex flex-col gap-3">

            <!-- Invoice summary -->
            <div class="lg:col-start-3 lg:row-end-1">
                <h2 class="sr-only">My WiserSwap Summary</h2>

                <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                    <dl class="flex flex-wrap">
                        <div class="flex-auto pl-6 pt-6">
                            <dt class="text-sm font-semibold leading-6 text-gray-900">
                                My WiserSwap Summary
                            </dt>

                            <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
                                $10,560.00
                            </dd>
                        </div>

                        <div class="flex-none self-end px-6 pt-4">
                            <dt class="sr-only">Status</dt>

                            <dd class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                                Paid
                            </dd>
                        </div>

                        <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                            <dt class="flex-none">
                                <span class="sr-only">Client</span>
                                <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </dt>

                            <dd class="text-sm font-medium leading-6 text-gray-900">
                                Alex Curren
                            </dd>
                        </div>

                        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                            <dt class="flex-none">
                                <span class="sr-only">Due date</span>
                                <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </dt>

                            <dd class="text-sm leading-6 text-gray-500">
                                <time datetime="2023-01-31">January 31, 2023</time>
                            </dd>
                        </div>

                        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                            <dt class="flex-none">
                                <span class="sr-only">Status</span>
                                <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </dt>

                            <dd class="text-sm leading-6 text-gray-500">
                                Paid with MasterCard
                            </dd>
                        </div>
                    </dl>

                    <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
                        <a href="javascript://" class="text-sm font-semibold leading-6 text-gray-900">
                            Export my swaps history <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="mt-5 lg:col-start-3">
                <!-- Activity feed -->
                <h2 class="text-sm font-semibold leading-6 text-gray-900">
                    My Activity Highlights
                </h2>

                <ul role="list" class="mt-6 space-y-6">
                    <li class="relative flex gap-x-4">
                        <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div class="w-px bg-gray-200"></div>
                        </div>

                        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>

                        <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                            <span class="font-medium text-gray-900">Chelsea Hagon</span>
                            created the invoice.
                        </p>

                        <time datetime="2023-01-23T10:32" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            2d ago
                        </time>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div class="w-px bg-gray-200"></div>
                        </div>

                        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>

                        <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                            <span class="font-medium text-gray-900">Chelsea Hagon</span>
                            edited the invoice.
                        </p>

                        <time datetime="2023-01-23T11:03" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            3d ago
                        </time>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div class="w-px bg-gray-200"></div>
                        </div>

                        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>

                        <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                            <span class="font-medium text-gray-900">Chelsea Hagon</span>
                            sent the invoice.
                        </p>

                        <time datetime="2023-01-23T11:24" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            3d ago
                        </time>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div class="w-px bg-gray-200"></div>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                        />

                        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                            <div class="flex justify-between gap-x-4">
                                <div class="py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">
                                    $NXL Airdrop</span>
                                    received
                                </div>

                                <time datetime="2023-01-23T15:56" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                                    6d ago
                                </time>
                            </div>

                            <p class="text-sm leading-6 text-gray-500">
                                180 receipients, ~125 $NXL each
                            </p>
                        </div>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div class="w-px bg-gray-200"></div>
                        </div>

                        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>

                        <div class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                            <button class="px-3 py-1 bg-sky-100 border border-sky-300 rounded-md shadow hover:bg-sky-500 group">
                                <span class="text-sky-700 font-medium tracking-wider group-hover:text-sky-200">
                                    load more highlights...
                                </span>
                            </button>
                        </div>

                        <!-- <time datetime="2023-01-24T09:12" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            7d ago
                        </time> -->
                    </li>

                    <li class="relative flex gap-x-4">
                        <div class="absolute left-0 top-0 flex w-6 justify-center h-6">
                            <div class="w-px bg-gray-200"></div>
                        </div>

                        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <svg class="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>

                        <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                            <span class="font-medium text-gray-900">My first transaction</span>
                            Jun 21st 2022
                        </p>

                        <time datetime="2023-01-24T09:20" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            2yrs ago
                        </time>
                    </li>
                </ul>

            </div>

        </section>
    </main>
</template>
