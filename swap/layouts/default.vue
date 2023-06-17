<script setup>
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



/* Set API endpoint. */
const API_ENDPOINT = 'https://nexa.exchange/ticker'

// let quote = ref(0)
let displayQuote = ref(null)
let priceChg24h = ref(null)
let vol24h = ref(null)



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
