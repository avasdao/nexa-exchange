<script setup>
import AssetButton from '../components/AssetButton.vue'

const showLast = () => {
    alert('show last')
}

const showMore = () => {
    alert('show more')
}
</script>

<template>
    <main>
        <section class="my-5 p-5 bg-gradient-to-r from-yellow-200 to-yellow-300 border-4 border-yellow-400 rounded-lg shadow-lg">
            <h1 class="text-4xl font-bold">
                I want:
            </h1>

            <nav class="mt-5 flex">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showLast">
                    <span class="ml-1 mb-3 text-7xl text-yellow-400">
                        ‹
                    </span>
                    <span class="text-xs text-yellow-400 font-bold">
                        SHOW<br />LAST
                    </span>
                </button>

                <ul class="flex gap-5">
                    <AssetButton
                        assetid="NEX"
                        asset-name="Nexa"
                    />

                    <AssetButton
                        assetid="BTC"
                        asset-name="Bitcoin"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
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
        </section>

        <section class="opacity-30 cursor-not-allowed my-5 p-5 bg-gradient-to-r from-sky-200 to-sky-300 border-4 border-sky-400 rounded-lg shadow-lg">
            <h1 class="text-4xl font-bold">
                I have:
            </h1>

            <nav class="mt-5 flex">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showLast">
                    <span class="ml-1 mb-3 text-7xl text-sky-400">
                        ‹
                    </span>
                    <span class="text-xs text-sky-400 font-bold">
                        SHOW<br />LAST
                    </span>
                </button>

                <ul class="flex gap-5">
                    <AssetButton
                        assetid="BTC"
                        asset-name="Bitcoin"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                    />

                    <AssetButton
                        assetid="CASH"
                        asset-name="Ca$h Money"
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

        <div class="pr-3 flex justify-end">
            <a href="https://telr.io" target="_blank" class="text-xs text-gray-300 hover:no-underline hover:bg-transparent">
                Powered by TΞLR Concierge
            </a>
        </div>
    </main>
</template>
