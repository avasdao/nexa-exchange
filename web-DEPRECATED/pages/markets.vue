<script setup>
/* Import modules. */
import numeral from 'numeral'

/* Initialize ticker. */
const ticker = ref(null)

/* Request ticker. */
ticker.value = await $fetch('/_ticker')
    .catch(err => console.error(err))

</script>

<template>
    <main class="max-w-5xl mx-auto py-5 px-3">
        <h1 class="text-4xl font-medium text-indigo-600">
            Markets
        </h1>


        <section v-if="ticker" class="grid grid-cols-2 gap-3">
            <h2 class="text-right">Name</h2>
            <h2>{{ticker.name}}</h2>

            <h2 class="text-right">Symbol</h2>
            <h2>{{ticker.symbol}}</h2>

            <h2 class="text-right"># of Markets</h2>
            <h2>{{ticker.numMarkets}}</h2>

            <h2 class="text-right">Maximum Supply</h2>
            <h2>{{numeral(ticker.maxSupply).format('0,0')}}</h2>

            <h2 class="text-right">Circulating Supply</h2>
            <h2>{{numeral(ticker.circulatingSupply).format('0,0')}}</h2>

            <h2 class="text-right">Total Supply</h2>
            <h2>{{numeral(ticker.totalSupply).format('0,0')}}</h2>

        </section>

        <div class="w-3/4 mx-auto my-5 border-t border-gray-500" />

        <section v-if="ticker?.quote.USD" class="grid grid-cols-2 gap-3">
            <h2 class="text-right">Price</h2>
            <h2>{{numeral(ticker.quote.USD.price).format('$0,0.00000000[0000]')}}</h2>

            <h2 class="text-right">Market Cap</h2>
            <h2>{{numeral(ticker.quote.USD.marketCap).format('$0,0.00')}}</h2>

            <h2 class="text-right">Volume 24hrs</h2>
            <h2>{{numeral(ticker.quote.USD.vol24).format('$0,0.00')}}</h2>

            <h2 class="text-right">Volume Change 24hrs</h2>
            <h2>{{numeral(ticker.quote.USD.volChg24).format('$0,0.00')}}</h2>

            <h2 class="text-right">% Change 1hr</h2>
            <h2>{{ticker.quote.USD.pctChg1h}}</h2>

            <h2 class="text-right">% Change 24hrs</h2>
            <h2>{{ticker.quote.USD.pctChg24h}}</h2>

            <h2 class="text-right">% Change 7d</h2>
            <h2>{{ticker.quote.USD.pctChg7d}}</h2>

            <h2 class="text-right">% Change 30d</h2>
            <h2>{{ticker.quote.USD.pctChg30d}}</h2>

        </section>

        <!-- <span class="text-xs font-mono">
            <pre>{{JSON.stringify(ticker, null, 2)}}</pre>
        </span> -->
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
