<template>
    <main class="fixed inset-0 overflow-hidden">
        <!-- Background backdrop, show/hide based on slide-over state. -->

        <div class="absolute inset-0 overflow-hidden">
            <div class="fixed inset-0 bg-purple-700 opacity-70"></div>

            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
                <div class="pointer-events-auto w-screen max-w-2xl">
                    <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div class="flex-1">
                            <!-- Header -->
                            <div class="bg-gray-50 px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between space-x-3">
                                    <div class="space-y-1">
                                        <div class="flex flex-row items-center">
                                            <h1 class="mb-3 text-xl lg:text-2xl text-indigo-600 font-bold">
                                                NEXA Events Manager
                                            </h1>

                                            <svg class="ml-5 w-10 h-10 text-indigo-300 font-bold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                                        </div>

                                        <p class="text-sm text-gray-500">
                                            Subscribe to alerts for instant notification of your on-chain activities.
                                        </p>
                                    </div>

                                    <div class="flex h-7 items-center">
                                        <button @click="toggleMenu" type="button" class="text-gray-400 hover:text-gray-500">
                                            <span class="sr-only">Close panel</span>
                                            <!-- Heroicon name: outline/x -->
                                            <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">

                                <div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label for="project-name" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                            Email Address
                                        </label>

                                        <span class="block text-red-400 text-xs">
                                            (required)
                                        </span>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <input v-model="email" placeholder="satoshi@bitcoin.org" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label for="project-name" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                            Nexa Address or
                                            <br />Ext. Public Key <small>(XPUB)</small>
                                        </label>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <input v-model="address" placeholder="nexa:nqtsq... or xpub6CD..." type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <div>
                                        <label for="project-description" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                            Message Notes
                                        </label>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <textarea
                                            v-model="notes"
                                            placeholder="Enter any (optional) notes here."
                                            rows="2"
                                            class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        ></textarea>
                                    </div>
                                </div>

                                <fieldset class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                    <legend class="sr-only">Subscription Options</legend>

                                    <div class="text-sm font-medium text-gray-900" aria-hidden="true">
                                        Subscription Options
                                    </div>

                                    <div class="space-y-5 sm:col-span-2">
                                        <legend class="sr-only">Notifications</legend>

                                        <div class="relative flex items-start">
                                            <div class="flex items-center h-5">
                                                <input aria-describedby="comments-description" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" checked />
                                            </div>

                                            <div class="ml-3 text-sm">
                                                <label for="comments" class="font-medium text-gray-700">
                                                    Coin Transfers
                                                </label>

                                                <span id="comments-description" class="text-gray-500">
                                                    <span class="sr-only">Coin Transfers</span> all sent &amp; received
                                                </span>
                                            </div>
                                        </div>

                                        <div class="relative flex items-start">
                                            <div class="flex items-center h-5">
                                                <input aria-describedby="comments-description" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" disabled />
                                            </div>

                                            <div class="ml-3 text-sm">
                                                <label for="comments" class="font-medium text-gray-700">
                                                    Token Transfers
                                                </label>

                                                <span id="comments-description" class="text-gray-500">
                                                    <span class="sr-only">Token Transfers</span> sent &amp; received
                                                </span>
                                            </div>
                                        </div>

                                        <div class="relative flex items-start">
                                            <div class="flex items-center h-5">
                                                <input aria-describedby="candidates-description" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" disabled />
                                            </div>

                                            <div class="ml-3 text-sm">
                                                <label for="candidates" class="font-medium text-gray-700">
                                                    Coinbase
                                                </label>

                                                <span id="candidates-description" class="text-gray-500">
                                                    <span class="sr-only">Coinbase </span> only mined coins
                                                </span>
                                            </div>
                                        </div>

                                        <div class="relative flex items-start">
                                            <div class="flex items-center h-5">
                                                <input aria-describedby="candidates-description" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" disabled />
                                            </div>

                                            <div class="ml-3 text-sm">
                                                <label for="candidates" class="font-medium text-gray-700">
                                                    Double Spend Proof
                                                </label>

                                                <span id="candidates-description" class="text-gray-500">
                                                    <span class="sr-only">Double Spend Proof </span> zero confirmations
                                                </span>
                                            </div>
                                        </div>

                                        <hr class="border-gray-200" />

                                        <div class="space-between sm:space-between flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                                            <div class="flex-1">
                                                <a href="javascript://" class="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                                    <!-- Heroicon name: solid/link -->
                                                    <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                    <span> Copy link </span>
                                                </a>
                                            </div>

                                            <div>
                                                <a href="javascript://" class="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900">
                                                    <!-- Heroicon name: solid/question-mark-circle -->
                                                    <svg class="h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>

                                                    <span> Learn more about alerts </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                        <!-- Action buttons -->
                        <div class="flex flex-row justify-between flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                            <button
                                @click="signin"
                                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-xl font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Signin
                            </button>

                            <div class="flex justify-end space-x-3">
                                <button
                                    @click="cancel"
                                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-xl font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    @click="create"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-xl font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Create Subscription
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'
// import { v4 as uuidv4 } from 'uuid'

export default {
    data: () => ({
        accounts: null, // used for Web3 auth
        address: null, // Nexa address
        email: null,
        phone: null,
        notes: null,
    }),
    computed: {
        /**
         * Is Email Valid
         *
         * TODO
         */
        isEmailValid() {
            /* Validate email address. */
            if (!this.email) {
                return false
            }

            return true
        },

    },
    methods: {
        toggleMenu() {
            this.$emit('toggleMenu')
        },

        async create() {
            /* Validate email address. */
            if (!this.validateEmail()) return

            const rawResponse = await fetch('http://127.0.0.1:3000/v1/notifs', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    address: this.address || '',
                    notes: this.notes || '',
                })
            })

            const content = await rawResponse.json()
            console.log(content)
        },

        async cancel() {
            // TODO
        },

        async signin() {
            /* Validate email address. */
            if (!this.validateEmail()) return

            /* Validate embedded Web3 objects. */
            if (!window.ethereum && !window.bitcoin) {
                /* Validate embedded ethereum object. */
                if (window.bitcoin) {
                    console.info('Found Bitcoin provider.')
                } else if (window.ethereum) {
                    console.info('Found Ethereum provider.')
                } else {
                    return console.error('No Web3 provider found.')
                }
            }

            /* Connect accounts. */
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })
            // console.info('Connected Web3 accounts:', accounts)

            if (!accounts || accounts.length < 1) {
                return alert('Please connect your MetaMask account to continue.')
            }

            this.accounts = accounts
            console.log('ACCOUNTS', accounts)

            /* Set message name. */
            const name = 'Nexa Events'

            /* Set message version. */
            const version = require('../../package.json').version

            /* Set (connected) chain id. */
            const chainId = await signer.getChainId()
            // console.log('CHAIN ID', chainId);

            /* Set verifying contract. */
            // FIXME
            const verifyingContract = '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'

            /* Initialize the message domain. */
            const domain = {
                name,
                version,
                chainId,
                verifyingContract,
            }
            // console.log('DOMAIN', domain)

            /* Set the named list of all type definitions. */
            const types = {
                Profile: [
                    { name: 'account', type: 'address' },
                    { name: 'address', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'phone', type: 'string' },
                    { name: 'notes', type: 'string' },
                ],
                Notif: [
                    { name: 'profile', type: 'Profile' },
                    { name: 'action', type: 'string' },
                    { name: 'created', type: 'string' },
                    { name: 'expires', type: 'string' },
                ],
            }

            const profile = {
                account: this.accounts[0] || '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                address: this.address || 'n/a',
                email: this.email,
                phone: this.phone || 'n/a',
                notes: this.notes || 'n/a',
            }
            // console.log('PROFILE', profile)

            const action = 'signin_auth'
            const created = moment().format('lll ZZ')
            const expires = moment().add(7, 'days').format('lll ZZ')

            const notif = {
                profile,
                action,
                created,
                expires,
            }
            // console.log('NOTIF', notif)

            /* Create authentication package. */
            const auth = { ...notif }
            console.log('AUTH PACKAGE', auth)

            const signature = await signer
                ._signTypedData(domain, types, auth)
            console.log('SIGNATURE', signature)

            const rawResponse = await fetch('http://127.0.0.1:3000/v1/sessions', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auth,
                    signature,
                })
            })

            const content = await rawResponse.json()
            console.log(content)
        },

        /**
         * Validate Email
         *
         * TODO
         */
        validateEmail() {
            /* Validate email address. */
            if (!this.isEmailValid) {
                alert(`Oops! An email address is required to continue.`)

                return false
            }

            return true
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
