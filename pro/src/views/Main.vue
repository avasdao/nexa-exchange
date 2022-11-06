<template>
    <main>
        <Navbar />

        <div class="trading-cont">
            <div class="vertical-split">
                <Balance />
                <Trade />
            </div>

            <OrderBook />

            <div class="vertical-split">
                <PriceChart />
                <Transactions />
            </div>

            <div class="vertical-split">
                <TradesVolume />
                <Notices />
            </div>
        </div>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Balance from '@/components/Balance.vue'
import Navbar from '@/components/Navbar.vue'
import Notices from '@/components/Notices.vue'
import OrderBook from '@/components/OrderBook.vue'
import PriceChart from '@/components/PriceChart.vue'
import Trade from '@/components/Trade.vue'
import TradesVolume from '@/components/TradesVolume.vue'
import Transactions from '@/components/Transactions.vue'

export default {
    components: {
        Balance,
        Navbar,
        Notices,
        OrderBook,
        PriceChart,
        Trade,
        TradesVolume,
        Transactions,
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
