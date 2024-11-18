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
            imageUrl="https://i.ibb.co/6ZcstL7/image.png"
        />

        <p class="p-3 text-gray-500">
            Sorry, this card is not yet available in your area/region.
            Please check back soon.
        </p>

        <button disabled class="px-3 py-2 text-xl text-blue-900 font-medium bg-blue-300 border-2 border-blue-500 rounded-lg shadow hover:bg-blue-200">
            Purchase Card
        </button>
    </main>
</template>
