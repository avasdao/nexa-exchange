<script setup>
/* Initialize stores. */
import { useSwapStore } from '@/stores/swap'
import { useSystemStore } from '@/stores/system'
const Swap = useSwapStore()
const System = useSystemStore()

const isShowingUsdtSelect = ref(false)
const settleAddress = ref(false)
const search = ref(false)

/* Load monitoring page. */
// router.push('/' + response.id)

const openUsdtSelect = () => {
    isShowingUsdtSelect.value = true
}

const closeUsdtSelect = () => {
    isShowingUsdtSelect.value = false
}

const startTrc20Usdt = () => {
    Swap.startUsdt()
}

</script>

<template>
    <main class="lg:hidden flex flex-col">
        <section class="mx-3 my-2">
            <p class="px-5 text-base font-light">
                Swap upto $1,000 in $NEXA <span class="font-normal">INSTANTLY</span> and for the <span class="font-normal">LOWEST</span> exchange rates available at
                <span class="text-indigo-500 font-bold">MEXC</span>,
                <span class="text-indigo-500 font-bold">CoinEx</span> and
                <span class="text-indigo-500 font-bold">Txbit</span>.
            </p>

            <h1 class="mt-3 text-4xl text-gray-600 font-bold">
                I want ↴
            </h1>

            <nav class="mt-5 flex flex-col">
                <ul class="grid grid-cols-2 gap-3">
                    <AssetButton
                        @click="Swap.startNexa"
                        assetid="NEXA"
                        asset-name="Nexa"
                        class="w-full col-span-2 bg-gradient-to-b from-amber-400 to-amber-500"
                    />

                    <AssetButton
                        @click="openUsdtSelect"
                        assetid="USDT"
                        asset-name="Tether"
                        class="w-full bg-gradient-to-b from-green-800 to-green-900"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                        class="w-full bg-gradient-to-b from-green-600 to-green-700"
                    />

                    <NuxtLink to="/gifts">
                        <AssetButton
                            assetid="GIFTS"
                            asset-name="Gift Cards"
                            class="w-full bg-gradient-to-b from-rose-600 to-rose-700"
                        />
                    </NuxtLink>

                    <AssetButton
                        assetid="DASH"
                        asset-name="Dash"
                        class="w-full bg-gradient-to-b from-sky-700 to-sky-800"
                    />
                </ul>
            </nav>
        </section>

        <div class="mx-10 my-3 border-t border-gray-300" />

        <section class="mx-3 my-3 flex flex-col gap-3">
            <video
                v-if="Swap.isShowingVideoPreview"
                :class="videoPreviewClass"
                id="video-display"
                autoplay
                playsinline
            ></video>

            <div
                class="flex flex-row gap-2"
                :class="[ Swap.isValidAddress ? 'opacity-30' : 'opacity-100' ]"
            >
                <input
                    type="text"
                    placeholder="Paste an address OR Scan ›››"
                    v-model="settleAddress"
                    :disabled="Swap.isValidAddress"
                    class="px-3 py-1 w-full border-2 border-yellow-500 text-xl rounded"
                />

                <button
                    @click="openScanner"
                    :disabled="Swap.isValidAddress"
                >
                    <svg class="w-12 h-12 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                </button>
            </div>

        </section>

        <div class="mx-10 my-3 border-t border-gray-300" />

        <section class="mx-3 my-3 flex flex-col">
            <input
                type="text"
                placeholder="Search for more assets"
                v-model="search"
                disabled
                class="px-3 py-1 w-full h-12 border-2 border-yellow-500 text-xl rounded"
            />
        </section>

        <section
            v-if="Swap.isShowingNexa"
            class="my-5 p-5 bg-gradient-to-r from-sky-200 to-sky-300 border-4 border-sky-400 rounded-lg shadow-lg"
            :class="[ Swap.isValidAddress ? 'opacity-100' : 'opacity-30 cursor-not-allowed']"
        >
            <h1 class="text-4xl font-bold">
                I have:
            </h1>

            <nav class="mt-5 flex flex-col sm:flex-row">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showPrev">
                    <span class="ml-1 mb-3 text-7xl text-sky-400">
                        ‹
                    </span>
                    <span class="text-xs text-sky-400 font-bold">
                        SHOW<br />PREV
                    </span>
                </button>

                <ul class="flex flex-col sm:flex-row gap-5">
                    <AssetButton
                        @click="Swap.startUsdt"
                        assetid="USDT"
                        asset-name="Tether"
                        class="w-full sm:w-36"
                        :class="[ Swap.isValidAddress ? 'opacity-100' : 'opacity-50 cursor-not-allowed']"
                    />

                    <AssetButton
                        @click="Swap.startBch"
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                        class="w-full sm:w-36"
                        :class="[ Swap.isValidAddress ? 'opacity-100' : 'opacity-50 cursor-not-allowed']"
                    />

                    <AssetButton
                        assetid="BTC"
                        asset-name="Bitcoin"
                        class="w-full sm:w-36 opacity-50 cursor-not-allowed"
                    />
                </ul>

                <button class="ml-3 flex items-center group" @click="showMore">
                    <span class="text-xs font-bold group-hover:text-cyan-600">
                        SHOW<br />MORE
                    </span>
                    <span class="ml-1 mb-3 text-7xl group-hover:text-cyan-400">
                        ›
                    </span>
                </button>
            </nav>
        </section>

        <aside v-if="isShowingUsdtSelect" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <!--
            Background backdrop, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div @click="closeUsdtSelect" class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
                    <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div>
                            <div class="mx-auto flex w-16 h-auto items-center justify-center">
                                <img src="https://i.ibb.co/5j3K9T0/image.png" class="w-full">
                            </div>

                            <div class="mt-3 text-center sm:mt-5">
                                <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                                    Choose Your Tether (USDT)
                                </h3>

                                <p class="mt-2 px-2 text-sm text-gray-500">
                                    Tether operates <span class="font-bold">USDT</span> on multiple blockchain networks with varying performance and economics.
                                    Choose your preferred network below to continue.
                                </p>
                            </div>
                        </div>

                        <div class="mt-5 flex flex-col gap-3">
                            <button
                                class="inline-flex w-full justify-center rounded-md bg-indigo-200 px-3 py-2 text-xl font-semibold text-white shadow-sm"
                                disabled
                            >
                                Binance | BEP-20
                            </button>

                            <button
                                class="inline-flex w-full justify-center rounded-md bg-indigo-200 px-3 py-2 text-xl font-semibold text-white shadow-sm"
                                disabled
                            >
                                Ethereum | ERC-20
                            </button>

                            <button
                                @click="startTrc20Usdt"
                                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Tron | TRC-20
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </main>
</template>
