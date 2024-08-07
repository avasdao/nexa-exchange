<script setup>
/* Import modules. */
import { decodeAddress } from '@nexajs/address'

const Router = useRouter()

const address = ref('')
const error = ref(null)

const loadAddress = () => {
    /* Re-initialize error. */
    error.value = null

    /* Validate address. */
    if (!address.value || address.value.trim() === '') {
        return
    }

    try {
        /* Decode address. */
        const decoded = decodeAddress(address.value.trim())

        /* Validate hash. */
        if (!decoded?.hash) {
            error.value = `Oops! The address you entered is invalid.`
            return
        }

        /* Go to address page. */
        Router.push('/address/' + address.value.trim())
    } catch (err) {
        console.error(err)
        error.value = err.message
    }
}
</script>

<template>
    <main class="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
        <div class="mx-auto max-w-7xl lg:px-8">
            <div class="lg:grid lg:grid-cols-2 lg:gap-8">
                <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                    <div class="lg:py-24">

                        <NuxtLink to="/help" class="hidden sm:inline-flex items-center rounded-full bg-black p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base">
                            <span class="rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                                Join our community
                            </span>

                            <span class="ml-4 text-sm">
                                Visit our Help &amp; Support page
                            </span>

                            <!-- Heroicon name: mini/chevron-right -->
                            <svg class="ml-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                        </NuxtLink>

                        <h1 class="mt-4 text-5xl font-bold tracking-tight text-white sm:mt-5 sm:text-7xl lg:mt-6">
                            <span class="block">Nexa Exchange</span>

                            <span class="mt-3 ml-10 text-3xl block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">
                                Your Keys.
                                <br />Your Coins.
                                <br />Since Block #1
                            </span>
                        </h1>

                        <p class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                            An open source suite of products and services allowing you to easily swap your precious assets <em>(from any place, at any time)</em> with the safety of a non-custodial wallet.
                        </p>

                        <div class="mt-10 sm:mt-12">
                            <div class="sm:flex">
                                <div class="min-w-0 flex-1">
                                    <label for="receiving-address" class="sr-only">Receiving address</label>

                                    <input
                                        id="receiving-address"
                                        type="text"
                                        placeholder="Enter your wallet address"
                                        v-model="address"
                                        @keyup="loadAddress"
                                        class="block w-full rounded-md border-0 px-4 py-3 text-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    />
                                </div>

                                <div class="mt-3 sm:mt-0 sm:ml-3">
                                    <button
                                        type="button"
                                        class="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 font-medium text-white text-2xl shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        @click="loadAddress"
                                    >
                                        Load Address
                                    </button>
                                </div>
                            </div>

                            <p class="my-2 text-lg text-rose-300 font-medium">
                                {{error}}
                            </p>

                            <p class="mt-3 text-sm text-gray-300 sm:mt-4">
                                Scan or enter your wallet address to begin the exchange process.
                                <br class="hidden sm:block" />By continuing, you agree to our <NuxtLink to="/tos" class="font-medium text-white">terms of service</NuxtLink>.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                    <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                        <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
                        <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
