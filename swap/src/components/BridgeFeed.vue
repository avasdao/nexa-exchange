<template>
    <main class="flex flex-col justify-between bg-gray-200 border-2 border-rose-500 rounded-lg shadow-md">
        <header class="py-1 mb-3 border-b border-red-600">
            <h1 class="text-gray-700 text-xl font-bold text-center">
                Bridge Feed
            </h1>

            <div class="flex justify-center">
                <span class="text-gray-500 text-xs italic">
                    last updated <strong class="text-rose-500 text-sm">4.1</strong> secs ago
                </span>
            </div>
        </header>

        <section class="">
            <div v-for="ask of askList" :key="ask.value" class="w-48 flex justify-center bg-red-500">
                <span
                    class="text-base font-medium"
                    v-html="formatOrderBookValue(ask.value)"
                />
            </div>

            <div class="w-48 flex justify-center bg-red-400 border-t border-b-2 border-red-600">
                <span class="text-red-100 text-xs font-medium tracking-widest">
                    Real-time Transfers
                </span>
            </div>

            <div class="py-3 flex flex-col items-center bg-gray-100">
                <span class="text-gray-400 text-xl font-bold">
                    <span class="mx-1 text-gray-800">0 .</span>
                    <small>000</small> <small>00</small><span class="text-gray-800">1</span> <span class="text-gray-800">164</span>
                    <span class="mx-1 text-gray-800">{{quotePair}}</span>
                </span>

                <span class="text-gray-500 text-xs italic lowercase">
                    Last transfer was <strong class="text-rose-500">5 hours</strong> ago
                </span>
            </div>

            <div class="w-48 flex justify-center bg-green-400 border-t-2 border-b border-green-600">
                <span class="text-green-900 text-xs font-medium tracking-widest">
                    Network Summary
                </span>
            </div>

            <div v-for="featured of featuredList" :key="featured.value" class="w-48 flex justify-center bg-green-500">
                <span
                    class="text-base font-medium"
                    v-html="formatOrderBookValue(featured.value)"
                />
            </div>
        </section>

        <footer class="p-2 flex flex-col items-center justify-center">
            <span class="block text-xs font-medium text-center">
                <span class="italic">
                    Secured &amp; managed by a
                    <strong class="text-sm text-indigo-800">Decentralized Federation</strong>
                    <br />of NEX stakeholders
                </span>
            </span>

            <span class="text-2xl">🛡️</span>
        </footer>

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
        bridgeActivity: null,
        chainFeatures: null,
    }),
    computed: {
        askList() {
            /* Validate bridgeActivity. */
            if (!this.bridgeActivity || this.bridgeActivity.length === 0) return []

            /* Clone array. */
            const cloned = [...this.bridgeActivity]

            /* Return reversed array. */
            return cloned.reverse()
        },

        featuredList() {
            /* Validate chain features. */
            if (!this.chainFeatures || this.chainFeatures.length === 0) return []

            /* Clone array. */
            const cloned = [...this.chainFeatures]

            /* Return reversed array. */
            // return cloned.reverse()
            return cloned
        },

        quotePair() {
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
                let val

                if (_value < 100) {
                    val = '000000' + _value.toString()
                } else {
                    val = '00000' + _value.toString()
                }

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
        this.bridgeActivity = []
        this.chainFeatures = []

        // this.initFormat()

        this.bridgeActivity.push({
            value: 210,
        })
        this.bridgeActivity.push({
            value: 195,
        })
        this.bridgeActivity.push({
            value: 170,
        })
        this.bridgeActivity.push({
            value: 135,
        })
        this.bridgeActivity.push({
            value: 155,
        })
        this.bridgeActivity.push({
            value: 145,
        })
        this.bridgeActivity.push({
            value: 175,
        })

        this.chainFeatures.push({
            value: 105,
        })
        this.chainFeatures.push({
            value: 95,
        })
        this.chainFeatures.push({
            value: 65,
        })
    },
    mounted: function () {
        //
    },
}
</script>
