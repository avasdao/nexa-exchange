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
        <main class="w-screen h-screen overflow-hidden bg-gradient-to-b from-gray-600 to-gray-800 px-3 flex flex-col items-center justify-between">
        <div class="w-full lg:w-3/4 mx-auto mt-10 px-5">
            <header class="w-full px-3 flex justify-between">
                <h1 class="text-2xl text-gray-200 font-light tracking-widest">
                    Nexa Cross-chain Bridge
                </h1>

                <svg class="w-7 h-auto text-sky-100" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            </header>

            <section class="w-full h-96 grid grid-cols-5 gap-4 mt-2 px-5 py-0 bg-gray-700 border border-yellow-500 rounded-2xl shadow-md">

                <div class="col-span-2 py-2">
                    <h3 class="text-indigo-300 font-medium uppercase">
                        From
                    </h3>

                    <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        class="px-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-6xl text-indigo-300 focus:outline-none"
                    />
                </div>

                <div class="col-span-1 bg-gradient-to-b from-yellow-500 via-yellow-300 to-yellow-500 border-x border-yellow-500">
                    <div class="h-full px-2 py-3 flex flex-col gap-4 bg-amber-600 bg-opacity-50">
                        <h2 class="text-2xl font-medium text-amber-100 text-center uppercase tracking-widest">
                            Options
                        </h2>

                        <p class="text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ad quod alias aperiam autem culpa. Numquam voluptatem eligendi.
                        </p>
                    </div>
                </div>

                <div class="col-span-2 py-2 flex flex-col justify-between">
                    <section>
                        <h3 class="text-indigo-300 font-medium uppercase">
                            To
                        </h3>

                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            class="px-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-6xl text-indigo-300 focus:outline-none"
                        />
                    </section>

                    <section>
                        <h3 class="text-gray-300 text-lg">
                            Recipient
                        </h3>

                        <h4 class="text-red-300 text-xs">
                            Please DO NOT send funds to exchange (or custodial) wallet.
                        </h4>

                        <input
                            type="text"
                            placeholder="Wallet Address"
                            class="px-2 py-2 bg-transparent border-b-2 border-indigo-300 w-full text-2xl text-indigo-300 focus:outline-none"
                        />
                    </section>

                    <p class="py-3 text-gray-300 text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam consectetur, fugiat ipsam minima blanditiis at, accusamus autem quos optio.
                    </p>
                </div>

            </section>

            <section>
                <h3>Reminder</h3>

                <ol>
                    <li>
                        Crosschain Fee is 0.02 %, Minimum Crosschain Fee is 0.9 USDT, Maximum Crosschain Fee is 1,000 USDT
                    </li>
                    <li>
                        Minimum Crosschain Amount is 10 USDT
                    </li>
                    <li>
                        Maximum Crosschain Amount is 5,000,000 USDT
                    </li>
                    <li>
                        Estimated Time of Crosschain Arrival is 10-30 min
                    </li>
                    <li>
                        Crosschain amount larger than 1,000,000 USDT could take up to 12 hours
                    </li>
                </ol>
            </section>
        </div>
    </main>
</template>
