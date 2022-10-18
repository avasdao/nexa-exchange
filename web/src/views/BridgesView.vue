<template>
    <main class="mt-5">
        <div class="px-3 py-1 bg-yellow-100 border-2 border-yellow-300 rounded-lg">
            <h3 class="text-xs text-yellow-600 font-bold uppercase">Did you know?</h3>

            <p class="mt-2 text-gray-600">
                Nexaverse assets are "officially" denoted with the <strong>0x</strong> as a prefixed subscript.
            </p>

            <p class="text-gray-800">
                e.g. DeFi stablecoins like <strong><small class="text-gray-600">0x</small>DAI</strong> -AND- GameFi assets like <strong>BAYC</strong> &amp; <strong><small class="text-gray-600">0x</small>APE</strong>
            </p>

            <p class="mt-2 text-gray-600">
                ALL Nexaverse assets have been <em>"bridged"</em> to the sidechain, including the <strong><small class="text-gray-600">0x</small>NEX</strong> native gas token and other assets from the <a href="https://nexa.org" target="_blank" class="text-blue-500 hover:underline font-medium">Nexa</a> host chain.
            </p>

            <p class="text-gray-800">
                e.g. <strong>$BCH</strong> <small class="italic">Bitcoin Cash</small> &lt;=&gt; <strong>WBCH</strong> <small class="italic">Nexa</small> &lt;=&gt; <strong><small class="text-gray-600">0x</small>BCH</strong> <small class="italic">Nexaverse</small>
            </p>
        </div>


        <div class="">
            <div class="mt-8 flex flex-col">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table class="min-w-full">
                                <thead class="bg-white">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Asset Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Symbol</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Market Cap $</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bridged $</th>
                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="bg-white">
                                    <tr class="border-t border-gray-200">
                                        <th colspan="5" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">
                                            Nexa &amp; The Nexaverse
                                        </th>
                                    </tr>

                                    <tr class="border-t border-gray-300">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Nexa</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><small class="text-indigo-300 font-medium">0x</small>NEX</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$2.13M</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$135.72K</td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href="javascript://" class="text-indigo-600 hover:text-indigo-900">
                                                Trade<span class="sr-only">, Nexa</span>
                                            </a>
                                        </td>
                                    </tr>

                                    <tr class="border-t border-gray-200">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Ava's DAO</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><small class="text-indigo-300 font-medium">0x</small>AVAS</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$135.88M</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$24.12K</td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href="javascript://" class="text-indigo-600 hover:text-indigo-900">
                                                Trade<span class="sr-only">, Ava's DAO</span>
                                            </a>
                                        </td>
                                    </tr>

                                    <!-- More people... -->
                                </tbody>

                                <tbody class="bg-white">
                                    <tr class="border-t border-gray-200">
                                        <th colspan="5" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">
                                            Avalanche
                                        </th>
                                    </tr>

                                    <tr class="border-t border-gray-300">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Trader Joe</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><small class="text-indigo-300 font-medium">0x</small>JOE</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$1.22M</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$81.91K</td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href="javascript://" class="text-indigo-600 hover:text-indigo-900">
                                                Trade<span class="sr-only">, Trader Joe</span>
                                            </a>
                                        </td>
                                    </tr>

                                    <tr class="border-t border-gray-200">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Pangolin</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><small class="text-indigo-300 font-medium">0x</small>PNG</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$3.1MM</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$12.1K</td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href="javascript://" class="text-indigo-600 hover:text-indigo-900">
                                                Trade<span class="sr-only">, Pangolin</span>
                                            </a>
                                        </td>
                                    </tr>

                                    <!-- More people... -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <section class="mt-5">
            <h1>Dai</h1>

            DAI
            Proof of Asset
            172,156,494.170081 DAI
            0x8eb8a3b9...bb75e3ab28

            Wrapped Token
            172,014,496.44908 DAI.eth
            0xd586e7f8...2c279d8d70

            Swap Supply
            140,801.123442 DAI.eth
            0xbA7dEebB...E99Cd3507a

            <div>
                Proof of Asset
            </div>
        </section>
    </main>
</template>

<script>
export default {
    data: () => ({
        //
    }),
    computed: {
        //
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
