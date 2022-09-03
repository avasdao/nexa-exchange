<template>
    <main class="flex flex-row space-x-5">
        <div class="flex flex-col items-center">
            <span class="text-gray-600 text-xs font-medium">
                USD $116.38 &bullet; CN¥ 806.21
            </span>

            <select class="h-10 rounded-lg text-sm shadow-md">
                <option value="AVAX/NEX" disabled>Avalanche (AVAX)</option>
                <option value="BCH/NEX" selected>Bitcoin Cash (BCH)</option>
                <option value="BNB/NEX" disabled>Binance (BNB)</option>
                <option value="BTC/NEX" disabled>Bitcoin (BTC)</option>
                <option value="DAI/NEX" disabled>Dai (DAI)</option>
                <option value="ETHNEX" disabled>Ethereum (ETH)</option>
                <option value="USDT/NEX" disabled>Tether (USDT)</option>
            </select>

        </div>

        <div class="h-14 px-5 py-1 flex flex-row items-center space-x-3 bg-purple-200 border-2 border-purple-400 rounded-lg shadow-md">
            <div class="text-sm font-bold">
                {{curDate}}
            </div>

            <div class="text-xs">
                Open:
                <span class="font-medium">n/a</span>
            </div>

            <div class="text-xs">
                High:
                <span class="font-medium">n/a</span>
            </div>

            <div class="text-xs">
                Low:
                <span class="font-medium">n/a</span>
            </div>

            <div class="text-xs">
                Close:
                <span class="font-medium">n/a</span>
            </div>

            <div class="text-xs">
                Vol:
                <span class="font-medium">n/a</span>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    data: () => ({
        //
    }),
    computed: {
        curDate() {
            return moment().format('ll')
        },

    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
