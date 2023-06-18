<script setup lang="ts">
useHead({
    title: 'Nexa Exchange — Your Keys. Your Coins.',
    meta: [
        { name: 'description', content: 'Your #1 source for Nexa asset exchange.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

onBeforeMount(() => {
    System.$state = JSON.parse(localStorage.getItem('system'))
    // add additional states here...
})

watch(System.$state, (_state) => {
    localStorage.setItem('system', JSON.stringify(_state))
})
// watch additional states here...

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
    <main class="min-h-full">
        <AppHeader />
        <slot />
        <AppFooter />
    </main>
</template>
