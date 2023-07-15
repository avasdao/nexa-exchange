<script setup lang="ts">
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
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
    <slot />
</template>
