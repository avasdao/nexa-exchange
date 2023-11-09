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
    <main class="py-10 max-w-6xl mx-auto flex flex-row">
        <section class="flex flex-col gap-5 flex-1 justify-center items-center">
            [ NAV CONTROLS HERE ]

            <div class="p-10 flex flex-col gap-3 bg-lime-50 border-2 border-lime-200 rounded-2xl shadow-md">
                <ChartTest />

                <div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, magni quos fugit, doloribus nesciunt dignissimos neque eveniet corporis nam ullam, tempore assumenda possimus delectus aut reprehenderit voluptatum! Commodi, distinctio molestiae?
                </div>
            </div>

            <SwapHistory />
        </section>

        <section class="w-[500px] order-first lg:order-none">
            <SwapWindow />
        </section>
    </main>

    <!-- NO FOOTER -->
</template>
