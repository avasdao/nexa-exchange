<template>
    <header class="px-3 py-5 flex flex-row justify-between items-end">
        <div class="w-64">
            <a href="https://docs.nexa.exchange" target="_blank" class="text-lg text-gray-200">
                Do you need help?
            </a>
        </div>

        <h1 class="text-4xl text-gray-200 tracking-tight">
            Nexa Exchange
        </h1>

        <div class="flex justify-end w-64">
            <svg class="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </div>
    </header>

    <main class="max-w-4xl p-5 bg-rose-100 rounded-2xl border-8 border-rose-300">
        <div class="flex flex-row">
            <div class="">
                <HeaderView
                    class="h-10"
                    @updatePair="updatePair"
                />

                <section class="mt-7">
                    <div class="mr-3 mb-5 border-t border-rose-300" />

                    <div class="px-3 py-1 mr-3 flex flex-row justify-between bg-pink-500 border-4 border-pink-700 rounded-md">
                        <div class="space-x-4">
                            <button>
                                Home
                            </button>

                            <button>
                                Markets
                            </button>

                            <button>
                                Bridges
                            </button>

                            <button>
                                Faucets
                            </button>
                        </div>

                        <div class="space-x-4">
                            <button>
                                Reports
                            </button>

                            <button>
                                Status
                            </button>
                        </div>
                    </div>

                    TRADING PAIRS

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                </section>

                <footer class="mt-3 mr-3 px-3 py-3 flex flex-col items-center bg-gradient-to-r from-indigo-800 to-indigo-900 border-2 border-yellow-400 rounded-lg shadow-md divide-y divide-yellow-300">
                    <div class="py-2 w-3/4 text-yellow-100 text-center">
                        👉 Asset <strong class="text-lg">Exchange</strong> Fee is <strong class="text-lg">0.1%</strong> for Takers
                    </div>

                    <div class="py-2 w-3/4 text-yellow-100 text-center">
                        👉 Asset <strong class="text-lg">Bridge</strong> Fee is <strong class="text-lg">0.1%</strong> for Everyone
                    </div>

                    <div class="py-2 w-3/4 text-yellow-100 text-center">
                        👉 Minimum trade amount is <strong class="text-lg">10,000</strong> NEX
                    </div>

                    <div class="py-2 w-3/4 text-yellow-100 text-center">
                        👉 Orders auto <strong class="text-lg">expire &amp; refund</strong> after <strong class="text-lg">24</strong> hours
                    </div>
                </footer>
            </div>

            <TradingView
                class=""
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
import TradingView from '@/components/TradingView'

export default {
    components: {
        FooterView,
        HeaderView,
        TradingView,
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
