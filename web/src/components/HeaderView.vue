<template>
    <main class="flex flex-row space-x-5">
        <div>
            <select class="rounded-lg text-sm">
                <option value="NEX/AVAX" disabled>Avalanche (AVAX)</option>
                <option value="NEX/BCH" selected>Bitcoin Cash (BCH)</option>
                <option value="NEX/BNB" disabled>Binance (BNB)</option>
                <option value="NEX/BTC" disabled>Bitcoin (BTC)</option>
                <option value="NEX/DAI" disabled>Dai (DAI)</option>
                <option value="NEX/ETH" disabled>Ethereum (ETH)</option>
                <option value="NEX/USDT" disabled>Tether (USDT)</option>
            </select>
        </div>

        <div class="px-5 py-1 flex flex-row items-center space-x-3 bg-purple-200 border-2 border-purple-400 rounded-lg">
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
