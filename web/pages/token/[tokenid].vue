<script setup>
const tokenid = ref(null)
const tokenDetails = ref(null)
const docUrl = ref(null)
const jsonDoc = ref(null)

/* Initialize route. */
const route = useRoute()
// console.log('ROUTE', route)

/* Set (route) path. */
tokenid.value = route?.params.tokenid
console.log('TOKEN ID', tokenid.value)

const tokenDoc = ref(null)
const isShowingGallery = ref(false)

const tokenName = computed(() => {
    return tokenDetails.value?.name || ''
})

const tokenTicker = computed(() => {
    return tokenDetails.value?.ticker || ''
})

const tokenUrl = computed(() => {
    if (!tokenDetails.value) {
        return null
    }

    return tokenDetails.value?.document_url || null
})

const tokenIcon = computed(() => {
    if (tokenUrl.value && tokenDoc.value) {
        const url = new URL(tokenUrl.value)
        // console.log('URL', url)

        return url.origin + tokenDoc.value?.[0].icon
    }

    return tokenDoc.value?.[0].icon || null
})

onMounted(async () => {
    let docUrl

    tokenDetails.value = await $fetch('/api/token/' + tokenid.value)
        .catch(err => console.error(err))
    console.log('TOKEN DETAILS', tokenDetails.value)

    if (tokenDetails.value?.document_url) {
        docUrl = tokenDetails.value.document_url
        // console.log('DOC URL', docUrl)

        if (docUrl.slice(0, 5) === 'https') {
            // console.log('docUrl HELP', docUrl)
            tokenDoc.value = await $fetch(docUrl)
                .catch(err => console.error(err))
            // console.log('DOC', tokenDoc.value)
        }
    }

})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">

            <!-- Product -->
            <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

                <!-- Image gallery -->
                <div class="flex flex-col-reverse">

                    <!-- Image selector -->
                    <div v-if="isShowingGallery" class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                        <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                            <button
                                id="tabs-2-tab-1"
                                class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                aria-controls="tabs-2-panel-1"
                                role="tab"
                                type="button"
                            >
                                <span class="sr-only">Angled view</span>
                                <span class="absolute inset-0 overflow-hidden rounded-md">
                                    <div v-if="tokenIcon?.slice(0, 4) === 'http'" class="flex justify-center">
                                        <img :src="tokenIcon" class="w-2/3 lg:w-1/2" />
                                    </div>
                                    <span v-else class="">
                                        {{tokenIcon}}
                                    </span>

                                </span>
                                <!-- Selected: "ring-indigo-500", Not Selected: "ring-transparent" -->
                                <span class="ring-transparent pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2" aria-hidden="true"></span>
                            </button>

                            <!-- More images... -->
                        </div>
                    </div>

                    <div class="mt-8 sm:mt-0 aspect-h-1 aspect-w-1 w-full">
                        <!-- Tab panel, show/hide based on tab state. -->
                        <div id="tabs-2-panel-1" aria-labelledby="tabs-2-tab-1" role="tabpanel" tabindex="0">
                            <div v-if="tokenIcon?.slice(0, 4) === 'http'" class="flex justify-center">
                                <img :src="tokenIcon" class="w-2/3 lg:w-1/2" />
                            </div>
                            <span v-else class="">
                                {{tokenIcon}}
                            </span>
                        </div>

                        <!-- More images... -->
                    </div>
                </div>

                <!-- Product info -->
                <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 class="text-5xl font-bold tracking-tight text-gray-900">
                        {{tokenName}}
                    </h1>

                    <div class="mt-3">
                        <h2 class="sr-only">Token information</h2>

                        <p class="text-3xl tracking-tight text-gray-900">
                            ${{tokenTicker}}
                        </p>
                    </div>

                    <!-- Reviews -->
                    <div class="mt-3">
                        <h3 class="sr-only">Reviews</h3>
                        <div class="flex items-center">
                            <div class="flex items-center">
                                <!-- Active: "text-indigo-500", Inactive: "text-gray-300" -->
                                <svg class="h-5 w-5 flex-shrink-0 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <svg class="h-5 w-5 flex-shrink-0 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <svg class="h-5 w-5 flex-shrink-0 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <svg class="h-5 w-5 flex-shrink-0 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <svg class="h-5 w-5 flex-shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p class="sr-only">4 out of 5 stars</p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3 class="sr-only">Description</h3>

                        <h3 class="pl-3 pr-10 text-xl font-bold leading-6 border-l-4 border-amber-500">
                            {{tokenDoc?.[0].summary}}
                        </h3>

                        <div class="mt-3 pr-5 space-y-6 text-base text-gray-700">
                            <p>
                                {{tokenDoc?.[0].description}}
                            </p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <!-- Market -->
                        <section>
                            <h3 class="text-2xl font-medium text-gray-500">
                                Avg Market Price
                            </h3>

                            <h3 class="text-5xl font-bold text-indigo-600">
                                $0.33<span class="text-2xl text-indigo-400">8880</span>

                                <span class="ml-2 text-base">per ${{tokenTicker}}</span>
                            </h3>
                        </section>

                        <div class="mt-10 flex">
                            <a
                                href="javascript:alert('coming soon...')"
                                class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-3xl uppercase font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                            >
                                Buy ${{tokenTicker}}
                            </a>

                            <a href="javascript:alert('Please sign in first.')" class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                <svg class="h-10 w-10 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                    />
                                </svg>
                                <span class="sr-only">Add to favorites</span>
                            </a>
                        </div>
                    </div>

                    <section aria-labelledby="details-heading" class="mt-12">
                        <h2 id="details-heading" class="sr-only">Additional details</h2>

                        <div class="divide-y divide-gray-200 border-t">
                            <div>
                                <h3>
                                    <!-- Expand/collapse question button -->
                                    <button type="button" class="group relative flex w-full items-center justify-between py-6 text-left" aria-controls="disclosure-1" aria-expanded="false">
                                        <!-- Open: "text-indigo-600", Closed: "text-gray-900" -->
                                        <span class="text-gray-900 text-lg font-medium">
                                            Token Document
                                        </span>

                                        <span class="ml-6 flex items-center">
                                            <!-- Open: "hidden", Closed: "block" -->
                                            <svg class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <!-- Open: "block", Closed: "hidden" -->
                                            <svg class="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                            </svg>
                                        </span>
                                    </button>
                                </h3>

                                <div class="prose prose-sm pb-6" id="disclosure-1">
                                    <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 bg-sky-100">
                                        <div class="px-2 py-1 text-sm text-sky-900 font-medium text-center sm:text-right bg-sky-200">
                                            Document URL
                                        </div>
                                        <NuxtLink :to="tokenUrl" target="_blank" class="text-sm text-sky-900 font-medium text-center sm:text-left group px-2 py-1 col-span-1 sm:col-span-2 bg-sky-200 hover:bg-sky-300">
                                            {{tokenUrl}}

                                            <svg class="inline ml-2 w-3 h-auto group-hover:w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                                            </svg>
                                        </NuxtLink>
                                    </div>


                                    <ul role="list">
                                        <li>Multiple strap configurations</li>
                                        <li>Spacious interior with top zip</li>
                                        <li>Leather handle and tabs</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- More sections... -->
                        </div>
                    </section>
                </div>
            </div>

        </div>
    </main>

    <Reviews />



    <main class="main-body flex-1 my-5 p-3 max-w-5xl mx-auto bg-gradient-to-r from-gray-100 to-gray-200 lg:border-4 border-indigo-500 lg:rounded-xl lg:shadow-md">
        <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-100">

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Token Group
            </div>
            <div class="px-3 py-2 col-span-1 sm:col-span-2 bg-amber-200 truncate">
                {{tokenDetails?.group}}
            </div>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Token ID
            </div>
            <div class="px-3 py-2 col-span-1 sm:col-span-2 bg-amber-200 truncate">
                {{tokenid}}
            </div>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Document Hash
            </div>
            <div class="px-3 py-2 col-span-1 sm:col-span-2 bg-amber-200 truncate">
                {{tokenDetails?.document_hash}}
            </div>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Genesis Block Height
            </div>
            <NuxtLink :to="'https://explorer.nexa.org/block-height/' + tokenDetails?.height" target="_blank" class="group px-3 py-2 col-span-1 sm:col-span-2 bg-amber-200 hover:bg-amber-300">
                {{tokenDetails?.height}}

                <svg class="inline ml-2 w-4 h-auto group-hover:w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                </svg>
            </NuxtLink>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Genesis Transaction
            </div>
            <NuxtLink :to="'https://explorer.nexa.org/tx/' + tokenDetails?.txidem" target="_blank" class="group px-3 py-2 col-span-1 sm:col-span-2 bg-amber-200 hover:bg-amber-300 truncate">
                {{tokenDetails?.txidem}}

                <svg class="inline ml-2 w-4 h-auto group-hover:w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                </svg>
            </NuxtLink>
        </div>

        <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-100">

            <div v-if="tokenDoc?.[0].legal" class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Legal
            </div>
            <div v-if="tokenDoc?.[0].legal" class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200">
                {{tokenDoc[0].legal}}
            </div>

            <div v-if="tokenDoc?.[0].category" class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Category
            </div>
            <div v-if="tokenDoc?.[0].category" class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200">
                {{tokenDoc[0].category}}
            </div>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Creator
            </div>
            <div class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200">
                {{tokenDoc?.[0].creator}}
            </div>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Contact
            </div>
            <pre class="lg:hidden px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200 text-xs truncate">{{JSON.stringify(tokenDoc?.[0].contact, null, 2)}}</pre>
            <pre class="hidden lg:block px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200 text-sm">{{JSON.stringify(tokenDoc?.[0].contact, null, 2)}}</pre>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Document Signature
            </div>
            <div class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200 text-xs truncate">
                {{tokenDoc?.[1]}}
            </div>
        </div>

    </main>

</template>
