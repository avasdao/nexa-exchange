<template>
    <main class="bg-gray-200 border-2 border-rose-500 rounded-lg shadow-md">
        <header class="py-1 mb-3 border-b border-red-600">
            <h1 class="text-gray-700 text-xl font-bold text-center">
                Order Book
            </h1>

            <div class="flex justify-center">
                <span class="text-gray-500 text-xs italic">
                    last updated <strong class="text-rose-500 text-sm">4.1</strong> secs ago
                </span>
            </div>
        </header>

        <div v-for="ask of askList" :key="ask.value" class="w-48 flex justify-center bg-red-500">
            <span
                class="text-base font-medium"
                v-html="formatOrderBookValue(ask.value)"
            />
        </div>

        <div class="w-48 flex justify-center bg-red-400 border-t border-b-2 border-red-600">
            <span class="text-red-100 text-xs font-medium tracking-widest">
                ASKING
            </span>
        </div>

        <div class="py-3 flex flex-col items-center bg-gray-100">
            <span class="text-gray-400 text-xl font-bold">
                <span class="mx-1 text-gray-800">0 .</span>
                <small>000</small> <small>00</small><span class="text-gray-800">1</span> <span class="text-gray-800">164</span>
                <span class="mx-1 text-gray-800">{{quotePair}}</span>
            </span>

            <span class="text-gray-500 text-xs italic lowercase">
                Last Trade was <strong class="text-rose-500">3 mins</strong> ago
            </span>
        </div>

        <div class="w-48 flex justify-center bg-green-400 border-t-2 border-b border-green-600">
            <span class="text-green-900 text-xs font-medium tracking-widest">
                BIDDING
            </span>
        </div>

        <div v-for="bid of bidList" :key="bid.value" class="w-48 flex justify-center bg-green-500">
            <span
                class="text-base font-medium"
                v-html="formatOrderBookValue(bid.value)"
            />
        </div>

    </main>
</template>

<script>
/* Import moduels. */
// import numeral from 'numeral'

export default {
    props: {
        tradePair: String,
    },
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

        quotePair() {
console.log('quoete pair is seeing', this.tradePair);
            if (!this.tradePair) return 'DAI'

            switch(this.tradePair) {
            case 'NEX/BCH':
                return 'BCH'
            case 'NEX/DAI':
                return 'DAI'
            default:
                return 'DAI'
            }
        },

    },
    methods: {
        // initFormat() {
        //     numeral.register('locale', 'nex', {
        //         delimiters: {
        //             thousands: ' ',
        //             decimal: '.',
        //         },
        //         abbreviations: {
        //             thousand: 'k',
        //             million: 'm',
        //             billion: 'b',
        //             trillion: 't',
        //         },
        //         ordinal : function (number) {
        //             return number === 1 ? '' : 's'
        //         },
        //         currency: {
        //             symbol: '$'
        //         }
        //     });
        //
        //     // switch between locales
        //     numeral.locale('nex')
        // },

        formatOrderBookValue(_value) {
            // numeral.locale('de')
            // numeral.localeData('en').delimiters.thousands = ' '

            // return numeral(_value).format('0,0.000[00000]') + ' NEX'

            if (_value < 100000000) {
                const val = '00000' + _value.toString()

                const parsed = '0 . <small>' + val.slice(0, 3) + '</small> ' + val.slice(3, 6) + ' ' + val.slice(6)

                if (val.length < 7) {
                    return parsed + '000 <small>000</small>'
                } else if (val.length < 8) {
                    return parsed + '00 <small>000</small>'
                } else if (val.length < 9) {
                    return parsed + '0 <small>000</small>'
                } else {
                    return parsed + ' <small>000</small>'
                }
            } else {
                return _value
            }
        },

    },
    created: function () {
        this.asks = []
        this.bids = []

        // this.initFormat()

        this.asks.push({
            value: 170,
        })
        this.asks.push({
            value: 135,
        })
        this.asks.push({
            value: 155,
        })
        this.asks.push({
            value: 145,
        })
        this.asks.push({
            value: 175,
        })

        this.bids.push({
            value: 105,
        })
        this.bids.push({
            value: 95,
        })
        this.bids.push({
            value: 65,
        })
        this.bids.push({
            value: 75,
        })
        this.bids.push({
            value: 55,
        })
    },
    mounted: function () {
        //
    },
}
</script>
