<template>
    <main class="bg-gray-200 border-2 border-rose-500 rounded-lg shadow-md">
        <header class="py-1 mb-3 border-b border-red-600">
            <h1 class="text-gray-700 text-xl font-bold text-center">
                Order Book
            </h1>

            <div class="flex justify-center">
                <span class="text-gray-500 text-xs italic">
                    updated 3.2 seconds ago
                </span>
            </div>
        </header>

        <div v-for="ask of askList" :key="ask.value" class="w-48 flex justify-center bg-red-500">
            <span class="text-base font-medium">
                {{formatOrderBookValue(ask.value)}}
            </span>
        </div>

        <div class="py-3 flex justify-center bg-gray-100 border-t-2 border-b-2 border-yellow-500">
            <span class="text-xl font-bold">
                1 163 800 NEX
            </span>
        </div>

        <div v-for="bid of bidList" :key="bid.value" class="w-48 flex justify-center bg-green-500">
            <span class="text-base font-medium">
                {{formatOrderBookValue(bid.value)}}
            </span>
        </div>

    </main>
</template>

<script>
/* Import moduels. */
import numeral from 'numeral'

export default {
    data: () => ({
        asks: null,
        bids: null,
    }),
    computed: {
        askList() {
            /* Validate asks. */
            if (!this.asks || this.asks.length === 0) return []

            /* Clone array. */
            const cloned = [...this.asks]

            /* Return reversed array. */
            return cloned.reverse()
        },

        bidList() {
            /* Validate bids. */
            if (!this.bids || this.bids.length === 0) return []

            /* Clone array. */
            const cloned = [...this.bids]

            /* Return reversed array. */
            // return cloned.reverse()
            return cloned
        },
    },
    methods: {
        initFormat() {
            numeral.register('locale', 'nex', {
                delimiters: {
                    thousands: ' ',
                    decimal: '.',
                },
                abbreviations: {
                    thousand: 'k',
                    million: 'm',
                    billion: 'b',
                    trillion: 't',
                },
                ordinal : function (number) {
                    return number === 1 ? '' : 's'
                },
                currency: {
                    symbol: '$'
                }
            });

            // switch between locales
            numeral.locale('nex')
        },

        formatOrderBookValue(_value) {
            // numeral.locale('de')
            numeral.localeData('en').delimiters.thousands = ' '

            return numeral(_value).format('0,0') + '  NEX'
        },

    },
    created: function () {
        this.asks = []
        this.bids = []

        this.initFormat()

        this.asks.push({
            value: 1350000,
        })
        this.asks.push({
            value: 1550000,
        })
        this.asks.push({
            value: 1450000,
        })
        this.asks.push({
            value: 1750000,
        })

        this.bids.push({
            value: 1050000,
        })
        this.bids.push({
            value: 950000,
        })
        this.bids.push({
            value: 650000,
        })
        this.bids.push({
            value: 750000,
        })
    },
    mounted: function () {
        //
    },
}
</script>
