<script setup>
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

</script>

<template>
    <main class="lg:hidden px-3 py-2">
        <div class="px-2 flex justify-between">
            <NuxtLink to="/">
                <h1 class="inline text-xl font-bold uppercase bg-gradient-to-r from-yellow-700 to-yellow-500 bg-clip-text text-transparent">
                    Nexa
                </h1>

                <h1 class="inline text-xl font-bold uppercase bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">
                    Swap
                </h1>
            </NuxtLink>

            <NuxtLink to="/market">
                <span class="text-gray-500 text-xs font-medium">
                    mNEXA/USD
                </span>

                <span class="text-gray-700 text-lg font-bold">
                    {{System.displayPrice}}
                </span>
            </NuxtLink>
        </div>

        <nav class="w-full my-2 grid grid-cols-3">
            <NuxtLink to="/" class="py-1 text-xl text-sky-100 font-medium text-center bg-gray-700 border-y border-l border-amber-400 hover:bg-amber-500 rounded-l-lg shadow">
                Home
            </NuxtLink>

            <NuxtLink to="/guide" class="py-1 text-xl text-sky-100 font-medium text-center bg-gray-700 border-y border-amber-400 hover:bg-amber-500 shadow">
                Guide
            </NuxtLink>

            <NuxtLink to="/help" class="py-1 text-xl text-sky-100 font-medium text-center bg-gray-700 border-y border-r border-amber-400 hover:bg-amber-500 rounded-r-lg shadow">
                Help
            </NuxtLink>
        </nav>
    </main>
</template>
