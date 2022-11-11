<template>
    <main>
        <Navbar />

        <section class="mt-3 p-3 max-w-5xl mx-auto">
            <h1 class="text-4xl font-medium">
                Authorization
            </h1>

            <p class="mt-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore atque commodi culpa iusto voluptatum, modi qui voluptas cupiditate, ad incidunt odio aliquam voluptatibus. Eveniet, est sequi quod eligendi animi sit!
            </p>
        </section>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Navbar from '@/components/Navbar.vue'

export default {
    components: {
        Navbar,
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        ...mapGetters({
            //
        }),

    },
    methods: {
        ...mapActions({
            //
        }),

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
