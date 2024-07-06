<script setup lang="ts">
useHead({
    title: `NFTs — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize runtime config. */
const runtimeConfig = useRuntimeConfig()

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const assets = ref(null)
const nfts = ref(null)

const init = async () => {
    /* Initialize locals. */
    let assets

    assets = await $fetch(runtimeConfig?.public?.API_ENDPOINT + '/assets')
        .catch(err => console.error(err))
    console.log('ASSETS', assets)

    assets = assets.filter(_asset => {
        return typeof _asset.ticker !== 'undefined'
    })

    nfts.value = assets.sort((_a, _b) => {
        return (_a.rank || 100) - (_b.rank || 100)
    })
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
    <header class="py-8 flex flex-col gap-3 justify-center items-center bg-gradient-to-b from-sky-700 to-sky-900 border-y-2 border-amber-300 shadow">
        <h1 class="text-6xl font-light text-sky-100 tracking-wider">
            NFTs <span class="font-thin text-amber-300">&amp;</span> SFTs
        </h1>

        <h3 class="flex flex-col justify-center items-center text-xl font-light text-sky-200 italic">
            browse a Curated collection of our MOST spectacular Nexican assets
        </h3>
    </header>

    <main class="max-w-6xl mx-auto px-3 py-5 flex flex-col gap-4">

        <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
            <button type="button" class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">
                All assets
            </button>

            <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">
                All collections
            </button>

            <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">
                Featured assets
            </button>
        </div>

        <section class="columns-2 md:columns-3 lg:columns-4">
            <div v-for="asset of nfts" :key="asset.id" class="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20">
                <NuxtLink :to="'https://niftyart.cash/buy/' + asset.id" target="_blank">
                    <!-- <img class="w-full rounded-md" :src="asset.media?.cardf"> -->
                    <img class="w-full rounded-md" :src="asset.imgUrl">

                    <div class="test__body absolute inset-0 p-8 text-white flex flex-col">
                        <div class="relative">
                            <!-- <a class="test__link absolute inset-0" target="_blank" href="/"></a> -->

                            <!-- <h1 class="test__title text-3xl font-bold mb-3">{{asset.name}}</h1> -->
                            <h1 class="test__title text-3xl font-bold mb-3">{{asset.title}}</h1>

                            <!-- <p class="test__author font-sm font-light">by {{asset.author}}</p> -->
                            <p class="test__author font-sm font-light">by {{asset.providers[0]}}</p>
                        </div>

                        <div class="mt-auto">
                            <span class="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">
                                NiftyArt
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>

        <PromoDivider />

        <!-- <FeaturedDivider /> -->

        <!-- TODO: Add forever (timeline) scrolling. -->
    </main>

    <!-- NO FOOTER -->
</template>
