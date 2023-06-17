<script setup>
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

</script>

<template>
    <main class="lg:hidden px-3 py-2">
        <div class="flex justify-between">
            <div>
                <h1 class="inline text-xl font-bold uppercase bg-gradient-to-r from-yellow-700 to-yellow-400 bg-clip-text text-transparent">
                    Nexa
                </h1>

                <h1 class="inline text-xl font-bold bg-gradient-to-r from-indigo-400 to-gray-600 bg-clip-text text-transparent">
                    Swap
                </h1>
            </div>

            <h3>
                <span class="text-gray-500 text-xs font-medium">
                    mNEXA/USD
                </span>

                <span class="text-gray-700 text-lg font-bold">
                    {{System.displayPrice}}
                </span>
            </h3>
        </div>

        <nav class="w-full my-2 grid grid-cols-3 gap-3">
            <NuxtLink to="/" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                Home
            </NuxtLink>

            <NuxtLink to="/guide" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                Guide
            </NuxtLink>

            <NuxtLink to="/help" class="py-2 text-xl text-sky-700 font-medium text-center bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg shadow">
                Help
            </NuxtLink>
        </nav>
    </main>
</template>
