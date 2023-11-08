<script setup lang="ts">
useHead({
    title: `NFTs — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const assets = ref(null)
const nfts = ref(null)

const init = async () => {
    assets.value = []

    nfts.value = await $fetch('/api/nfts')
        .catch(err => console.error(err))
    console.log('NFTS', nfts.value)

    assets.value.push({
        id: 'cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb9000094e7b2d83551ed3bbb60c68e7bde443e4c9a701496fe0e664986b0e8ac60b9b9',
        owner: 'Endo',
        title: 'Ape #4',
        imgUrl: 'https://niftyart.cash/nftyc/cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb9000094e7b2d83551ed3bbb60c68e7bde443e4c9a701496fe0e664986b0e8ac60b9b9/cardf.jpeg',
        providers: [
            'NiftyArt'
        ],
        createdAt: 12345,
    })

    assets.value.push({
        id: 'cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb90000753b0856df158855654ce94ec505d94ac640926760a469f81e6ea22a864c73a8',
        owner: 'Endo',
        title: 'Ape #4',
        imgUrl: 'https://niftyart.cash/nftyc/cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb90000753b0856df158855654ce94ec505d94ac640926760a469f81e6ea22a864c73a8/cardf.jpeg',
        providers: [
            'NiftyArt'
        ],
        createdAt: 12345,
    })

    assets.value.push({
        id: 'cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb90000f23416cf81246c0915663e03fd453046b421e059a573707bb9e84cc1613a40e8',
        owner: 'Endo',
        title: 'Ape #4',
        imgUrl: 'https://niftyart.cash/nftyc/cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb90000f23416cf81246c0915663e03fd453046b421e059a573707bb9e84cc1613a40e8/cardf.jpeg',
        providers: [
            'NiftyArt'
        ],
        createdAt: 12345,
    })

    assets.value.push({
        id: 'stub',
        owner: 'Master Builder',
        title: 'Just Testing',
        imgUrl: 'https://source.unsplash.com/random/2',
        providers: [
            'NiftyArt'
        ],
        createdAt: 12345,
    })

    assets.value.push({
        id: 'stub',
        owner: 'Student Builder',
        title: 'More Testing',
        imgUrl: 'https://source.unsplash.com/random/3',
        providers: [
            'NiftyArt'
        ],
        createdAt: 12345,
    })

    for (let i = 5; i < 20; i++) {
        assets.value.push({
            id: 'stub',
            owner: 'Unsplash',
            title: 'Simple Placeholder',
            imgUrl: 'https://source.unsplash.com/random/' + i,
            providers: [
                'NiftyArt'
            ],
            createdAt: 12345,
        })

    }
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
            an aggregated collection of our MOST spectacular Nexican assets
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
            <div v-for="asset of assets" :key="asset.id" class="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20">
                <NuxtLink :to="'https://niftyart.cash/buy/' + asset.id" target="_blank">
                    <img class="w-full rounded-md" :src="asset.imgUrl">

                    <div class="test__body absolute inset-0 p-8 text-white flex flex-col">
                        <div class="relative">
                            <!-- <a class="test__link absolute inset-0" target="_blank" href="/"></a> -->

                            <h1 class="test__title text-3xl font-bold mb-3">{{asset.title}}</h1>

                            <p class="test__author font-sm font-light">by {{asset.owner}}</p>
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

        <SectionDivider />

        <!-- TODO: Add forever (timeline) scrolling. -->
    </main>

    <!-- NO FOOTER -->
</template>
