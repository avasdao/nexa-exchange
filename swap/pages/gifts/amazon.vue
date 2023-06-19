<script setup lang="ts">
useHead({
    title: 'Amazon.com Gift Card — Nexa Swap',
    meta: [
        { name: 'description', content: 'Purchase gifts for yourself and others using your $NEXA assets.' }
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
    <main class="max-w-7xl mx-auto h-full px-3 py-5 flex flex-col gap-5">
        <h1 class="text-4xl font-medium">
            Amazon.com Gift Card
        </h1>

        <GiftCardOrder
            cardName="Amazon.com Gift Card"
        />

        <p class="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur est ipsam hic saepe cupiditate id eius sapiente quam? Nostrum voluptatibus fugiat maiores ab inventore adipisci modi saepe nobis facere esse.
        </p>
    </main>
</template>
