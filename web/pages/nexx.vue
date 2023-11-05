<script setup lang="ts">
useHead({
    title: '$NEXX Tokenomics — Nexa Exchange',
    meta: [
        { name: 'description', content: 'Nexa Exchange.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
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
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            $NEXX Tokenomics
        </h1>

        <p>
            The "official" token for Nexa Exchange.
        </p>

        <ol class="pl-10">
            <li>Governance voting</li>
            <li>Daily stream payouts</li>
        </ol>
    </main>

    <AppFooter />
</template>
