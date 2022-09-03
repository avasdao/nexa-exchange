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

        <button @click="toggleMenu" class="flex justify-end w-64">
            <!-- <svg class="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg> -->
            <svg class="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        </button>
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
                            <router-link to="/">
                                Home
                            </router-link>

                            <router-link to="/markets">
                                Markets
                            </router-link>

                            <router-link to="/bridges">
                                Bridges
                            </router-link>

                            <router-link to="/faucets">
                                Faucets
                            </router-link>
                        </div>

                        <div class="space-x-4">
                            <router-link to="/reports">
                                Reports
                            </router-link>

                            <router-link to="/status">
                                Status
                            </router-link>
                        </div>
                    </div>

                    <router-view />

                </section>
            </div>

            <MarketFeed
                class=""
                :tradePair="tradePair"
            />
        </div>

    </main>

    <FooterView />

    <AdminView v-if="isAdmin" :class="{ hidden: !showingMenu }" @toggleMenu="showingMenu = !showingMenu" />
    <ManagerView v-else :class="{ hidden: !showingMenu }" @toggleMenu="showingMenu = !showingMenu" />
</template>

<script>
/* Import components. */
import AdminView from '@/components/AdminView'
import FooterView from '@/components/FooterView'
import HeaderView from '@/components/HeaderView'
import ManagerView from '@/components/ManagerView'
import MarketFeed from '@/components/BridgeFeed'
import { v4 as uuidv4 } from 'uuid'

export default {
    components: {
        AdminView,
        FooterView,
        HeaderView,
        ManagerView,
        MarketFeed,
    },
    data: () => ({
        showingMenu: null,
        isAdmin: null,
        isManager: null,

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

        initRostrum() {
            /* Initialize socket connection to Electrum server. */
            const socket = new WebSocket('ws://electrum.nexa.org:7230')
            // console.log('EXAMPLE SOCKET', socket);

            // const request = `{"method":"blockchain.address.get_balance","params":["nexa:nqtsq5g5mtglrfqmnr45s0x364pxcg2uw88h72hl9c864cyj", true],"id":"${uuidv4()}"}`

            /* Handle open connection. */
            socket.onopen = () => {
                  // console.log('ONOPEN');

                  let request

                  // const txBytes = '3feb2e20a908ccd7d31f84224276b02f2c3951ed3448da58722a107ec4ab393c'
                  // const txid = txBytes.match(/[a-fA-F0-9]{2}/g).reverse().join('')

                  request = `{"method":"blockchain.transaction.get","params":["66ce81cec5a010e151c68d63bd135133cd54cc5f4904817c738a4a19986ccb0c",true],"id":"${uuidv4()}"}`
                  // request = `{"method":"blockchain.transaction.get","params":["${txid}",true],"id":"${uuidv4()}"}`
                  // socket.send(request + '\n')

                  request = `{"method":"blockchain.headers.subscribe","params":[""],"id":"${uuidv4()}"}`
                  socket.send(request + '\n')

                  request = `{"method":"blockchain.block.header","params":[56332],"id":"${uuidv4()}"}`
                  socket.send(request + '\n')
            }

            /* Handle message. */
            socket.onmessage = (msg) => {
                // console.log('ONMESSAGE', msg);

                let data
                let result
                let params

                if (msg && msg.data) {
                    try {
                        data = JSON.parse(msg.data)
                        console.log('DATA', data)

                        if (data && data.result) {
                            result = data.result
                            console.log('MESSAGE RESULT', data.id, result)

                            // TODO: Validate result isHex
                            // this.parseTx(result)
                        }

                        if (data && data.params) {
                            params = data.params
                            console.log('PARAMS', params)
                        }

                        if (params && params[0].height) {
                            console.log('NEW BLOCK', params[0])

                            // TODO: Validate result isHex
                            this.parseBlock(params[0].hex)

                            const height = parseInt(params[0].height)
                            console.log('HEIGHT', height)

                            if (height > 0) {
                                // let request

                                // request = `{"method":"blockchain.block.header","params":[${height}],"id":"${uuidv4()}"}`
                                // socket.send(request + '\n')
                            }
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
            }

            /* Handle connection close. */
            socket.onclose = function () {
                console.log('ONCLOSE');
            }

            /* Handle connection error. */
            socket.onerror = function (e) {
                console.log('ONERROR', e);
            }

        },

        toggleMenu() {
            this.showingMenu = !this.showingMenu
        },

    },
    created: function () {
        /* Initialize menu flag. */
        this.showingMenu = false

        /* Handle admin user. */
        if (this.$route && this.$route.path === '/admin') {
            this.isAdmin = true
        } else {
            this.isAdmin = false
        }

        // this.initRostrum()

    },
    mounted: function () {
        //
    },
}
</script>
