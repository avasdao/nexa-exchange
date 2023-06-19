<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    cardName: 'String',
    imageUrl: 'String',
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
    <main>
        <div class="px-2 py-2 border-2 border-amber-300 shadow aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
            <img
                :src="imageUrl"
                :alt="cardName"
                class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
        </div>

        <section class="mt-2 px-3 flex flex-col">
            <h3 class="text-xl text-gray-700">
                {{cardName}}
            </h3>

            <div>
                <label for="price" class="block text-lg font-medium leading-6 text-gray-400 text-left">
                    Enter amount
                </label>
            </div>
        </section>

        <div class="relative mt-2 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-2xl text-gray-500">$</span>
            </div>

            <input
                type="text"
                name="price"
                id="price"
                class="block w-full rounded-md border-0 py-1.5 pl-10 pr-12 text-2xl text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                placeholder="1 - 2000"
                aria-describedby="price-currency"
            />

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span class="text-2xl text-gray-500" id="price-currency">USD</span>
            </div>
        </div>
    </main>
</template>
