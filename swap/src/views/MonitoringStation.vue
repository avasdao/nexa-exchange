<template>
    <main class="mt-5 flex flex-col space-y-5 items-center">
        <h1 class="text-4xl sm:text-4xl text-gray-500 font-medium text-center tracking-widest">
            Monitoring Station
        </h1>

        <p class="sm:w-2/3 text-red-500 font-medium text-center cursor-help">
            Please <strong>SAVE</strong> or <strong>BOOKMARK</strong> this page to easily track your order status and tx details.
        </p>

        <div class="flex flex-col items-center">
            <small class="text-gray-500 font-medium uppercase">
                Your Order ID
            </small>

            <h2 class="text-2xl font-medium">
                {{orderid}}
            </h2>
        </div>

        <hr />

        <div v-if="status" class="flex flex-col items-center">
            <div
                v-if="status === 'complete'"
                class="absolute w-full h-full bg-white opacity-80 cursor-not-allowed z-10">
            </div>

            <button @click="makePayment" class="flex flex-col items-center">
                <img
                    v-if="dataUrl"
                    :src="dataUrl"
                    class="p-1 border-4 border-sky-500 w-64 h-64 rounded-lg shadow"
                />

                <h2 v-if="depositAddress" class="my-3 text-sky-700 font-medium text-xs sm:text-base">
                    {{depositAddress}}
                </h2>
            </button>

            <p v-if="dataUrl" class="w-2/3 text-sm text-center cursor-help">
                Scan the QR Code or click on the Bitcoin Cash (BCH) address above to launch your payment app.
            </p>
        </div>

        <div v-else>
            <h1 class="text-4xl text-gray-500 font-medium italic">
                Loading Your
                <br />Order Details...
            </h1>
        </div>

        <!-- Waiting message -->
        <section v-if="status === 'waiting'" class="flex flex-col items-center">
            <h3 class="text-2xl font-medium">
                Now <strong class="text-indigo-700">waiting</strong> for your payment
            </h3>

            <h3 class="text-lg font-medium">
                Expires <strong class="text-indigo-700">{{expirationTime}}</strong>
            </h3>
        </section>

        <!-- Complete message -->
        <section v-if="status === 'complete'" class="flex flex-col items-center">
            <h3 class="text-2xl font-medium">
                Your swap is <strong class="text-indigo-700">complete!</strong>
            </h3>
        </section>

    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'
import QRCode from 'qrcode'

/* Set API endpoint. */
const API_ENDPOINT = 'https://api.nexa.exchange/v1/swaps'

export default {
    data: () => ({
        orderid: null,
        depositAddress: null,
        swap: null,
        amount: null,
        dataUrl: null,
        status: null,
        expiresAt: null,

        showVideoPreview: null,
        video: null,
        scanner: null,
        cameraError: null,
    }),
    computed: {
        expirationTime () {
            if (!this.expiresAt) {
                return 'n/a'
            }

            return moment(this.expiresAt).fromNow()
        }
    },
    methods: {
        async init () {
            const response = await fetch(`${API_ENDPOINT}/${this.orderid}`)
            const order = await response.json()
            console.log('ORDER', order)

            this.depositAddress = order.depositAddress
            this.generateQR(order.depositAddress)

            setInterval(this.startWatching, 5000)
        },

        async startWatching () {
            console.log('watching...')

            const response = await fetch(`${API_ENDPOINT}/${this.orderid}`)
            const order = await response.json()

            this.status = order.status
            this.expiresAt = order.expiresAt
        },

        /**
         * Generate QR Code
         *
         * @param {*} text
         */
        async generateQR (text) {
            try {
                this.dataUrl = await QRCode.toDataURL(text)
            } catch (err) {
                console.error(err)
            }
        },

        makePayment () {
            // window.location.href = `${this.depositAddress}&label=Nexa Exchange`
            window.location.href = this.depositAddress
        }
    },
    created: function () {
        const route = this.$route
        const path = route.path

        this.orderid = path.slice(1)
        console.log('Order ID', this.orderid)

        this.init()
    },
    mounted: function () {
        //
    },
}
</script>
