<template>
    <main class="max-w-5xl mx-auto py-5 px-3">
        <h1 class="text-4xl font-medium text-indigo-600">
            Bootstrap Phase
        </h1>

        <h3 class="my-3 text-2xl font-medium">
            WARNING: BEWARE OF DRAGONS
        </h3>

        <p>
            At this stage, we are working directly with market makers and early adopters to flush out the bugs with the platform as we work our way down our <NuxtLink to="/roadmap" class="text-blue-500 font-medium hover:underline">Exchange Roadmap</NuxtLink>.
        </p>

        <section class="mt-5 ml-5">
            <p>
                Began on <span class="text-lg text-indigo-700 font-medium">Monday, November 21, 2022</span>
            </p>

            <p>
                Completed on <span class="text-lg text-indigo-700 font-medium">TBD</span>
            </p>
        </section>


        <section class="my-7 flex justify-between">
            <div class="p-7 flex flex-col items-center bg-sky-200 border-4 border-sky-500 rounded-xl">
                <h2 class="text-2xl text-sky-900 font-medium">
                    Price Floor
                </h2>

                <h1 class="text-4xl text-sky-700 font-medium">
                    $1.00 USDT
                </h1>
            </div>

            <div class="p-7 flex flex-col items-center bg-sky-200 border-4 border-sky-500 rounded-xl">
                <h2 class="text-2xl text-sky-900 font-medium">
                    Quantity Floor
                </h2>

                <h1 class="text-4xl text-sky-700 font-medium">
                    10,000,000 NEX
                </h1>
            </div>

            <div class="p-7 flex flex-col items-center bg-sky-200 border-4 border-sky-500 rounded-xl">
                <h2 class="text-2xl text-sky-900 font-medium">
                    Donation Pool
                </h2>

                <h1 class="text-4xl text-sky-700 font-medium">
                    100M NEX / DAY
                </h1>
            </div>
        </section>

        <section class="mt-5">
            <h2 class="text-2xl text-gray-700 font-medium">
                Price Floor
            </h2>

            <p class="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum doloremque perspiciatis neque optio voluptas placeat, nisi necessitatibus voluptatibus? Labore esse voluptate et modi dolore eveniet culpa corporis officiis accusantium nobis?
            </p>
        </section>

        <section class="mt-5">
            <h2 class="text-2xl text-gray-700 font-medium">
                Quantity Floor
            </h2>

            <p class="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi minus temporibus nihil quaerat cupiditate accusamus veniam ducimus quod ut aperiam veritatis ullam amet illo, expedita itaque ad repudiandae soluta eum!
            </p>
        </section>

        <section class="mt-5">
            <h2 class="text-2xl text-gray-700 font-medium">
                Donation Pool
            </h2>

            <p class="mt-3">
                In order to maintain a "sustainable" crypto exchange, we require consistent revenue.
                Our team will NOT take any profit from the exchange fees, which are designed to be as low as possible while still effectively mititating spam/attacks.
            </p>

            <p class="mt-3">
                Development will be supported by community donations which will then be sold on the Exchange.
                A current limit of <strong>100,000,000 NEX</strong> will be sold for each trading pair.
            </p>

            <div class="mt-5 py-3 px-5 sm:max-w-2xl mx-auto border-2 bg-red-50 border-red-500 rounded-xl">
                <h3 class="text-lg text-red-500 font-bold">
                    !! FRONTRUNNING ALERT !!
                </h3>

                <p>
                    Every 24 hours, the Donation Pool will be reset, then fully depleted, <strong>BEFORE ANY</strong> trade requests are paired with the active Order Book.
                </p>

                <p class="mt-3">
                    <span class="block font-bold uppercase text-sm">Please Note</span>
                    This funding mechanism is ONLY expected for the <strong>"bootstrapping"</strong> phase of the platform's development, but is subject to change.
                </p>
            </div>
        </section>
    </main>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
    // middleware: 'magic.auth',
    data: () => ({
        //
    }),
    head: () => ({
        title: 'Bootstrap Phase — Nexa Exchange',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'During the early days of Nexa Exchange development, we will follow a Bootstrapping strategy.'
            }
        ]
    }),
    computed: {
        // ...mapGetters({
        //     // panelIsShowing: 'system/getPanelState'
        // })
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
    methods: {
        //
    }
}
</script>
