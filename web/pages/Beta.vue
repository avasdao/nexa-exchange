<template>
    <main class="max-w-5xl mx-auto py-5 px-3">
        <h1 class="text-4xl font-medium text-indigo-600">
            Beta - Scaling &amp; Localization
        </h1>

        <p>
            At this stage, the platform is stable and ready for public use.
            Our focus will be on scaling and stability as well as expanding to service new communities.
        </p>

        <section class="mt-3">
            <h1 class="text-3xl text-gray-600 font-medium">
                Our Roadmap
            </h1>

            <ol class="mt-3 ml-10 list-decimal">
                <li>Hard-fork updates</li>
                <li>I18n</li>
            </ol>
        </section>
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
        title: 'Beta — Nexa Exchange',
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
