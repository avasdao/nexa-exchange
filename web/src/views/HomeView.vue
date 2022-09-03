<template>
    <main class="max-w-4xl p-5 bg-rose-100 rounded-2xl border-8 border-rose-300">
        <div class="flex flex-row">
            <div class="">
                <HeaderView
                    class="h-10"
                    @updatePair="updatePair"
                />

                <div class="mt-7">
                    <div class="mr-3 mb-5 border-t border-rose-300" />

                    TRADING PAIRS

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <div>
                        Avalanche (NEX/AVAX)
                    </div>

                    <div>
                        Bitcoin Cash (NEX/BCH)
                    </div>

                    <div>
                        Binance (NEX/BNB)
                    </div>

                    <div>
                        Bitcoin (NEX/BTC)
                    </div>

                    <div>
                        Dai (NEX/DAI)
                    </div>

                    <div>
                        Ethereum (NEX/ETH)
                    </div>

                    <div>
                        Tether (NEX/USDT)
                    </div>
                </div>
            </div>

            <OrderBook
                class="w-48 h-96 shrink"
                :tradePair="tradePair"
            />
        </div>

    </main>

    <FooterView />
</template>

<script>
/* Import components. */
import FooterView from '@/components/FooterView'
import HeaderView from '@/components/HeaderView'
import OrderBook from '@/components/OrderBook'

export default {
    components: {
        FooterView,
        HeaderView,
        OrderBook,
    },
    data: () => ({
        tradePair: null,
    }),
    computed: {
        //
    },
    methods: {
        updatePair(_tradePair) {
            console.log('HOME TRADE UPDATE', _tradePair);

            /* Update trade pair. */
            // NOTE: This will filter throughout the app.
            // TODO: Create a store.
            this.tradePair = _tradePair
        },
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
