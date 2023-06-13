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

const tokenName = computed(() => {
    return tokenDetails.value?.name || 'Anon Token'
})

const tokenUrl = computed(() => {
    return tokenDetails.value?.document_url || '...'
})

onMounted(async () => {
    tokenDetails.value = await $fetch('/api/token/' + tokenid.value)
        .catch(err => console.error(err))
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="main-body flex-1 my-5 p-3 max-w-5xl mx-auto bg-gradient-to-r from-gray-100 to-gray-200 border-4 border-indigo-500 rounded-xl shadow-md">
        <h1 class="text-4xl font-medium">
            {{tokenName}}
        </h1>

        <NuxtLink :to="tokenUrl" target="_blank" class="text-blue-500 font-medium hover:underline">
            {{tokenUrl}}
        </NuxtLink>

        <p class="mt-3">
            {{tokenid}}
        </p>

        <pre>{{tokenDetails}}</pre>

        <pre>{{jsonDoc}}</pre>
    </main>
</template>
