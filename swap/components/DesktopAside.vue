<script setup>
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

</script>

<template>
    <main class="hidden h-screen lg:flex flex-col justify-between items-center bg-gradient-to-b from-amber-200 to-white">
        <img
            alt="Nexa Swap Logo"
            class="logo mt-12 w-32 h-32"
            src="@/assets/logo.png"
        />

        <div class="w-3/4">
            <h1 class="text-7xl font-bold uppercase bg-gradient-to-r from-amber-400 to-amber-900 bg-clip-text text-transparent">
                Nexa
            </h1>

            <h1 class="text-9xl font-bold bg-gradient-to-r from-indigo-400 to-gray-600 bg-clip-text text-transparent">
                Swap
            </h1>

            <nav class="w-full my-5 grid grid-cols-3 gap-3">
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

            <section class="w-full mt-3 px-5 py-2 bg-gray-800 rounded-md">
                <h2 class="flex flex-row items-center text-yellow-700 hover:text-yellow-600 font-medium cursor-default group">
                    mNEXA/USD
                    <span class="ml-2 text-4xl text-yellow-500 group-hover:text-yellow-400">
                        {{System.displayQuote}}
                    </span>
                </h2>

                <div class="flex justify-end">
                    <span class="text-yellow-400 font-medium text-2xl">
                        <span class="">
                            {{System.displayPctChg24h}}
                        </span>

                        <svg class="inline w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                        </svg>

                        <span class="mx-1 text-yellow-700">
                            &bullet; &bullet;
                        </span>

                        <span class="">
                            {{System.displayVol24h}}
                        </span>
                    </span>
                </div>
            </section>

            <!-- <h3 class="my-3 italic text-red-400 text-center">
                ☠️ This project is in alpha. Use at your own risk.
            </h3> -->

        </div>

        <Footer class="px-5" />
    </main>
</template>
