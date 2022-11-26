<script setup>
import { ref } from 'vue'
import AssetButton from '../components/AssetButton.vue'

import QRCode from 'qrcode'
import QrScanner from 'qr-scanner'
QrScanner.WORKER_PATH = './js/qr-scanner-worker.min.js'

const showPrev = () => {
    // alert('show last')
}

const showMore = () => {
    // alert('show more')
    openScanner()
}

const ENDPOINT = 'https://api.telr.io/v1/concierge/'

let depositAddress = ref(null)
let swap = ref(null)
let amount = ref(0)
let dataUrl = ref('')

let showVideoPreview = null
let video = null
let scanner= null
let cameraError = false

/**
 * Generate QR Code
 *
 * @param {*} text
 */
 const generateQR = async text => {
    try {
        dataUrl.value = await QRCode.toDataURL(text)
    } catch (err) {
        console.error(err)
    }
}

const openScanner = () => {
    /* Start scanner. */
    startScanner()
}

const setReceiver = (_result) => {
    // console.log('SET DESTINATION', _result)

    /* Request swap. */
    requestSwap(_result)

    showVideoPreview = 'hidden'

    if (scanner) {
        scanner.destroy()
        scanner = null
    }

    /* Go to loan page. */
    // $router.push('/admin/loans/' + _result)
}

/**
 * Start Scanner
 *
 * NOTE: This DOES NOT work on any of the Android devices tested.
 *       However, it DOES work well on all iOS devices tested.
 */
const startScanner = async () => {
    if (scanner) {
        scanner.destroy()
        scanner = null

        showVideoPreview = 'hidden'

        return
    }

    try {
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia

        if (!navigator.mediaDevices.getUserMedia && !navigator.getUserMedia) {
            cameraError = true
        } else {
            /* Initialize video element. */
            video = document.getElementById('video-display')

            showVideoPreview = 'flex w-full mt-5 bg-gray-100 border-4 border-gray-300 p-2 rounded-xl z-10'

            scanner = new QrScanner(video, (_data) => {
                console.log('SCANNER DATA', _data)

                // FIXME: Build a new link parser
                const result = _data
                // const result = parseLink(_data)

                /* Validate (scanner) result. */
                if (result) {
                    setReceiver(result)
                }
            })

            /* Start scanner. */
            await scanner.start()
        }
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        cameraError = true

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

const requestSwap = async (_settleAddress) => {
    const rawResponse = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Telr-Address': '0x0',
        },
        body: JSON.stringify({
            method: 'swap',
            params: {
                settleAddress: _settleAddress,
                affiliateId: 'f3b91942-8a12-4c0e-9289-41578d203894',
                depositCoin: 'BCH',
                depositNetwork: 'mainnet',
                settleCoin: 'NEX',
                settleNetwork: 'mainnet',
                commissionRate: 0.001,
            }
        })
    })
    console.log('RAW RESPONSE', rawResponse)

    swap.value = await rawResponse.json()
    console.log('REQUEST SWAP', swap.value)

    depositAddress.value = swap.value.depositAddress
    generateQR(swap.value.depositAddress)
}

</script>

<template>
    <main>
        <section class="my-5 p-5 bg-gradient-to-r from-yellow-200 to-yellow-300 border-4 border-yellow-400 rounded-lg shadow-lg">
            <video :class="showVideoPreview" id="video-display" autoplay playsinline />
            <img
                :src="dataUrl"
                class="m-5 w-48 h-48"
            />

            <h2 class="mt-3 text-xl">
                {{depositAddress}}
            </h2>

            <h1 class="text-4xl font-bold">
                I want:
            </h1>

            <nav class="mt-5 flex">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showPrev">
                    <span class="ml-1 mb-3 text-7xl text-yellow-400">
                        ‹
                    </span>
                    <span class="text-xs text-yellow-400 font-bold">
                        SHOW<br />PREV
                    </span>
                </button>

                <ul class="flex gap-5">
                    <AssetButton
                        assetid="NEX"
                        asset-name="Nexa"
                    />

                    <AssetButton
                        assetid="BTC"
                        asset-name="Bitcoin"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                    />

                    <!-- <li>Tether (USDT)</li> -->
                    <!-- <li>USD Coin (USDC)</li> -->
                </ul>

                <button class="ml-3 flex items-center group" @click="showMore">
                    <span class="text-xs font-bold group-hover:text-cyan-600">
                        SHOW<br />MORE
                    </span>
                    <span class="ml-1 mb-3 text-7xl group-hover:text-cyan-400">
                        ›
                    </span>
                </button>
            </nav>
        </section>

        <section class="opacity-30 cursor-not-allowed my-5 p-5 bg-gradient-to-r from-sky-200 to-sky-300 border-4 border-sky-400 rounded-lg shadow-lg">
            <h1 class="text-4xl font-bold">
                I have:
            </h1>

            <nav class="mt-5 flex">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showPrev">
                    <span class="ml-1 mb-3 text-7xl text-sky-400">
                        ‹
                    </span>
                    <span class="text-xs text-sky-400 font-bold">
                        SHOW<br />PREV
                    </span>
                </button>

                <ul class="flex gap-5">
                    <AssetButton
                        assetid="BTC"
                        asset-name="Bitcoin"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                    />

                    <AssetButton
                        assetid="CASH"
                        asset-name="Ca$h Money"
                    />
                </ul>

                <button class="ml-3 flex items-center group" @click="showMore">
                    <span class="text-xs font-bold group-hover:text-cyan-600">
                        SHOW<br />MORE
                    </span>
                    <span class="ml-1 mb-3 text-7xl group-hover:text-cyan-400">
                        ›
                    </span>
                </button>
            </nav>
        </section>

        <div class="pr-3 flex justify-end">
            <a href="https://telr.io" target="_blank" class="text-xs text-gray-300 hover:no-underline hover:bg-transparent">
                Powered by TΞLR Concierge
            </a>
        </div>
    </main>
</template>
