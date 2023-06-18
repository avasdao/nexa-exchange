<script setup>
/* Import modules. */
import { ref } from 'vue'

/* Initialize ticker. */
const ticker = ref(null)

/* Request ticker. */
ticker.value = await $fetch('/ticker')
    .catch(err => console.error(err))

</script>

<template>
    <main class="max-w-5xl mx-auto py-5 px-3">
        <h1 class="text-4xl font-medium text-indigo-600">
            Markets
        </h1>

        <span class="text-xs font-mono">
            <pre>{{JSON.stringify(ticker, null, 2)}}</pre>
        </span>
    </main>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
    // middleware: 'magic.auth',
    data: () => ({
        //
    }),
    head: () => ({
        title: 'Markets — Nexa Exchange',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    computed: {
        // ...mapGetters({
        //     // panelIsShowing: 'system/getPanelState'
        // })
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
    methods: {
        //
    }
}
</script>
