<script setup lang="ts">
useHead({
    title: 'Oracles — Nexa Exchange',
    meta: [
        { name: 'description', content: 'Accountable and verifiable price & data oracles.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

onBeforeMount(() => {
    // TODO Move this block to @nexajs/app
    try {
        System.$state = JSON.parse(localStorage.getItem('system'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })
    } catch (err) {
        console.error(err)
    }
})

// TODO Move this block to @nexajs/app
watch(System.$state, (_state) => {
    localStorage.setItem('system',
        JSON.stringify(_state, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )
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
    <slot />
</template>
