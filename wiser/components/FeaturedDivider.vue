<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

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
    <main class="bg-white">
        <div class="overflow-hidden pt-32 sm:pt-14">
            <div class="bg-gray-800">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="relative pb-16 pt-48 sm:pb-24">
                        <div>
                            <h2 id="sale-heading" class="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                Final Stock.
                                <br />
                                Up to 50% off.
                            </h2>
                            <div class="mt-6 text-base">
                                <a href="#" class="font-semibold text-white">
                                    Shop the sale
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>
                        </div>

                        <div class="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                            <div class="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                                <div class="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                    <div class="flex-shrink-0">
                                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72" src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg" alt="" />
                                    </div>

                                    <div class="mt-6 flex-shrink-0 sm:mt-0">
                                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72" src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg" alt="" />
                                    </div>
                                </div>
                                <div class="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                    <div class="flex-shrink-0">
                                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72" src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg" alt="" />
                                    </div>

                                    <div class="mt-6 flex-shrink-0 sm:mt-0">
                                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72" src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg" alt="" />
                                    </div>
                                </div>
                                <div class="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                    <div class="flex-shrink-0">
                                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72" src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg" alt="" />
                                    </div>

                                    <div class="mt-6 flex-shrink-0 sm:mt-0">
                                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72" src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
