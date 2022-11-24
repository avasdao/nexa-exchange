<script setup>
import NavView from '@/components/NavView.vue'
import SendPreview from '@/components/SendPreview.vue'

/* Initialize transactions. */
const txs = []

txs.push({
    id: 'ab4b5c08-0fc4-4469-a034-1c478215f6ad',
    type: 'Sent',
    satoshis: 3505083000,
    usdValue: '- $35.05',
    createdAt: 0,
})

txs.push({
    id: 'a5757f0a-a273-4b93-864b-77efe175c724',
    type: 'Received',
    satoshis: 1838068012,
    usdValue: '+ $18.38',
    createdAt: 0,
})

txs.push({
    id: 'f3a1b8c5-0def-4a6b-8fa0-91c747208038',
    type: 'Received',
    satoshis: 2007830301,
    usdValue: '- $20.07',
    createdAt: 0,
})

const displayValue = (_val) => {
    let base
    base = _val.toString()

    const decimals = base.slice(-2)
    base = base.slice(0, -2)

    const kilo = base.slice(-3)
    base = base.slice(0, -3)

    const mega = base.slice(-3)
    base = base.slice(0, -3)
    return `${base} , ${mega} , ${kilo} . <span class="text-xs text-gray-400">${decimals}</span> NEX`
}
</script>

<template>
    <main>
        <NavView />

        <h1 class="my-5 ml-3 text-3xl text-yellow-700 font-medium">
            Transactions
        </h1>

        <section>
            <div class="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">

                    <!-- Begin transactions loop -->
                    <li v-for="tx of txs" :key="tx.id">
                        <a href="javascript://" class="block hover:bg-gray-50">
                            <div class="px-4 py-4 sm:px-6">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <p class="truncate text-lg font-medium text-gray-700">
                                            {{tx.type}}
                                        </p>

                                        <p class="mt-1 ml-3 flex items-center text-xs text-gray-400 uppercase">
                                            General
                                        </p>
                                    </div>

                                    <div class="ml-2 flex flex-shrink-0">
                                        <p class="inline-flex border-2 border-green-200 rounded-lg bg-green-100 px-2 py-1 text-lg font-semibold leading-5 text-green-800">
                                            {{tx.usdValue}}
                                        </p>
                                    </div>
                                </div>

                                <div class="mt-2 sm:flex sm:justify-between">
                                    <div class="sm:flex">
                                        <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <!-- Heroicon name: mini/map-pin -->
                                            <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                                            </svg>

                                            Local
                                        </p>

                                        <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                            <!-- Heroicon name: mini/calendar -->
                                            <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                                            </svg>

                                            Nov 23, 2022
                                        </p>
                                    </div>

                                    <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        <p v-html="displayValue(tx.satoshis)"></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <!-- End transactions loop -->

                </ul>
            </div>
        </section>
    </main>
</template>
