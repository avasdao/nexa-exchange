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

    setInterval(startWatching, MONITORING_INTERVAL)
}

const startWatching = async () => {
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
    <!--
    This example requires some changes to your config:

    ```
    // tailwind.config.js
    module.exports = {
        // ...
        plugins: [
        // ...
        require('@tailwindcss/forms'),
        ],
    }
    ```
    -->
    <header class="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div class="flex flex-1 items-center gap-x-6">
                <button type="button" class="-m-3 p-3 md:hidden">
                    <span class="sr-only">Open main menu</span>
                    <svg class="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            </div>
            <nav class="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
                <a href="#">Home</a>
                <a href="#">Invoices</a>
                <a href="#">Clients</a>
                <a href="#">Expenses</a>
            </nav>
            <div class="flex flex-1 items-center justify-end gap-x-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">View notifications</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                    </svg>
                </button>
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">Your profile</span>
                    <img class="h-8 w-8 rounded-full bg-gray-800" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </a>
            </div>
        </div>
        <!-- Mobile menu, show/hide based on menu open state. -->
        <div class="lg:hidden" role="dialog" aria-modal="true">
            <!-- Background backdrop, show/hide based on slide-over state. -->
            <div class="fixed inset-0 z-50"></div>
            <div class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                <div class="-ml-0.5 flex h-16 items-center gap-x-6">
                    <button type="button" class="-m-2.5 p-2.5 text-gray-700">
                        <span class="sr-only">Close menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div class="-ml-0.5">
                        <a href="#" class="-m-1.5 block p-1.5">
                            <span class="sr-only">Your Company</span>
                            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                        </a>
                    </div>
                </div>
                <div class="mt-2 space-y-2">
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</a>
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Invoices</a>
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Clients</a>
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Expenses</a>
                </div>
            </div>
        </div>
    </header>

    <main>
        <header class="relative isolate pt-16">
            <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                <div class="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                    <div
                        class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                        style="clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%);"
                    ></div>
                </div>
                <div class="absolute inset-x-0 bottom-0 h-px bg-gray-900/5"></div>
            </div>

            <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                    <div class="flex items-center gap-x-6">
                        <img src="https://tailwindui.com/img/logos/48x48/tuple.svg" alt="" class="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10" />
                        <h1>
                            <div class="text-sm leading-6 text-gray-500">Invoice <span class="text-gray-700">#00011</span></div>
                            <div class="mt-1 text-base font-semibold leading-6 text-gray-900">Tuple, Inc</div>
                        </h1>
                    </div>
                    <div class="flex items-center gap-x-4 sm:gap-x-6">
                        <button type="button" class="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">Copy URL</button>
                        <a href="#" class="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">Edit</a>
                        <a
                            href="#"
                            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Send
                        </a>

                        <div class="relative sm:hidden">
                            <button type="button" class="-m-3 block p-3" id="more-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="sr-only">More</span>
                                <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                </svg>
                            </button>

                            <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
                            <div
                                class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="more-menu-button"
                                tabindex="-1"
                            >
                                <!-- Active: "bg-gray-50", Not Active: "" -->
                                <button type="button" class="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="more-menu-item-0">Copy URL</button>
                                <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="more-menu-item-1">Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <!-- Invoice summary -->
                <div class="lg:col-start-3 lg:row-end-1">
                    <h2 class="sr-only">Summary</h2>
                    <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                        <dl class="flex flex-wrap">
                            <div class="flex-auto pl-6 pt-6">
                                <dt class="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                                <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
                            </div>
                            <div class="flex-none self-end px-6 pt-4">
                                <dt class="sr-only">Status</dt>
                                <dd class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">Paid</dd>
                            </div>
                            <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Client</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </dt>
                                <dd class="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                            </div>
                            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Due date</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </dt>
                                <dd class="text-sm leading-6 text-gray-500">
                                    <time datetime="2023-01-31">January 31, 2023</time>
                                </dd>
                            </div>
                            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Status</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </dt>
                                <dd class="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>
                            </div>
                        </dl>
                        <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
                            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Download receipt <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
                </div>

                <!-- Invoice -->
                <div class="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                    <h2 class="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
                    <dl class="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                        <div class="sm:pr-4">
                            <dt class="inline text-gray-500">Issued on</dt>
                            <dd class="inline text-gray-700"><time datetime="2023-23-01">January 23, 2023</time></dd>
                        </div>
                        <div class="mt-2 sm:mt-0 sm:pl-4">
                            <dt class="inline text-gray-500">Due on</dt>
                            <dd class="inline text-gray-700"><time datetime="2023-31-01">January 31, 2023</time></dd>
                        </div>
                        <div class="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                            <dt class="font-semibold text-gray-900">From</dt>
                            <dd class="mt-2 text-gray-500">
                                <span class="font-medium text-gray-900">Acme, Inc.</span><br />
                                7363 Cynthia Pass<br />
                                Toronto, ON N3Y 4H8
                            </dd>
                        </div>
                        <div class="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                            <dt class="font-semibold text-gray-900">To</dt>
                            <dd class="mt-2 text-gray-500">
                                <span class="font-medium text-gray-900">Tuple, Inc</span><br />
                                886 Walter Street<br />
                                New York, NY 12345
                            </dd>
                        </div>
                    </dl>
                    <table class="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                        <colgroup>
                            <col class="w-full" />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead class="border-b border-gray-200 text-gray-900">
                            <tr>
                                <th scope="col" class="px-0 py-3 font-semibold">Projects</th>
                                <th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">Hours</th>
                                <th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">Rate</th>
                                <th scope="col" class="py-3 pl-8 pr-0 text-right font-semibold">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-100">
                                <td class="max-w-0 px-0 py-5 align-top">
                                    <div class="truncate font-medium text-gray-900">Logo redesign</div>
                                    <div class="truncate text-gray-500">New logo and digital asset playbook.</div>
                                </td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">20.0</td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$2,000.00</td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="max-w-0 px-0 py-5 align-top">
                                    <div class="truncate font-medium text-gray-900">Website redesign</div>
                                    <div class="truncate text-gray-500">Design and program new company website.</div>
                                </td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">52.0</td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$5,200.00</td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="max-w-0 px-0 py-5 align-top">
                                    <div class="truncate font-medium text-gray-900">Business cards</div>
                                    <div class="truncate text-gray-500">Design and production of 3.5&quot; x 2.0&quot; business cards.</div>
                                </td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">12.0</td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$1,200.00</td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="max-w-0 px-0 py-5 align-top">
                                    <div class="truncate font-medium text-gray-900">T-shirt design</div>
                                    <div class="truncate text-gray-500">Three t-shirt design concepts.</div>
                                </td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">4.0</td>
                                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$400.00</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th scope="row" class="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">Subtotal</th>
                                <th scope="row" colspan="3" class="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell">Subtotal</th>
                                <td class="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">$8,800.00</td>
                            </tr>
                            <tr>
                                <th scope="row" class="pt-4 font-normal text-gray-700 sm:hidden">Tax</th>
                                <th scope="row" colspan="3" class="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell">Tax</th>
                                <td class="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">$1,760.00</td>
                            </tr>
                            <tr>
                                <th scope="row" class="pt-4 font-semibold text-gray-900 sm:hidden">Total</th>
                                <th scope="row" colspan="3" class="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell">Total</th>
                                <td class="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">$10,560.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="lg:col-start-3">
                    <!-- Activity feed -->
                    <h2 class="text-sm font-semibold leading-6 text-gray-900">Activity</h2>
                    <ul role="list" class="mt-6 space-y-6">
                        <li class="relative flex gap-x-4">
                            <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                <div class="w-px bg-gray-200"></div>
                            </div>
                            <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                            </div>
                            <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Chelsea Hagon</span> created the invoice.</p>
                            <time datetime="2023-01-23T10:32" class="flex-none py-0.5 text-xs leading-5 text-gray-500">7d ago</time>
                        </li>
                        <li class="relative flex gap-x-4">
                            <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                <div class="w-px bg-gray-200"></div>
                            </div>
                            <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                            </div>
                            <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Chelsea Hagon</span> edited the invoice.</p>
                            <time datetime="2023-01-23T11:03" class="flex-none py-0.5 text-xs leading-5 text-gray-500">6d ago</time>
                        </li>
                        <li class="relative flex gap-x-4">
                            <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                <div class="w-px bg-gray-200"></div>
                            </div>
                            <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                            </div>
                            <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Chelsea Hagon</span> sent the invoice.</p>
                            <time datetime="2023-01-23T11:24" class="flex-none py-0.5 text-xs leading-5 text-gray-500">6d ago</time>
                        </li>
                        <li class="relative flex gap-x-4">
                            <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                <div class="w-px bg-gray-200"></div>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                                class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                            />
                            <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                                <div class="flex justify-between gap-x-4">
                                    <div class="py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Chelsea Hagon</span> commented</div>
                                    <time datetime="2023-01-23T15:56" class="flex-none py-0.5 text-xs leading-5 text-gray-500">3d ago</time>
                                </div>
                                <p class="text-sm leading-6 text-gray-500">Called client, they reassured me the invoice would be paid by the 25th.</p>
                            </div>
                        </li>
                        <li class="relative flex gap-x-4">
                            <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                <div class="w-px bg-gray-200"></div>
                            </div>
                            <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                            </div>
                            <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Alex Curren</span> viewed the invoice.</p>
                            <time datetime="2023-01-24T09:12" class="flex-none py-0.5 text-xs leading-5 text-gray-500">2d ago</time>
                        </li>
                        <li class="relative flex gap-x-4">
                            <div class="absolute left-0 top-0 flex w-6 justify-center h-6">
                                <div class="w-px bg-gray-200"></div>
                            </div>
                            <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                <svg class="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Alex Curren</span> paid the invoice.</p>
                            <time datetime="2023-01-24T09:20" class="flex-none py-0.5 text-xs leading-5 text-gray-500">1d ago</time>
                        </li>
                    </ul>

                    <!-- New comment form -->
                    <div class="mt-6 flex gap-x-3">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            class="h-6 w-6 flex-none rounded-full bg-gray-50"
                        />
                        <form action="#" class="relative flex-auto">
                            <div class="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                <label for="comment" class="sr-only">Add your comment</label>
                                <textarea
                                    rows="2"
                                    name="comment"
                                    id="comment"
                                    class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Add your comment..."
                                ></textarea>
                            </div>

                            <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                                <div class="flex items-center space-x-5">
                                    <div class="flex items-center">
                                        <button type="button" class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                            <span class="sr-only">Attach a file</span>
                                        </button>
                                    </div>
                                    <div class="flex items-center">
                                        <div>
                                            <label id="listbox-label" class="sr-only">Your mood</label>
                                            <div class="relative">
                                                <button
                                                    type="button"
                                                    class="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                                    aria-haspopup="listbox"
                                                    aria-expanded="true"
                                                    aria-labelledby="listbox-label"
                                                >
                                                    <span class="flex items-center justify-center">
                                                        <!-- Placeholder label, show/hide based on listbox state. -->
                                                        <span>
                                                            <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                            <span class="sr-only">Add your mood</span>
                                                        </span>
                                                        <!-- Selected item label, show/hide based on listbox state. -->
                                                        <span>
                                                            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                                                                <svg class="h-5 w-5 flex-shrink-0 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <span class="sr-only">Excited</span>
                                                        </span>
                                                    </span>
                                                </button>

                                                <!--
                            Select popover, show/hide based on select state.

                            Entering: ""
                            From: ""
                            To: ""
                            Leaving: "transition ease-in duration-100"
                            From: "opacity-100"
                            To: "opacity-0"
                        -->
                                                <ul
                                                    class="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm"
                                                    tabindex="-1"
                                                    role="listbox"
                                                    aria-labelledby="listbox-label"
                                                    aria-activedescendant="listbox-option-5"
                                                >
                                                    <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "bg-gray-100", Not Highlighted: "bg-white"
                            -->
                                                    <li class="bg-white relative cursor-default select-none px-3 py-2" id="listbox-option-0" role="option">
                                                        <div class="flex items-center">
                                                            <div class="bg-red-500 flex h-8 w-8 items-center justify-center rounded-full">
                                                                <svg class="text-white h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span class="ml-3 block truncate font-medium">Excited</span>
                                                        </div>
                                                    </li>
                                                    <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "bg-gray-100", Not Highlighted: "bg-white"
                            -->
                                                    <li class="bg-white relative cursor-default select-none px-3 py-2" id="listbox-option-1" role="option">
                                                        <div class="flex items-center">
                                                            <div class="bg-pink-400 flex h-8 w-8 items-center justify-center rounded-full">
                                                                <svg class="text-white h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path
                                                                        d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span class="ml-3 block truncate font-medium">Loved</span>
                                                        </div>
                                                    </li>
                                                    <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "bg-gray-100", Not Highlighted: "bg-white"
                            -->
                                                    <li class="bg-white relative cursor-default select-none px-3 py-2" id="listbox-option-2" role="option">
                                                        <div class="flex items-center">
                                                            <div class="bg-green-400 flex h-8 w-8 items-center justify-center rounded-full">
                                                                <svg class="text-white h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span class="ml-3 block truncate font-medium">Happy</span>
                                                        </div>
                                                    </li>
                                                    <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "bg-gray-100", Not Highlighted: "bg-white"
                            -->
                                                    <li class="bg-white relative cursor-default select-none px-3 py-2" id="listbox-option-3" role="option">
                                                        <div class="flex items-center">
                                                            <div class="bg-yellow-400 flex h-8 w-8 items-center justify-center rounded-full">
                                                                <svg class="text-white h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.536-3.475a.75.75 0 001.061 0 3.5 3.5 0 014.95 0 .75.75 0 101.06-1.06 5 5 0 00-7.07 0 .75.75 0 000 1.06zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span class="ml-3 block truncate font-medium">Sad</span>
                                                        </div>
                                                    </li>
                                                    <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "bg-gray-100", Not Highlighted: "bg-white"
                            -->
                                                    <li class="bg-white relative cursor-default select-none px-3 py-2" id="listbox-option-4" role="option">
                                                        <div class="flex items-center">
                                                            <div class="bg-blue-500 flex h-8 w-8 items-center justify-center rounded-full">
                                                                <svg class="text-white h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path
                                                                        d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span class="ml-3 block truncate font-medium">Thumbsy</span>
                                                        </div>
                                                    </li>
                                                    <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "bg-gray-100", Not Highlighted: "bg-white"
                            -->
                                                    <li class="bg-white relative cursor-default select-none px-3 py-2" id="listbox-option-5" role="option">
                                                        <div class="flex items-center">
                                                            <div class="bg-transparent flex h-8 w-8 items-center justify-center rounded-full">
                                                                <svg class="text-gray-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path
                                                                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span class="ml-3 block truncate font-medium">I feel nothing</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Comment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>


    <main v-if="1 === 2" class="mt-5 pb-5 flex flex-col space-y-5 items-center">
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
    </main>
</template>
