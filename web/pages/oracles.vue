<script setup lang="ts">
useHead({
    title: 'Price Oracles — Nexa Exchange',
    meta: [
        { name: 'description', content: 'Nexa Exchange.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const usd = ref(null)


const init = async () => {
    usd.value = await $fetch('https://nexa.exchange/mex')
        .catch(err => console.error(err))
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            Nexa Price Oracles
        </h1>

        <p>
            A list of ALL supported asset pairs.
        </p>

        <h2 class="text-3xl font-bold">Fiat Currencies<h2>

        <ol class="pl-10">
            <li>mNEXA / USD — {{usd}}</li>
            <li>mNEXA / EUR</li>
            <li>mNEXA / CNY</li>
            <li>mNEXA / TRY</li>
        </ol>

        <hr />

        <h2 class="text-3xl font-bold">Precious Metals<h2>

        <ol class="pl-10">
            <li>mNEXA / XAU</li>
            <li>mNEXA / XAG</li>
        </ol>
    </main>

    <AppFooter />
</template>
