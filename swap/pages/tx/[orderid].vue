<script setup>
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'
import QRCode from 'qrcode'


const expirationTime = computed(() => {
    if (!expiresAt.value) {
        return 'n/a'
    }

    return moment(expiresAt.value).fromNow()
})

const paymentMax = computed(() => {
    if (maxDeposit.value && order.value) {
        return numeral(maxDeposit.value / 100.0).format('0,0.00') + ' ' + order.value.settleAsset
    }

    return 'n/a'
})

const receivedAmt = computed(() => {
    let amount

    if (order.value) {
        switch(order.value.depositAsset) {
        case 'BCH':
            amount = order.value.received / 100000000.0
            break
        case 'NEXA':
            amount = order.value.received / 100.0
            break
        default:
            amount = order.value.received
        }

        return numeral(amount).format('0,0.00[000000]') + ' ' + order.value.depositAsset
    }

    return 0
})

const depositAssetDisplay = computed(() => {
    if (order.value) {
        switch(order.value.depositAsset) {
        case 'BCH':
            return 'Bitcoin Cash (BCH)'
        case 'NEXA':
            return 'Nexa (NEXA)'
        default:
            return 'Unknown Asset'
        }
    }

    return 'Unknown Asset'
})


const dataUrl = ref(null)
const path = ref(null)
const order = ref(null)
const orderid = ref(null)
const depositAddress = ref(null)
const status = ref(null)
const expiresAt = ref(null)
const maxDeposit = ref(null)

/* Initialize route. */
const route = useRoute()
// console.log('ROUTE', route)

/* Set (route) path. */
path.value = route?.path
console.log('ROUTE PATH', path.value)

/* Set (route) path. */
orderid.value = route?.params.orderid
console.log('ROUTE PATH', orderid.value)


const init = async () => {
    /* Request order. */
    order.value = await $fetch('/api/order?id=' + orderid.value)
        .catch(err => console.error(err))
    console.log('ORDER', order.value)

    /* Set order id. */
    orderid.value = order.value?.orderid

    /* Set status. */
    status.value = order.value?.status

    maxDeposit.value = order.value?.maxDeposit

    expiresAt.value = order.value.expiresAt

    depositAddress.value = order.value.depositAddress
    generateQR(order.value.depositAddress)

    setInterval(startWatching, 5000)
}

const startWatching = async () => {
    console.log('watching...')

    /* Request order. */
    order.value = await $fetch('/api/order?id=' + orderid.value)
        .catch(err => console.error(err))
    console.log('ORDER', order.value)

    status.value = order.value.status

    expiresAt.value = order.value.expiresAt
}

/**
 * Generate QR Code
 *
 * @param {*} text
 */
const generateQR = async (text) => {
    try {
        dataUrl.value = await QRCode.toDataURL(text)
    } catch (err) {
        console.error(err)
    }
}

const makePayment = () => {
    // TODO Add deposit amount (using bip-21).
    window.location.href = depositAddress.value
}


onMounted(() => {
    /* Initialize monitoring. */
    init()
})
</script>

<template>
    <main class="mt-5 pb-10 flex flex-col space-y-5 items-center">
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

            <h2 class="text-base sm:text-2xl font-medium">
                {{orderid}}
            </h2>
        </div>

        <hr />

        <div v-if="status" class="flex flex-col items-center">
            <div
                v-if="status === 'COMPLETE'"
                class="absolute w-full h-full bg-white opacity-80 cursor-not-allowed z-10">
            </div>

            <button @click="makePayment" class="flex flex-col items-center">
                <img
                    v-if="dataUrl"
                    :src="dataUrl"
                    class="p-1 border-4 border-sky-500 w-full h-auto sm:w-64 sm:h-64 rounded-lg shadow"
                />

                <h2 v-if="depositAddress" class="my-3 text-sky-700 font-medium text-xs sm:text-base">
                    {{depositAddress}}
                </h2>
            </button>

            <p v-if="dataUrl" class="w-2/3 text-sm text-center cursor-help">
                Scan the QR Code or click on the {{depositAssetDisplay}} address above to launch your payment app.
            </p>
        </div>

        <div v-else>
            <h1 class="text-4xl text-gray-500 font-medium italic">
                Loading Your
                <br />Order Details...
            </h1>
        </div>

        <!-- Waiting message -->
        <section v-if="status === 'WAITING'" class="flex flex-col items-center">
            <h2 class="text-xl sm:text-2xl font-medium">
                Now <strong class="text-indigo-700">waiting</strong> for your payment
            </h2>

            <h2 class="text-xl sm:text-2xl font-medium">
                Send up to <strong class="text-indigo-700">{{paymentMax}}</strong> per swap
            </h2>

            <h3 class="text-base sm:text-lg font-medium">
                Expires <strong class="text-indigo-700">{{expirationTime}}</strong>
            </h3>
        </section>

        <!-- Waiting message -->
        <section v-if="status === 'CONFIRMING'" class="flex flex-col items-center">
            <h2 class="text-xl sm:text-2xl font-medium">
                Now <strong class="text-indigo-700">confirming</strong> your payment
            </h2>

            <h2 class="text-xl sm:text-2xl font-medium">
                Received <strong class="text-indigo-700">{{receivedAmt}}</strong>
            </h2>
        </section>

        <!-- Complete message -->
        <section v-if="status === 'COMPLETE'" class="flex flex-col items-center">
            <h3 class="text-2xl font-medium">
                Your swap is <strong class="text-indigo-700">complete!</strong>
            </h3>
        </section>

    </main>
</template>
