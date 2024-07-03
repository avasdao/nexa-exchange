<script setup lang="ts">
useHead({
    title: `$NXL — Nexa Exchange Loyalty`,
    meta: [
        { name: 'description', content: `Investors burn $NXL to pay exchange fees and/or stake $NXL to activate premium tools & services, featuring: real-time market insights, exclusive alpha metrics & security assessments, plus priority access to Ava's world-class support team.` }
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
    <main class="isolate">
        <!-- Hero section -->
        <div class="relative isolate -z-10">
            <svg class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]" aria-hidden="true">
                <defs>
                    <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
                    <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
                </svg>
                <rect width="100%" height="100%" stroke-width="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
            </svg>
            <div class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
                <div
                    class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    style="
                        clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%);
                    "
                ></div>
            </div>
            <div class="overflow-hidden">
                <div class="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-32 lg:px-8 lg:pt-16">
                    <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                        <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                $NXL
                            </h1>

                            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                Official burning &amp; staking token of Nexa Exchange.
                            </p>

                            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                Investors burn $NXL to pay exchange fees and/or stake $NXL to activate premium tools & services, featuring: real-time market insights, exclusive alpha metrics & security assessments, plus priority access to Ava's world-class support team.
                            </p>

                            <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                Each token is equal to one vote in ALL "official" Nexa Exchange DAO quorums.
                            </p>
                        </div>

                        <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                            <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1584044283481-9b18070011e1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                            <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1579225663317-c0251b4369bc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                                <div class="relative">
                                    <img
                                        src="https://plus.unsplash.com/premium_photo-1683749808421-bf411cb88f20?q=80&w=1713&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                            <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1621264448270-9ef00e88a935?q=80&w=1857&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                                <div class="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1632507127789-eb70cc8757af?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                                        alt=""
                                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                    />
                                    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content section -->
        <div class="mx-auto -mt-12 max-w-7xl sm:mt-0 xl:-mt-8">

            <div class="px-3 sm:px-10 py-5">
                <h2 class="my-5 text-4xl sm:text-5xl font-medium text-center">
                    Token Details
                </h2>

                <ul class="mt-2 flex flex-col gap-8 leading-6 sm:leading-8">

                    <li class="flex items-center">
                        <NuxtLink
                            class="px-3 py-2 w-full flex flex-col items-center bg-blue-300 border-2 border-blue-500 rounded-lg shadow hover:bg-blue-200"
                            to="https://nexa.exchange/token/a15c9e7e68170259fd31bc26610b542625c57e13fdccb5f3e1cb7fb03a420000"
                            target="_blank"
                        >
                            <h3 class="text-sm sm:text-lg text-blue-700 font-medium uppercase">
                                Token ID
                            </h3>

                            <span class="sm:hidden text-lg">
                                tztnyazksgqpk...pqqqq99lxywr8
                                tzs4e8n7dqtsy...ggqqqdrypc4ea
                            </span>
                            <span class="hidden sm:block lg:hidden text-lg">
                                tztnyazksgqpkphrx2m2fgxa...7xtlc8k4xcjpqqqq99lxywr8
                                tzs4e8n7dqtsyk0axx7zvcgt...d0nu89hlvp6ggqqqdrypc4ea
                            </span>
                            <span class="hidden lg:block text-xl">
                                nexa:tzs4e8n7dqtsyk0axx7zvcgt2snzt3t7z07ued0nu89hlvp6ggqqqdrypc4ea
                            </span>

                        </NuxtLink>
                    </li>

                    <li>
                        <div class="px-3 py-2 w-full flex flex-col items-center bg-amber-200 border-2 border-amber-400 rounded-lg shadow">
                            <h3 class="text-sm text-amber-700 font-medium uppercase">
                                Max Token Supply
                            </h3>

                            <h3 class="text-3xl font-medium">
                                Unlimited
                            </h3>
                        </div>
                    </li>
                </ul>

            </div>

        </div>

        <section class="bg-white py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <div>
                        <time datetime="2021-08" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Winter 2023
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            WiserSwap DEX Integration
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            Holiday airdrops followed by a full integration with <NuxtLink to="https://wiserswap.com" target="_blank" class="text-blue-500 font-medium hover:underline">WiserSwap DEX</NuxtLink> will establish this asset's new digital life.
                        </p>
                    </div>

                    <div>
                        <time datetime="2021-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Fall 2024
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            FULL Platform Launch
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            A <NuxtLink to="https://app.nexa.exchange" target="_blank" class="text-blue-500 font-medium hover:underline">comprehensive platform</NuxtLink> for professional traders to optimize their investment strategies around $NEXA.
                        </p>
                    </div>

                    <div>
                        <time datetime="2022-02" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Spring 2025
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            Asset-backed Stablecoin
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            Introducing a collateralized stablecoin allows for whole new world of advanced DeFi applications.
                        </p>
                    </div>

                    <div>
                        <time datetime="2022-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Summer 2025
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            Permissionless Lending
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            Allow HODLers to borrow stablecoins against their UTXO assets from a decentralized pool of lenders.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    </main>
</template>
