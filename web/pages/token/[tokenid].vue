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

const tokenName = computed(() => {
    return tokenDetails.value?.name || 'Anon Token'
})

const tokenTicker = computed(() => {
    return tokenDetails.value?.ticker || 'ANON'
})

const tokenUrl = computed(() => {
    if (!tokenDetails.value) {
        return null
    }

    return tokenDetails.value?.document_url || '...'
})

const tokenIcon = computed(() => {
    if (tokenUrl.value) {
        const url = new URL(tokenUrl.value)
        // console.log('URL', url)

        return url.origin + tokenDoc.value?.[0].icon
    }

    return tokenDoc.value?.[0].icon || 'no icon'
})

onMounted(async () => {
    let docUrl

    tokenDetails.value = await $fetch('/api/token/' + tokenid.value)
        .catch(err => console.error(err))
    // console.log('TOKEN DETAILS', tokenDetails.value)

    if (tokenDetails.value?.document_url) {
        docUrl = tokenDetails.value.document_url
        // console.log('DOC URL', docUrl)

        if (docUrl.slice(0, 5) === 'https') {
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
    <main class="main-body flex-1 my-5 p-3 max-w-5xl mx-auto bg-gradient-to-r from-gray-100 to-gray-200 lg:border-4 border-indigo-500 lg:rounded-xl lg:shadow-md">
        <header class="flex flex-col items-center">
            <h1 class="text-6xl font-medium tracking-tighter">
                {{tokenName}}
            </h1>

            <h1 class="text-4xl font-medium tracking-widest uppercase">
                ${{tokenTicker}}
            </h1>

            <!-- <NuxtLink :to="tokenUrl" target="_blank" class="text-xl text-blue-500 font-medium hover:underline">
                {{tokenUrl}}
            </NuxtLink> -->
        </header>

        <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-100">
            <!-- <pre class="col-span-3 text-xs">{{tokenDetails}}</pre> -->

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Document URL
            </div>
            <NuxtLink :to="tokenUrl" target="_blank" class="group px-3 py-2 col-span-1 sm:col-span-2 bg-amber-200 hover:bg-amber-300">
                {{tokenUrl}}

                <svg class="inline ml-2 w-4 h-auto group-hover:w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                </svg>
            </NuxtLink>

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
            <!-- <pre class="col-span-3 text-xs">{{tokenDoc}}</pre> -->

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Summary
            </div>
            <div class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200">
                {{tokenDoc?.[0].summary}}
            </div>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Description
            </div>
            <div class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200">
                {{tokenDoc?.[0].description}}
            </div>

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
                Icon
            </div>
            <div class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200">
                <div v-if="tokenIcon?.slice(0, 4) === 'http'" class="flex justify-center">
                    <img :src="tokenIcon" class="w-2/3 lg:w-1/2" />
                </div>
                <span v-else class="">
                    {{tokenIcon}}
                </span>
            </div>

            <div class="px-3 py-2 text-center sm:text-right bg-amber-200">
                Document Signature
            </div>
            <div class="px-3 py-2 grid-cols-1 sm:col-span-2 bg-amber-200 text-xs truncate">
                {{tokenDoc?.[1]}}
            </div>
        </div>

    </main>
</template>
