<script setup>
import numeral from 'numeral'
import {
    getAddressBalance,
    getAddressHistory,
} from '@nexajs/rostrum'

/* Initialize stores. */
import { useSwapStore } from '@/stores/swap'
import { useSystemStore } from '@/stores/system'
const Swap = useSwapStore()
const System = useSystemStore()

const isShowingCardSelect = ref(false)
const isShowingUsdtSelect = ref(false)
const search = ref(null)
const settleAddress = ref(null)
const addressBalance = ref(null)
const lastActivity = ref(null)

watch(settleAddress, async (_address) => {
    /* Set settle address (in store). */
    Swap.setAddress(_address)

    /* Validate address. */
    if (Swap.isValidAddress === true) {
        /* Start Nexa order. */
        Swap.startNexa()

        /* Scroll to top of page. */
        window.scrollTo(0,0)

        /* Set balance. */
        const balance = await getAddressBalance(settleAddress.value)

        if (typeof balance !== 'undefined') {
            /* Set balance. */
            addressBalance.value = numeral((balance.confirmed + balance.unconfirmed) / 100.0).format('0,0.00') + ' NEXA'
        }

        const history = await getAddressHistory(settleAddress.value)
        console.log('HISTORY', history)

        if (history.length > 0) {
            lastActivity.value = 'Block # ' + numeral(history[0]?.height).format('0,0')
        } else {
            lastActivity.value = 'no activity reported'
        }
    }
})

watch(() => Swap.settleAddress, (_address) => {
    /* Update (local) address. */
    settleAddress.value = _address
})

const openUsdtSelect = () => {
    isShowingUsdtSelect.value = true
}

const closeUsdtSelect = () => {
    isShowingUsdtSelect.value = false
}

const openCardSelect = () => {
    isShowingCardSelect.value = true
}

const closeCardSelect = () => {
    isShowingCardSelect.value = false
}

const startTrc20Usdt = () => {
    Swap.startUsdt()
}

/**
 * Open Scanner
 *
 * Open a video display and sends the correct DOM object to the scanner.
 */
const openScanner = async () => {
    /* Open video preview. */
    await Swap.openVideoPreview()

    /* Set (video) canvas area. */
    const canvas = document.getElementById('video-display-mobile')

    /* Start scanner. */
    Swap.startScanner(canvas)
}

const startOrder = () => {
    /* Clear (local) inputs. */
    settleAddress.value = null

    /* Start a new order. */
    Swap.startOrder()
}

</script>

<template>
    <main class="lg:hidden flex flex-col">
        <section class="mx-3 my-2">
            <div v-if="Swap.isShowingNexa" class="flex justify-end">
                <button @click="startOrder" class="px-3 py-1 text-rose-100 font-medium bg-rose-500 border-2 border-rose-700 rounded-lg shadow hover:bg-rose-400">
                    Start Over
                </button>
            </div>
            <p v-if="!Swap.isShowingNexa" class="px-5 text-base font-light text-center">
                Swap up to $1,000 in $NEXA <span class="font-normal">INSTANTLY</span> and for the <span class="font-normal">LOWEST</span> exchange rates available at
                <NuxtLink to="https://www.mexc.com/" target="_blank" class="text-blue-500 font-bold hover:underline">
                    MEXC</NuxtLink>,
                <NuxtLink to="https://www.coinex.com/" target="_blank" class="text-blue-500 font-bold hover:underline">
                    CoinEx</NuxtLink> and
                <NuxtLink to="https://txbit.io/" target="_blank" class="text-blue-500 font-bold hover:underline">
                    Txbit</NuxtLink>.
            </p>

            <section v-if="Swap.isShowingNexa" class="flex justify-between">
                <div>
                    <h2 class="text-gray-700 text-2xl font-medium uppercase">
                        Nexa
                    </h2>

                    <p class="text-sm text-gray-500">
                        Nexa is a PoW blockchain with the capability to process 100K TPS using hardware scaling technology.
                    </p>
                </div>

                <img src="~/assets/nexa.svg" class="w-28 h-auto" />
            </section>

            <section v-if="!Swap.isShowingNexa">
                <h1 class="mt-3 text-4xl text-gray-600 font-bold">
                    I want ↴
                </h1>

                <nav class="mt-5 flex flex-col">
                    <ul class="grid grid-cols-2 gap-3">
                        <AssetButton
                            @click="Swap.startNexa"
                            assetid="NEXA"
                            asset-name="Nexa"
                            class="w-full col-span-2 bg-gradient-to-b from-amber-400 to-amber-600"
                        />

                        <AssetButton
                            @click="openUsdtSelect"
                            assetid="USDT"
                            asset-name="Tether"
                            class="w-full bg-gradient-to-b from-green-700 to-green-900"
                        />

                        <AssetButton
                            assetid="BCH"
                            asset-name="Bitcoin Cash"
                            class="w-full bg-gradient-to-b from-lime-600 to-lime-800"
                        />

                        <NuxtLink to="/gifts">
                            <AssetButton
                                assetid="GIFTS"
                                asset-name="Gift Cards"
                                class="w-full bg-gradient-to-b from-rose-600 to-rose-800"
                            />
                        </NuxtLink>

                        <AssetButton
                            assetid="DASH"
                            asset-name="Dash"
                            class="w-full bg-gradient-to-b from-sky-700 to-sky-900"
                        />
                    </ul>
                </nav>
            </section>
        </section>

        <div v-if="Swap.isValidAddress !== true" class="mx-10 my-3 border-t border-gray-300" />

        <section class="mx-3 my-3 flex flex-col gap-3">
            <video
                v-if="Swap.isShowingVideoPreview"
                :class="Swap.videoPreviewClass"
                id="video-display-mobile"
                autoplay
                playsinline
            ></video>

            <p v-if="Swap.isValidAddress !== true" class="px-3 text-sm text-gray-500">
                Please provide an address where you want your new assets delivered.
                <span class="text-indigo-500 font-medium">Type, Paste or Scan.</span>
            </p>

            <div
                class="flex flex-row gap-2"
                :class="[ Swap.isValidAddress === true ? 'opacity-30' : 'opacity-100' ]"
            >
                <input
                    type="text"
                    placeholder="Paste an address OR Scan ›››"
                    v-model="settleAddress"
                    :disabled="Swap.isValidAddress === true ? true : false"
                    class="px-3 py-1 w-full border-2 border-yellow-500 text-xl rounded shadow"
                />

                <button
                    @click="openScanner"
                    :disabled="Swap.isValidAddress === true ? true : false"
                >
                    <svg class="w-12 h-auto text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                </button>
            </div>

            <h4 v-if="Swap.isValidAddress !== true && Swap.isValidAddress !== false" class="ml-2 -mt-2 text-sm text-red-500 font-medium">
                <!-- Show error message, if any. -->
                {{Swap.isValidAddress}}
            </h4>

            <section v-if="Swap.isValidAddress === true" class="grid grid-cols-5 gap-1 text-sm text-gray-700">
                <h4 class="text-right col-span-2">
                    Address balance
                </h4>
                <h4 class="font-medium col-span-3">
                    {{addressBalance}}
                </h4>

                <h4 class="text-right col-span-2">
                    Last activity
                </h4>
                <h4 class="font-medium col-span-3">
                    {{lastActivity}}
                </h4>
            </section>
        </section>

        <div v-if="!Swap.isShowingNexa" class="mx-10 my-3 border-t border-gray-300" />

        <section v-if="!Swap.isShowingNexa" class="mx-3 my-3 flex flex-col gap-3">
            <p class="px-3 text-sm text-gray-500">
                Don't see your asset listed above?
                Not a problem.
                Search <span class="text-indigo-500 font-medium">more than 400+</span> assets below.
            </p>

            <input
                type="text"
                placeholder="Search all supported assets"
                v-model="search"
                disabled
                class="px-3 py-1 w-full h-12 border-2 border-yellow-500 text-xl rounded shadow"
            />
        </section>

        <div v-if="Swap.isShowingNexa" class="mx-10 my-3 border-t border-gray-300" />

        <section v-if="Swap.isShowingNexa && Swap.isValidAddress === true" class="mx-3 my-3 flex flex-col gap-3">
            <p class="px-3 text-sm text-gray-500">
                Please enter the dollar value of <span class="text-indigo-500 font-medium">$NEXA</span> that you want to receive.
                <span class="block text-red-500 font-medium text-center italic">
                    Maximum swap amount is $1,000
                </span>
            </p>

            <div class="relative mt-2 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="text-2xl text-gray-500">$</span>
                </div>

                <input
                    type="number"
                    class="block w-full rounded-md border-2 border-yellow-500 py-1.5 pl-10 pr-12 text-2xl text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="1 - 1000"
                    aria-describedby="price-currency"
                />

                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span class="text-2xl text-gray-500" id="price-currency">USD</span>
                </div>
            </div>
        </section>

        <section v-if="Swap.isShowingNexa && Swap.isValidAddress === true" class="mx-3">
            <h1 class="mt-3 text-4xl text-gray-600 font-bold">
                I have ↴
            </h1>

            <nav class="mt-5 flex flex-col">
                <ul class="grid grid-cols-2 gap-3">
                    <AssetButton
                        @click="openUsdtSelect"
                        assetid="USDT"
                        asset-name="Tether"
                        class="w-full bg-gradient-to-b from-green-700 to-green-900"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                        class="w-full bg-gradient-to-b from-lime-600 to-lime-800"
                    />

                    <AssetButton
                        @click="openCardSelect"
                        assetid="CREDIT"
                        asset-name="Credit Card"
                        class="w-full bg-gradient-to-b from-purple-700 to-purple-900"
                    />

                    <AssetButton
                        assetid="DASH"
                        asset-name="Dash"
                        class="w-full bg-gradient-to-b from-sky-700 to-sky-900"
                    />
                </ul>
            </nav>
        </section>

        <section v-if="Swap.isShowingNexa && Swap.isValidAddress === true" class="mx-3 my-3 flex flex-col gap-3">
            <p class="px-3 text-sm text-gray-500">
                Don't see your asset listed above?
                Not a problem.
                Search <span class="text-indigo-500 font-medium">more than 400+</span> assets below.
            </p>

            <input
                type="text"
                placeholder="Search all supported assets"
                v-model="search"
                disabled
                class="px-3 py-1 w-full h-12 border-2 border-yellow-500 text-xl rounded shadow"
            />
        </section>

        <BottomDrawerCardSelect v-if="isShowingCardSelect" @closeDrawer="closeCardSelect" />
        <BottomDrawerUsdtSelect v-if="isShowingUsdtSelect" @closeDrawer="closeUsdtSelect" />
    </main>
</template>
