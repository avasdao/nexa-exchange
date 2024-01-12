<script setup lang="ts">
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

/* Initialize route. */
const route = useRoute()
// console.log('ROUTE', route)

/* Initialize asset id. */
const assetid = ref(null)

/* Set (route) path. */
assetid.value = route?.params.assetid
console.log('ASSET ID', assetid.value)

const tokenid = ref(null)
const tokenidHex = ref(null)

const isShowingChartMenu = ref(false)

const init = async () => {
    let pageTitle

    // TODO Detect full token id (or hex).

    switch(assetid.value) {
    case 'AVAS':
        pageTitle = `Ava's Cash`
        tokenid.value = 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x'
        tokenidHex.value = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000'
        break
    case 'NXL':
        pageTitle = `Nexa Exchange Loyalty`
        tokenid.value = 'nexa:tzs4e8n7dqtsyk0axx7zvcgt2snzt3t7z07ued0nu89hlvp6ggqqqdrypc4ea'
        tokenidHex.value = 'a15c9e7e68170259fd31bc26610b542625c57e13fdccb5f3e1cb7fb03a420000'
        break
    case 'STUDIO':
        pageTitle = `Studio Time + Collection`
        tokenid.value = 'nexa:tztnyazksgqpkphrx2m2fgxapllufqmuwp6k07xtlc8k4xcjpqqqq99lxywr8'
        tokenidHex.value = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'
        break
    }

    useHead({
    title: `${pageTitle} — WiserSwap`,
    meta: [
        { name: 'description', content: `WiserSwap offers instant Nexa token trading.` }
    ],
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
    <main class="py-10 max-w-6xl mx-auto flex flex-col lg:flex-row">
        <section class="flex flex-col gap-5 flex-1 justify-center items-center">

            <nav class="inline-flex rounded-md shadow-sm">
                <button type="button" class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                    <svg class="-ml-0.5 h-5 w-5 text-gray-400" data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z"></path>
                    </svg>

                    Share URL
                </button>

                <button type="button" class="relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                    Charts &amp; Reports
                </button>

                <div class="relative -ml-px block">
                    <button
                        type="button"
                        class="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                        id="option-menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                    >
                        <span class="sr-only">Open options</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>

                    <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
                    <div
                        v-if="isShowingChartMenu"
                        class="absolute right-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="option-menu-button"
                        tabindex="-1"
                    >
                        <div class="py-1" role="none">
                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                            <a href="javascript://" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="option-menu-item-0">Share on socials</a>
                            <a href="javascript://" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="option-menu-item-1">Save to my profile</a>
                            <a href="javascript://" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="option-menu-item-2">Export PDF</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="p-3 flex flex-col bg-amber-50 border-2 border-amber-200 rounded-lg sm:rounded-2xl shadow-md">
                <div class="sm:hidden">
                    <ChartDemo :width="320" />
                </div>
                <div class="hidden sm:block">
                    <ChartDemo :width="550" />
                </div>

                <div class="-mt-2 text-amber-600 text-xs font-medium italic text-center">
                    Real-time data may be delayed up to 15 minutes
                </div>
            </div>

            <SwapHistory />
        </section>

        <section class="px-3 w-full lg:w-[500px] order-first lg:order-none">
            <SwapWindow />
        </section>
    </main>

    <!-- NO FOOTER -->
</template>
