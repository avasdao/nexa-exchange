<script setup>
/* Import modules. */
import { ref } from 'vue'

const holder = ref(null)

</script>

<template>
    <main class="max-w-5xl mx-auto py-5 px-3">
        <h1 class="text-4xl font-medium text-indigo-600">
            Blank
        </h1>
    </main>
</template>

<script>
export default {
    head: () => ({
        title: 'Blank — Nexa Exchange',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
}
</script>
