<script setup lang="ts">
useHead({
    title: `Swap — WiserSwap`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
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
    <main class="w-screen grid grid-cols-1 lg:grid-cols-7 gap-20 overflow-hidden bg-gradient-to-b from-yellow-500 to-yellow-800">
        <section class="w-full lg:col-span-4 bg-lime-50 flex justify-center items-center position">
            <div class="p-10 bg-lime-50 border-2 border-lime-200 rounded-2xl shadow-md">
                <ChartTest />
            </div>
        </section>

        <section class="lg:col-span-3 order-first lg:order-none">
            <SwapWindow />
        </section>
    </main>

    <!-- NO FOOTER -->
</template>
