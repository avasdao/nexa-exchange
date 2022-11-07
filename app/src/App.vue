<template>
    <router-view />
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        // msg: String
    },
    data: () => {
        return {
            /* App Summary */
            appTitle: 'nexa Exchange',
            appDesc: 'The Official Bitcoin (DEX) Decentralized Exchange',

            /* Blockchain Summary */
            // anamenexa: '0x0',
            // anamenexa: '0x0',

            /* Exchange summary. */
            orders: 'There are no orders here.'
        }
    },
    computed: {
        ...mapGetters([
            //
        ]),

        ...mapGetters('tokens', [
            // 'getToken'
        ]),

    },
    methods: {
        ...mapActions([
            // 'createEthOrder'
        ]),

        init () {
            console.info('App has loaded successfully!') // eslint-disable-line no-console

            /* Initialize Ethereum provider. */
            // initEthereum()

            /* Initialize order book. */
            // initOrderBook()

            /* Initialie nexa contract. */
            // initnexa()

            /* Initialie nexa contract. */
            // initnexa()
        },

    },
    created: async function () {
        // console.log('PARAMS', this.$route.params)
        // console.log('QUERY', this.$route.query)
        // console.log('HASH', this.$route.hash)

        /* Set owner slug. */
        // const pathMatch = this.$route.params.pathMatch
        // console.log('PATH MATCH', pathMatch)

        /* Initialize application. */
        // this.init()

    },
    mounted: function () {
        //
    },
}
</script>

<style>
/*  */
</style>
