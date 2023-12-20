<script setup lang="ts">
useHead({
    title: 'Oracles — Nexa Exchange',
    meta: [
        { name: 'description', content: 'Accountable and verifiable price & data oracles.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const oracles = ref()

const dataOracles = computed(() => {
    return oracles.value
})

const priceOracles = computed(() => {
    return oracles.value
})

onMounted(() => {
    oracles.value = []

    oracles.value.push({
        id: '518cd288-0d58-44e0-8262-cbde23fa4dd0',
        name: 'NEXA / USD₮',
        quote: '0.000009988800',
        decimals: 12,
    })
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <div class="bg-white">
        <Header />

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
                    <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                        <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                            <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    A premium <span class="text-7xl text-amber-400 italic font-light">Builder Experience</span> ideal for Noob thru Full-stack
                                </h1>

                                <p class="relative mt-6 text-2xl leading-8 font-light text-gray-600 sm:max-w-md lg:max-w-none">
                                    It DOES NOT matter what your experience level is coming in; our community is ready, willing and able to prepare you for a journey of a lifetime.
                                </p>

                                <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                    Nexa Studio presents a premium Builder Experience (BX) that will leave you speechless.
                                </p>

                                <p class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                    Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. Et labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt mollit id
                                    pariatur in voluptate cillum. Eu voluptate tempor esse minim amet fugiat veniam occaecat aliqua.
                                </p>
                            </div>

                            <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                    <div class="relative">
                                        <img
                                            src="https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1863&q=80"
                                            alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                    </div>
                                </div>
                                <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                    <div class="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
                                            alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                    </div>
                                    <div class="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1530977875151-aae9742fde19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
                                            alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                    </div>
                                </div>
                                <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                    <div class="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80"
                                            alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                    </div>
                                    <div class="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
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
            <div class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
                <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                    <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                        <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
                            <p class="text-xl leading-8 text-gray-600">
                                Nexa offers a premium Builder Experience (BX) that favors rapid iterations to get you deployed as quickly as possible.
                            </p>

                            <div class="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                <p>
                                    The Nexa community offers ample examples to help you get started quickly using the industry's best practices.
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                </p>

                                <p class="mt-10">
                                    Nexa offers excellent documentation that offers modern and up-to-date guides and tutorials for anything and everything you need.
                                    Beatae ut illum suscipit excepturi reprehenderit omnis, eius laudantium dolorum possimus animi cupiditate libero? Non illum, veritatis nemo quis hic ut? Officiis?
                                </p>
                            </div>
                        </div>

                        <div class="lg:flex lg:flex-auto lg:justify-center">
                            <dl class="w-64 space-y-8 xl:w-80">
                                <div class="flex flex-col-reverse gap-y-4">
                                    <dt class="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
                                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">44 million</dd>
                                </div>

                                <div class="flex flex-col-reverse gap-y-4">
                                    <dt class="text-base leading-7 text-gray-600">Assets under holding</dt>
                                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">$119 trillion</dd>
                                </div>

                                <div class="flex flex-col-reverse gap-y-4">
                                    <dt class="text-base leading-7 text-gray-600">New users annually</dt>
                                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">46,000</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Logo cloud -->
            <div class="relative isolate -z-10 mt-32 sm:mt-48">
                <div class="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                    <svg class="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
                        <defs>
                            <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="200" height="200" x="50%" y="50%" patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y="50%" class="overflow-visible fill-gray-50">
                            <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" stroke-width="0" />
                        </svg>
                        <rect width="100%" height="100%" stroke-width="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" />
                    </svg>
                </div>
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">Trusted by the world’s most innovative teams</h2>
                    <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48" />
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48" />
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48" />
                        <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48" />
                        <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48" />
                    </div>
                </div>
            </div>

            <div class="w-full my-20 h-1 bg-gray-500" />

            <ul role="list" class="mx-auto mt-32 max-w-7xl px-6 lg:px-8 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">

                <li v-for="oracle of priceOracles" :key="oracle.id" class="overflow-hidden rounded-xl border border-gray-200">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img src="https://tailwindui.com/img/logos/48x48/tuple.svg" alt="Tuple" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div class="text-xl font-medium leading-6 text-gray-900">
                            {{oracle.name}}
                        </div>
                    </div>

                    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-lg text-gray-500">
                                Last Quote
                            </dt>

                            <dd class="flex items-start gap-x-2">
                                <div class="text-lg font-medium text-gray-900">
                                    {{oracle.quote}}
                                </div>
                                <!-- <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10">Overdue</div> -->
                            </dd>
                        </div>

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-base text-gray-500">
                                Precision
                            </dt>

                            <dd class="text-base text-gray-700">
                                {{oracle.decimals}} decimals
                            </dd>
                        </div>

                    </dl>
                </li>

                <li class="overflow-hidden rounded-xl border border-gray-200">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img src="https://tailwindui.com/img/logos/48x48/savvycal.svg" alt="SavvyCal" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div class="text-xl font-medium leading-6 text-gray-900">
                            NEXA / BTC
                        </div>
                    </div>

                    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Last invoice</dt>
                            <dd class="text-gray-700"><time datetime="2023-01-22">January 22, 2023</time></dd>
                        </div>

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Amount</dt>
                            <dd class="flex items-start gap-x-2">
                                <div class="font-medium text-gray-900">$14,000.00</div>
                                <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">Paid</div>
                            </dd>
                        </div>
                    </dl>
                </li>

                <li class="overflow-hidden rounded-xl border border-gray-200">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img src="https://tailwindui.com/img/logos/48x48/reform.svg" alt="Reform" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div class="text-xl font-medium leading-6 text-gray-900">
                            NEXA / BCH
                        </div>
                    </div>

                    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Last invoice</dt>
                            <dd class="text-gray-700"><time datetime="2023-01-23">January 23, 2023</time></dd>
                        </div>

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Amount</dt>
                            <dd class="flex items-start gap-x-2">
                                <div class="font-medium text-gray-900">$7,600.00</div>
                                <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">Paid</div>
                            </dd>
                        </div>
                    </dl>
                </li>
            </ul>

            <div class="w-full my-20 h-1 bg-gray-500" />

            <ul role="list" class="mx-auto mt-32 max-w-7xl px-6 lg:px-8 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">

                <li v-for="oracle of dataOracles" :key="oracle.id" class="overflow-hidden rounded-xl border border-gray-200">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img src="https://tailwindui.com/img/logos/48x48/tuple.svg" alt="Tuple" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div class="text-xl font-medium leading-6 text-gray-900">
                            {{oracle.name}}
                        </div>
                    </div>

                    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-lg text-gray-500">
                                Last Quote
                            </dt>

                            <dd class="flex items-start gap-x-2">
                                <div class="text-lg font-medium text-gray-900">
                                    {{oracle.quote}}
                                </div>
                                <!-- <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10">Overdue</div> -->
                            </dd>
                        </div>

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-base text-gray-500">
                                Precision
                            </dt>

                            <dd class="text-base text-gray-700">
                                {{oracle.decimals}} decimals
                            </dd>
                        </div>

                    </dl>
                </li>

                <li class="overflow-hidden rounded-xl border border-gray-200">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img src="https://tailwindui.com/img/logos/48x48/savvycal.svg" alt="SavvyCal" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div class="text-xl font-medium leading-6 text-gray-900">
                            NEXA / BTC
                        </div>
                    </div>

                    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Last invoice</dt>
                            <dd class="text-gray-700"><time datetime="2023-01-22">January 22, 2023</time></dd>
                        </div>

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Amount</dt>
                            <dd class="flex items-start gap-x-2">
                                <div class="font-medium text-gray-900">$14,000.00</div>
                                <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">Paid</div>
                            </dd>
                        </div>
                    </dl>
                </li>

                <li class="overflow-hidden rounded-xl border border-gray-200">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img src="https://tailwindui.com/img/logos/48x48/reform.svg" alt="Reform" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div class="text-xl font-medium leading-6 text-gray-900">
                            NEXA / BCH
                        </div>
                    </div>

                    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Last invoice</dt>
                            <dd class="text-gray-700"><time datetime="2023-01-23">January 23, 2023</time></dd>
                        </div>

                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Amount</dt>
                            <dd class="flex items-start gap-x-2">
                                <div class="font-medium text-gray-900">$7,600.00</div>
                                <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">Paid</div>
                            </dd>
                        </div>
                    </dl>
                </li>
            </ul>

        </main>
    </div>

    <Footer />
</template>
