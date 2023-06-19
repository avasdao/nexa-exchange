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

        <p class="">
            Purchase and spend gift cards from your favorite retailers all over the world.
            Card delivery takes a few seconds and is available immediately!
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

                    <button>
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg"
                                alt="Olive drab green insulated bottle with flared screw lid and flat top."
                                class="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>

                        <h3 class="mt-4 text-sm text-gray-700">
                            Walmart
                        </h3>

                        <p class="mt-1 text-lg font-medium text-gray-900">
                            $35
                        </p>
                    </button>

                    <button>
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg"
                                alt="Person using a pen to cross a task off a productivity paper card."
                                class="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>

                        <h3 class="mt-4 text-sm text-gray-700">
                            Uber
                        </h3>

                        <p class="mt-1 text-lg font-medium text-gray-900">
                            $89
                        </p>
                    </button>

                    <NuxtLink to="/gifts/mastercard">
                        <GiftCard
                            cardName="Mastercard"
                            imageUrl="https://i.ibb.co/68w6MYH/image.png"
                        />
                    </NuxtLink>
                </div>
            </div>
        </section>

    </main>
</template>
