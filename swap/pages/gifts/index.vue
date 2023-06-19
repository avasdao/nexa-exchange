<script setup lang="ts">
useHead({
    title: 'Gifts — Nexa Swap',
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
        <h1 class="text-5xl font-medium">
            Gifts
        </h1>

        <p class="text-gray-600">
            Instantly purchase the gift card(s) of your favorite retailers from all over the world.
            Card delivery takes a few seconds and is available to spend immediately!
        </p>

        <section class="bg-white">
            <div class="mx-auto max-w-2xl py-8">
                <h2 class="sr-only">Products</h2>

                <div class="grid grid-cols-1 gap-x-6 gap-y-10">
                    <NuxtLink to="/gifts/amazon">
                        <GiftCard
                            cardName="Amazon.com Gift Card"
                            imageUrl="https://i.ibb.co/6ZcstL7/image.png"
                        />
                    </NuxtLink>

                    <NuxtLink to="/gifts/walmart">
                        <GiftCard
                            cardName="Walmart"
                            imageUrl="https://i.ibb.co/HrjJwZX/image.png"
                        />
                    </NuxtLink>

                    <NuxtLink to="/gifts/mastercard">
                        <GiftCard
                            cardName="Mastercard"
                            imageUrl="https://i.ibb.co/68w6MYH/image.png"
                        />
                    </NuxtLink>

                    <NuxtLink to="/gifts/uber">
                        <GiftCard
                            cardName="Uber"
                            imageUrl="https://i.ibb.co/9Y7987y/image.png"
                        />
                    </NuxtLink>
                </div>
            </div>
        </section>

    </main>
</template>
