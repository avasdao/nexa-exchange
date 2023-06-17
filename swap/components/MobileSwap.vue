<script setup>
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

</script>

<template>
    <main class="lg:hidden flex flex-col">
        <section class="mx-3 my-5">
            <video
                v-if="showVideoPreview"
                :class="videoPreviewClass"
                id="video-display"
                autoplay
                playsinline
            ></video>

            <h1 class="mt-3 text-4xl font-bold">
                I want:
            </h1>

            <nav class="mt-5 flex flex-col sm:flex-row">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showPrev">
                    <span class="ml-1 mb-3 text-7xl text-yellow-400">
                        ‹
                    </span>
                    <span class="text-xs text-yellow-400 font-bold">
                        SHOW<br />PREV
                    </span>
                </button>

                <ul class="flex flex-col sm:flex-row gap-5">
                    <AssetButton
                        @click="startNexa"
                        assetid="NEXA"
                        asset-name="Nexa"
                        class="w-full sm:w-36"
                    />

                    <AssetButton
                        assetid="USDT"
                        asset-name="Tether"
                        class="w-full sm:w-36"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                        class="w-full sm:w-36"
                    />

                    <!-- <li>Tether (USDT)</li> -->
                    <!-- <li>USD Coin (USDC)</li> -->
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

            <div
                v-if="isShowingNexa"
                class="mt-7 flex flex-row gap-4"
                :class="[ isValidAddress ? 'opacity-30' : 'opacity-100' ]"
            >
                <input
                    type="text"
                    placeholder="Type or paste your :nexa address"
                    v-model="settleAddress"
                    :disabled="isValidAddress"
                    class="px-3 py-1 w-full border-2 border-yellow-500 text-xl rounded"
                />

                <button
                    @click="openScanner"
                    :disabled="isValidAddress"
                >
                    <svg class="w-12 h-12 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                </button>
            </div>

        </section>

        <section
            class="my-5 p-5 bg-gradient-to-r from-sky-200 to-sky-300 border-4 border-sky-400 rounded-lg shadow-lg"
            :class="[ isValidAddress ? 'opacity-100' : 'opacity-30 cursor-not-allowed']"
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
                        @click="startUSDT"
                        assetid="USDT"
                        asset-name="Tether"
                        class="w-full sm:w-36"
                        :class="[ isValidAddress ? 'opacity-100' : 'opacity-50 cursor-not-allowed']"
                    />

                    <AssetButton
                        @click="startBCH"
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                        class="w-full sm:w-36"
                        :class="[ isValidAddress ? 'opacity-100' : 'opacity-50 cursor-not-allowed']"
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
    </main>
</template>
