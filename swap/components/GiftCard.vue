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

        <section class="mt-2 px-3">
            <h3 class="text-xl text-gray-700">
                {{cardName}}
            </h3>
        </section>
    </main>
</template>
