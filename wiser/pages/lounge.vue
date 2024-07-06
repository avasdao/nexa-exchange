<script setup lang="ts">
useHead({
    title: `Lounge — WiserSwap`,
    meta: [
        { name: 'description', content: `An exclusive lounge area for Personas.` }
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
    <main class="max-w-6xl mx-auto px-3 py-5">
        <h1 class="text-5xl font-medium">
            Lounge
        </h1>

        <p>
            An exclusive lounge area for Personas.
        </p>

        <p>
            NOTE: The Lounge is highly recommended over the DEPRECATED Wallet.
        </p>
    </main>
</template>
