<template>
    <main class="flex flex-row space-x-5">
        <div class="flex flex-col items-center">
            <span class="text-gray-600 text-xs font-medium">
                USD $116.38 &bullet; CN¥ 806.21
            </span>

            <select v-model="tradePair" class="h-10 rounded-lg text-sm shadow-md">
                <option value="NEX/AVAS" disabled>Ava's DAO ( AVAS )</option>
                <option value="NEX/AVAX" disabled>Avalanche ( AVAX )</option>
                <option value="NEX/BCH">Bitcoin Cash ( BCH )</option>
                <option value="NEX/BNB" disabled>Binance ( BNB )</option>
                <option value="NEX/BTC" disabled>Bitcoin ( BTC )</option>
                <option value="NEX/DAI">Dai ( DAI )</option>
                <option value="NEX/ETH" disabled>Ethereum ( ETH )</option>
                <option value="NEX/NUSD" disabled>Nexa USD ( NUSD )</option>
            </select>

        </div>

        <div class="h-14 px-5 py-1 flex flex-row items-start space-x-10 bg-purple-200 border-2 border-purple-400 rounded-lg shadow-md">
            <div class="py-1 text-sm font-bold">
                {{curDate}}
            </div>

            <div class="py-1 flex flex-col space-y-1">
                <section class="flex justify-between items-center space-x-3">
                    <div class="text-xs">
                        Hi &bullet;
                        <span class="font-medium">
                            ...00<span class="text-sm text-rose-500 font-bold">1</span> <span class="text-sm text-rose-500 font-bold">750</span>
                        </span>
                    </div>

                    <div class="text-xs">
                        Lo &bullet;
                        <span class="font-medium">
                            ...000 <span class="text-sm text-rose-500 font-bold">550</span>
                        </span>
                    </div>

                    <div class="text-xs">
                        Vol &bullet;
                        <span class="text-sm text-rose-500 font-bold">
                            $1.2K
                        </span>
                    </div>
                </section>

                <section class="flex justify-between items-center space-x-3">
                    <div class="text-xs">
                        TVL &bullet;
                        <span class="text-sm text-rose-500 font-bold">
                            $3.8K
                        </span>
                    </div>

                    <div class="text-xs">
                        Assets &bullet;
                        <span class="text-sm text-rose-500 font-bold">
                            7
                        </span>
                    </div>

                    <div class="text-xs">
                        Txs &bullet;
                        <span class="text-sm text-rose-500 font-bold">
                            1,337
                        </span>
                    </div>

                </section>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    data: () => ({
        tradePair: null,
    }),
    watch: {
        tradePair: function (_tradePair) {
            // console.log('TRADE PAIR UPDATED', _tradePair)

            this.$emit('updatePair', _tradePair)
        }
    },
    computed: {
        curDate() {
            return moment().format('ll')
        },

    },
    methods: {
        //
    },
    created: function () {
        // FOR DEV PURPOSES ONLY
        this.tradePair = 'NEX/DAI'
    },
    mounted: function () {
        //
    },
}
</script>
