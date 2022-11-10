<template>
    <main class="max-w-5xl mx-auto py-5 px-3">
        <h1 class="text-4xl font-medium text-indigo-600">
            Alpha - Bootstrap
        </h1>

        <p>
            WARNING: BEWARE OF DRAGONS
        </p>

        <p>
            At this stage, we are working directly with early adopters to flush on the bugs with the platform before we move to <NuxtLink to="/beta" class="text-blue-500 font-medium hover:underline">Beta Testing</NuxtLink>.
        </p>

        <p>
            $200 per day for development
        </p>
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
        title: 'Blank — Nexa Exchange',
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
