<script setup>
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

onBeforeMount(() => {
    System.$state = JSON.parse(localStorage.getItem('system'))
})

watch(System.$state, (_state) => {
    localStorage.setItem('system', JSON.stringify(_state))
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
    <main class="w-screen h-screen grid lg:grid-cols-2 lg:divide-x-4 divide-amber-300">
        <section>
            <MobileHeader />
            <DesktopAside />
        </section>

        <slot />
    </main>
</template>
