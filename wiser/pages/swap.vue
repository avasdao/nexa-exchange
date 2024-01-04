<script setup lang="ts">
useHead({
    title: `Swap — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

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
    <main class="py-10 max-w-6xl mx-auto flex flex-col lg:flex-row">
        <section class="flex flex-col gap-5 flex-1 justify-center items-center">

            <nav class="inline-flex rounded-md shadow-sm">
                <button type="button" class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                    <svg class="-ml-0.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Bookmark
                </button>

                <button type="button" class="relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">Save changes</button>

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

            <div class="p-10 flex flex-col gap-3 bg-lime-50 border-2 border-lime-200 rounded-2xl shadow-md">
                <ChartTest />

                <div class="text-lime-800 text-xs font-medium italic text-center">
                    Real-time chart data may be delayed up to 15 minutes.
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
