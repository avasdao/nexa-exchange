<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

/* Initialize stores. */
import { useAmmStore } from '@/stores/amm'
const Amm = useAmmStore()

const PROVIDER_PUB_KEY_HASH = 'b2912c4cc61f1b8cbe5c77ebd5eeea2641645f10' // nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug

const amount = ref(null)
const quote = ref(null)
const error = ref(null)
const txidem = ref(null)

const isShowingSettings = ref(false)

const closeSettings = () => {
    isShowingSettings.value = false
}

const swap = async () => {
    /* Initialize locals. */
    let response
    let txResult

    if(confirm(`Are you sure you want to make this swap?`)) {
        if (!amount.value || amount.value === null) {
            return alert(`Oops! You MUST enter an amount to continue.`)
        }

        response = await Amm
            .swap(props.campaign, amount.value)
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


// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

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
                    Pay |
                    Limit |
                    Bridge
                </h1>

                <h3 class="text-sm text-amber-700 font-medium tracking-wide">
                    Instantly buy or sell tokens at superior prices
                </h3>
            </section>

            <svg @click="isShowingSettings = true" class="w-7 h-auto text-sky-600 cursor-pointer hover:text-sky-800" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
        </header>

        <section class="w-full mt-2 flex flex-col gap-5 px-5 py-0 bg-gray-700 border border-yellow-500 rounded-2xl shadow-md">

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

                <img src="~/assets/nexa.svg" class="relative -mt-20 w-16 h-auto" />
            </div>

            <!-- <div class="col-span-1 bg-gradient-to-b from-yellow-500 via-yellow-300 to-yellow-500 border-x border-yellow-500">
                <div class="h-full px-2 py-3 flex flex-col gap-4 bg-amber-600 bg-opacity-50">
                    <h2 class="text-2xl font-medium text-amber-100 text-center uppercase tracking-widest">
                        Options
                    </h2>

                    <p class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ad quod alias aperiam autem culpa. Numquam voluptatem eligendi.
                    </p>
                </div>
            </div> -->

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

                    <img src="https://nexa.studio/icon.svg" class="relative -mt-20 w-16 h-auto p-2" />
                </section>

                <section>
                    <h3 class="mt-8 text-gray-300 text-lg">
                        Recipient
                    </h3>

                    <h4 class="text-red-300 text-xs">
                        Please DO NOT send funds to exchange (or custodial) wallet.
                    </h4>

                    <input
                        type="text"
                        placeholder="Wallet Address"
                        class="px-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-2xl text-indigo-300 focus:outline-none"
                    />
                </section>

                <p class="py-3 text-gray-300 text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam consectetur, fugiat ipsam minima blanditiis at, accusamus autem quos optio.
                </p>

                <button @click="swap" class="mb-3 px-5 py-2 w-full text-rose-800 font-medium text-2xl bg-rose-400 rounded-lg shadow hover:bg-rose-300">
                    Make Swap
                </button>
            </div>

        </section>

        <!-- <section class="text-xs">
            <h3>Reminder</h3>

            <ol>
                <li>
                    Crosschain Fee is 0.02 %, Minimum Crosschain Fee is 0.9 USDT, Maximum Crosschain Fee is 1,000 USDT
                </li>
                <li>
                    Minimum Crosschain Amount is 10 USDT
                </li>
                <li>
                    Maximum Crosschain Amount is 5,000,000 USDT
                </li>
                <li>
                    Estimated Time of Crosschain Arrival is 10-30 min
                </li>
                <li>
                    Crosschain amount larger than 1,000,000 USDT could take up to 12 hours
                </li>
            </ol>
        </section> -->
    </main>

    <SwapSettings
        v-if="isShowingSettings"
        @close="closeSettings"
    />
</template>
