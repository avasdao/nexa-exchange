<script setup>
/* Initialize stores. */
import { useSwapStore } from '@/stores/swap'
import { useSystemStore } from '@/stores/system'
const Swap = useSwapStore()
const System = useSystemStore()

onBeforeMount(() => {
    Swap.$state = JSON.parse(localStorage.getItem('swap'))
    System.$state = JSON.parse(localStorage.getItem('system'))
})

watch([Swap.$state, System.$state], (_state) => {
    localStorage.setItem('swap', JSON.stringify(_state[0]))
    localStorage.setItem('system', JSON.stringify(_state[1]))
})

onMounted(() => {
    /* Initialize system. */
    System.init()
})

onBeforeUnmount(() => {
    /* Cleanup system. */
    System.cleanup()
})
</script>

<template>
    <main class="w-screen h-screen flex flex-col lg:grid lg:grid-cols-2 lg:divide-x-4 divide-amber-300">
        <section>
            <MobileHeader />
            <DesktopAside />
        </section>

        <slot />
    </main>
</template>
