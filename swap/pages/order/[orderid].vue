<script setup>
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'
import QRCode from 'qrcode'


const MONITORING_INTERVAL = 3000

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
console.log('ORDER ID', orderid.value)


const init = async () => {
    /* Request order. */
    order.value = await $fetch(`/api/order?id=${orderid.value}`)
        .catch(err => console.error(err))
    console.log('ORDER', order.value)

    /* Set order id. */
    orderid.value = order.value?.orderid

    /* Set status. */
    status.value = order.value?.status

    maxDeposit.value = order.value?.maxDeposit

    expiresAt.value = order.value.expiresAt

    depositAddress.value = order.value.depositAddress

    generateQR(`order.value.depositAddress?amount=1.337`)

    setInterval(startWatching, MONITORING_INTERVAL)
}

const startWatching = async () => {
    /* Request order. */
    order.value = await $fetch(`/api/order?id=${orderid.value}`)
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


const depositAddressAbbr = computed(() => {
    if (depositAddress.value) {
        return depositAddress.value.slice(0, 18) + ' ... ' + depositAddress.value.slice(-8)
    }

    return 'n/a'
})


const paymentMax = computed(() => {
    if (maxDeposit.value && order.value) {
        let amount

        if (order.value) {
            switch(order.value.depositAsset) {
            case 'BCH':
                amount = maxDeposit.value / 100000000.0
                break
            case 'NEXA':
                amount = maxDeposit.value / 100.0
                break
            default:
                amount = maxDeposit.value
            }

            return numeral(amount).format('0,0.00') + ' ' + order.value.depositAsset
        }
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
        case 'DASH':
            amount = order.value.received / 100000000.0
            break
        case 'NEXA':
            amount = order.value.received / 100.0
            break
        case 'TRX_USDT':
            amount = order.value.received / 1000000.0
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
        case 'DASH':
            return 'Dash (DASH)'
        case 'NEXA':
            return 'Nexa (NEXA)'
        case 'TRX_USDT':
            return 'Tether (USDT)'
        default:
            return 'Unknown Asset'
        }
    }

    return 'Unknown Asset'
})


onMounted(() => {
    /* Initialize monitoring. */
    init()
})
</script>

<template>

<main class="mt-5 pb-5 flex flex-col space-y-5 items-center">
        <h1 class="text-4xl sm:text-4xl text-gray-500 font-medium text-center tracking-widest">
            Monitoring Station
        </h1>

        <p class="sm:w-2/3 text-red-500 font-medium text-center cursor-help">
            Please <strong>SAVE</strong> or <strong>BOOKMARK</strong> this page to easily track your order status and tx details.
        </p>

        <div class="flex flex-col items-center">
            <small class="text-2xl text-gray-500 font-medium uppercase">
                Your Order ID
            </small>

            <h2 class="text-base sm:text-2xl text-gray-700 font-medium">
                {{orderid}}
            </h2>
        </div>

        <hr />

        <div v-if="status === null">
            <h1 class="text-4xl text-gray-500 font-medium text-center">
                Loading Your
                <br />Order Details...
            </h1>
        </div>

        <div v-if="status === 'WAITING'" class="flex flex-col items-center">
            <button @click="makePayment" class="px-5 w-full flex flex-col items-center">
                <img
                    v-if="dataUrl"
                    :src="dataUrl"
                    class="p-1 border-4 border-sky-500 w-full h-auto sm:w-96 sm:h-auto rounded-lg shadow"
                />

                <h2 v-if="depositAddress" class="my-3 text-sky-700 font-medium">
                    <span class="sm:hidden text-xl">
                        {{depositAddressAbbr}}
                    </span>

                    <span class="hidden sm:inline text-lg">
                        {{depositAddress}}
                    </span>
                </h2>
            </button>

            <p v-if="dataUrl" class="w-2/3 text-sm text-center cursor-help">
                Scan the QR Code or click on the <span class="text-base text-indigo-500 font-medium">{{depositAssetDisplay}}</span> address above to launch your payment app.
            </p>
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
                Expires <strong class="text-indigo-700">{{moment(expiresAt).fromNow()}}</strong>
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
        <!-- Complete message -->
        <section v-if="status === 'EXPIRED'" class="flex flex-col items-center">
            <h3 class="text-3xl text-gray-500 font-medium text-center">
                Your order request has
                <span class="block text-5xl text-rose-500 font-bold uppercase">expired</span>
            </h3>
        </section>

        <section class="">
            <OrderDetails />

            <div class="m-5 border-t border-gray-300" />

            <OrderActivity />

            <div class="m-5 border-t border-gray-300" />

            <OrderSupport />
        </section>
    </main>
</template>
