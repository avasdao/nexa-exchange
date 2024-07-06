<script setup lang="ts">
useHead({
    title: 'Market Cap — Nexa Exchange',
    meta: [
        { name: 'description', content: 'Nexa Exchange.' }
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
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            Market Cap
        </h1>

        <p class="my-10 text-xl">
            Nexa Exchange provides a real-time Market Cap of the Nexa market data.
        </p>

        <div class="border-l-4 border-rose-400 bg-rose-50 p-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-10 w-auto text-rose-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>

                <div class="ml-3">
                    <p class="text-2xl font-medium text-rose-700">
                        NOTE: System MCAP has been moved to <NuxtLink to="/_price" class="text-3xl font-bold">/_mcap</NuxtLink>
                    </p>
                </div>
            </div>
        </div>

    </main>

    <AppFooter />
</template>
