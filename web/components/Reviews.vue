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
    <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-16">
        <div class="lg:col-span-4">
            <h2 id="reviews-heading" class="text-2xl font-bold tracking-tight text-gray-900">
                Customer Reviews
            </h2>

            <div class="mt-3 flex items-center">
                <div>
                    <div class="flex items-center">
                        <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
                        <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        <svg class="h-5 w-5 flex-shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>

                    <p class="sr-only">
                        4 out of 5 stars
                    </p>
                </div>

                <p class="ml-2 text-sm text-gray-900">
                    Based on 24 reviews
                </p>
            </div>

            <div class="mt-6">
                <h3 class="sr-only">Review data</h3>

                <dl class="space-y-3">
                    <div class="flex items-center text-sm">
                        <dt class="flex flex-1 items-center">
                            <p class="w-3 font-medium text-gray-900">5<span class="sr-only"> star reviews</span></p>

                            <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                                <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>

                                <div class="relative ml-3 flex-1">
                                    <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                                    <div style="width: calc(1019 / 1624 * 100%);" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                                </div>
                            </div>
                        </dt>

                        <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            63%
                        </dd>
                    </div>

                    <div class="flex items-center text-sm">
                        <dt class="flex flex-1 items-center">
                            <p class="w-3 font-medium text-gray-900">4<span class="sr-only"> star reviews</span></p>

                            <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                                <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>

                                <div class="relative ml-3 flex-1">
                                    <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                                    <div style="width: calc(162 / 1624 * 100%);" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                                </div>
                            </div>
                        </dt>

                        <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            10%
                        </dd>
                    </div>

                    <div class="flex items-center text-sm">
                        <dt class="flex flex-1 items-center">
                            <p class="w-3 font-medium text-gray-900">3<span class="sr-only"> star reviews</span></p>

                            <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                                <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>

                                <div class="relative ml-3 flex-1">
                                    <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                                    <div style="width: calc(97 / 1624 * 100%);" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                                </div>
                            </div>
                        </dt>

                        <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            6%
                        </dd>
                    </div>

                    <div class="flex items-center text-sm">
                        <dt class="flex flex-1 items-center">
                            <p class="w-3 font-medium text-gray-900">2<span class="sr-only"> star reviews</span></p>

                            <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                                <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>

                                <div class="relative ml-3 flex-1">
                                    <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                                    <div style="width: calc(199 / 1624 * 100%);" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                                </div>
                            </div>
                        </dt>

                        <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            12%
                        </dd>
                    </div>

                    <div class="flex items-center text-sm">
                        <dt class="flex flex-1 items-center">
                            <p class="w-3 font-medium text-gray-900">1<span class="sr-only"> star reviews</span></p>

                            <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                                <svg class="h-5 w-5 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clip-rule="evenodd"
                                    />
                                </svg>

                                <div class="relative ml-3 flex-1">
                                    <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                                    <div style="width: calc(147 / 1624 * 100%);" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                                </div>
                            </div>
                        </dt>

                        <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            9%
                        </dd>
                    </div>
                </dl>
            </div>

            <div class="mt-10">
                <h3 class="text-lg font-medium text-gray-900">
                    Share your thoughts
                </h3>

                <p class="mt-1 text-sm text-gray-600">
                    If you've owned/used this asset, please share your thoughts with others.
                </p>

                <a href="javascript://" class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full">
                    Write a review
                </a>
            </div>
        </div>

        <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 class="sr-only">Recent reviews</h3>

            <div class="flow-root">
                <div class="-my-12 divide-y divide-gray-200">
                    <div class="py-12">
                        <div class="flex items-center">
                            <img src="https://i.ibb.co/bPDyFZ5/image.png" alt="Satoshi Nakamoto" class="h-12 w-12 rounded-full" />

                            <div class="ml-4">
                                <h4 class="text-sm font-bold text-gray-900">
                                    Satoshi Nakamoto
                                </h4>

                                <div class="mt-1 flex items-center">
                                    <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>

                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>

                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>

                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>

                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>

                                <p class="sr-only">5 out of 5 stars</p>
                            </div>
                        </div>

                        <div class="mt-4 space-y-6 text-base italic text-gray-600">
                            <p>
                                Damn! This is the token of my dreams.
                                I recently took everything I own out of $BTC and was able to move it into $NEXA.
                            </p>
                        </div>
                    </div>

                    <!-- More reviews... -->
                </div>
            </div>
        </div>
    </div>
</template>
