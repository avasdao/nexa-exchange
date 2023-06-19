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
    <main class="max-w-7xl mx-auto h-full px-3 py-5 flex flex-col items-start gap-5">
        <h1 class="text-5xl font-medium">
            Gifts
        </h1>

        <p class="">
            Purchase and spend gift cards from your favorite retailers all over the world.
            Card delivery takes a few seconds and is available immediately!
        </p>

        <section class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 class="sr-only">Products</h2>

                <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <a href="javascript://" class="group">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                                alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                class="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
                    </a>
                    <a href="javascript://" class="group">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg"
                                alt="Olive drab green insulated bottle with flared screw lid and flat top."
                                class="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Nomad Tumbler</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
                    </a>
                    <a href="javascript://" class="group">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg"
                                alt="Person using a pen to cross a task off a productivity paper card."
                                class="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Focus Paper Refill</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">$89</p>
                    </a>
                    <a href="javascript://" class="group">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg"
                                alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                                class="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Machined Mechanical Pencil</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
                    </a>

                    <!-- More products... -->
                </div>
            </div>
        </section>

    </main>
</template>
