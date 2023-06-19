<script setup>
import { ref } from 'vue'

let showFaq1 = ref(true)
let showFaq2 = ref(false)
let showFaq3 = ref(false)
let showFaq4 = ref(false)
let showFaq5 = ref(false)

const closeAll = () => {
    showFaq1.value = false
    showFaq2.value = false
    showFaq3.value = false
    showFaq4.value = false
    showFaq5.value = false
}
const toggle1 = () => {
    closeAll()
    showFaq1.value = !showFaq1.value
}
const toggle2 = () => {
    closeAll()
    showFaq2.value = !showFaq2.value
}
const toggle3 = () => {
    closeAll()
    showFaq3.value = !showFaq3.value
}
const toggle4 = () => {
    closeAll()
    showFaq4.value = !showFaq4.value
}
const toggle5 = () => {
    closeAll()
    showFaq5.value = !showFaq5.value
}

</script>

<template>
    <main class="max-w-7xl mx-auto h-full px-3 flex flex-col gap-5">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-3xl divide-y-2 divide-gray-200">
                <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Frequently Asked Questions
                </h2>

                <section class="py-5 flex flex-col items-center">
                    <h2 class="text-xl font-medium">
                        Contact our team 24x7x365
                    </h2>

                    <NuxtLink to="mailto:support@nexaexchange.com" class="text-xl font-medium text-blue-500 font-medium hover:underline">
                        support@nexaexchange.com
                    </NuxtLink>
                </section>

                <dl class="space-y-6 divide-y divide-gray-200">
                    <div class="pt-6">
                        <dt class="text-lg">
                            <!-- Expand/collapse question button -->
                            <button @click="toggle1" type="button" class="flex w-full items-start justify-between text-left text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">
                                    How long does it take to complete a Nexa swap?
                                </span>

                                <span class="ml-6 flex h-7 items-center">
                                    <svg class="h-6 w-6 transform" :class="[ showFaq1 ? 'rotate-0' : '-rotate-180' ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </dt>

                        <dd class="mt-2 pr-12" id="faq-0" v-if="showFaq1">
                            <p class="text-base text-gray-500">
                                The average $NEXA exchange will successfully complete within 5 seconds of receiving the payment funds — providing you with a transaction id and PDF receipt.
                            </p>
                        </dd>
                    </div>

                    <div class="pt-6">
                        <dt class="text-lg">
                            <!-- Expand/collapse question button -->
                            <button @click="toggle2" type="button" class="flex w-full items-start justify-between text-left text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">
                                    Which currencies do you support?
                                </span>

                                <span class="ml-6 flex h-7 items-center">
                                    <svg class="h-6 w-6 transform" :class="[ showFaq2 ? 'rotate-0' : '-rotate-180' ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </dt>

                        <dd class="mt-2 pr-12" id="faq-1" v-if="showFaq2">
                            <p class="text-base text-gray-500">
                                During this "Alpha Preview" phase, we are ONLY supporting Bitcoin Cash (BCH).
                            </p>
                        </dd>
                    </div>

                    <div class="pt-6">
                        <dt class="text-lg">
                            <!-- Expand/collapse question button -->
                            <button @click="toggle3" type="button" class="flex w-full items-start justify-between text-left text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">
                                    What is the maximum swap amount?
                                </span>

                                <span class="ml-6 flex h-7 items-center">
                                    <svg class="h-6 w-6 transform" :class="[ showFaq3 ? 'rotate-0' : '-rotate-180' ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </dt>

                        <dd class="mt-2 pr-12" id="faq-1" v-if="showFaq3">
                            <p class="text-base text-gray-500">
                                During this "Alpha Preview" phase, there is a US$100.00 limit per swap.
                                There is currently NO daily limit for swaps.
                            </p>
                        </dd>
                    </div>

                    <div class="pt-6">
                        <dt class="text-lg">
                            <!-- Expand/collapse question button -->
                            <button @click="toggle4" type="button" class="flex w-full items-start justify-between text-left text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">
                                    Can I "sell" $NEXA on the Nexa Swap platform?
                                </span>

                                <span class="ml-6 flex h-7 items-center">
                                    <svg class="h-6 w-6 transform" :class="[ showFaq4 ? 'rotate-0' : '-rotate-180' ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </dt>

                        <dd class="mt-2 pr-12" id="faq-1" v-if="showFaq4">
                            <p class="text-base text-gray-500">
                                During this "Alpha Preview" phase, we ONLY support "buying" $NEXA.
                                If you wish to sell $NEXA, please visit our <a href="https://app.nexa.exchange" target="_blank">Nexa Pro Exchange</a>.
                            </p>
                        </dd>
                    </div>

                    <div class="pt-6">
                        <dt class="text-lg">
                            <!-- Expand/collapse question button -->
                            <button @click="toggle5" type="button" class="flex w-full items-start justify-between text-left text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">
                                    Is the displayed exchange rate fixed?
                                </span>

                                <span class="ml-6 flex h-7 items-center">
                                    <svg class="h-6 w-6 transform" :class="[ showFaq5 ? 'rotate-0' : '-rotate-180' ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </dt>

                        <dd class="mt-2 pr-12" id="faq-1" v-if="showFaq5">
                            <p class="text-base text-gray-500">
                                NO!
                                The exchange rate will adjust based on "real-time" market conditions.
                                To view the LIVE marketplace, please visit our <a href="https://app.nexa.exchange" target="_blank">Nexa Pro Exchange</a>.
                            </p>
                        </dd>
                    </div>

                </dl>
            </div>
        </div>
    </main>
</template>
