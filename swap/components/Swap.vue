<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import AssetButton from './AssetButton.vue'

import QrScanner from 'qr-scanner'
// QrScanner.WORKER_PATH = './js/qr-scanner-worker.min.js'

/* Initialize router. */
const router = useRouter()

const showPrev = () => {
    // alert('show last')
}

const showMore = () => {
    alert('Our team is hard at work! 💪\nMore assets are being added soon..')
}

const ENDPOINT = 'https://api.telr.io/v1/concierge/'

// let depositAddress = ref(null)
let settleAddress = ref(null)
// let swap = ref(null)
// let amount = ref(0)
// let dataUrl = ref('')
let showVideoPreview = ref(false)
let videoPreviewClass = ref(null)
let isShowingNexa = ref(false)
let isValidAddress = ref(false)

let video = null
let scanner = null
let cameraError = false

/* Watch the settle address for "instant" handling of changes. */
// NOTE: Watch is necessary to detect "pasting" on mobile.
watch(settleAddress, (_address) => {
    // console.log('SETTLE ADDRESS CHANGED', _address)

    // FIXME: Verify that 20 chars is valid for all supported address formats.
    if (_address && _address.length > 20) {
        /* Request address validation. */
        validateAddress()
    }
})

const startNexa = () => {
    isShowingNexa.value = true
}

const startBitcoinCash = () => {
    /* Request swap. */
    requestSwap(settleAddress.value)
}

const openScanner = () => {
    showVideoPreview.value = true

    setTimeout(() => {
        /* Start scanner. */
        startScanner()
    }, 100)
}

const setReceiver = (_result) => {
    // console.log('SET DESTINATION', _result)

    // showVideoPreview = 'hidden'
    showVideoPreview.value = false

    if (scanner) {
        scanner.destroy()
        scanner = null
    }
}

/**
 * Start Scanner
 *
 * NOTE: This DOES NOT work on any of the Android devices tested.
 *       However, it DOES work well on all iOS devices tested.
 */
const startScanner = async () => {
    console.log('SCANNER', scanner)
    if (scanner) {
        scanner.destroy()
        scanner = null

        // showVideoPreview = 'hidden'
        showVideoPreview.value = false

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

            videoPreviewClass.value = 'flex w-full bg-yellow-300 border-4 border-yellow-500 p-1 rounded z-10'

            scanner = new QrScanner(video, (_data) => {
                console.log('SCANNER DATA', _data)

                // FIXME: Build a new link parser
                const address = _data
                // const address = parseLink(_data)

                /* Validate (scanner) address. */
                if (address) {
                    settleAddress.value = address

                    setReceiver(address)
                }

                // validateAddress(address)
                validateAddress()
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

    const response = await rawResponse.json()
    console.log('REQUEST SWAP', response)

    /* Load monitoring page. */
    router.push('/' + response.id)
}

/**
 * Validate Address
 *
 * Makes a remote call to the the Core endpoint of the API.
 */
 const validateAddress = async () => {
    if (!settleAddress.value || settleAddress.value === '') {
        return false
    }

    const endpoint = 'https://api.nexa.exchange/v1/core/'

    const rawResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'validateaddress',
            params: [settleAddress.value]
        })
    })

    const content = await rawResponse.json()
    // console.log('CONTENT', content)

    if (!content) {
        console.error('API ERROR!')

        return false
    }

    /* Validate address. */
    if (content.isvalid) {
        /* Set address flag. */
        isValidAddress.value = true
    }

    // return content
}

</script>

<template>
    <main>
        <section class="my-5 p-5 bg-gradient-to-r from-yellow-200 to-yellow-300 border-4 border-yellow-400 rounded-lg shadow-lg">
            <video
                v-if="showVideoPreview"
                :class="videoPreviewClass"
                id="video-display"
                autoplay
                playsinline
            ></video>

            <h1 class="mt-3 text-4xl font-bold">
                I want:
            </h1>

            <nav class="mt-5 flex flex-col sm:flex-row">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showPrev">
                    <span class="ml-1 mb-3 text-7xl text-yellow-400">
                        ‹
                    </span>
                    <span class="text-xs text-yellow-400 font-bold">
                        SHOW<br />PREV
                    </span>
                </button>

                <ul class="flex flex-col sm:flex-row gap-5">
                    <AssetButton
                        @click="startNexa"
                        assetid="NEX"
                        asset-name="Nexa"
                        class="w-full sm:w-36"
                    />

                    <AssetButton
                        assetid="BTC"
                        asset-name="Bitcoin"
                        class="w-full sm:w-36 opacity-50 cursor-not-allowed"
                    />

                    <AssetButton
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                        class="w-full sm:w-36 opacity-50 cursor-not-allowed"
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

            <div
                v-if="isShowingNexa"
                class="mt-7 flex flex-row gap-4"
                :class="[ isValidAddress ? 'opacity-30' : 'opacity-100' ]"
            >
                <input
                    type="text"
                    placeholder="Type or paste your :nexa address"
                    v-model="settleAddress"
                    :disabled="isValidAddress"
                    class="px-3 py-1 w-full border-2 border-yellow-500 text-xl rounded"
                />

                <button
                    @click="openScanner"
                    :disabled="isValidAddress"
                >
                    <svg class="w-12 h-12 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                </button>
            </div>

        </section>

        <section
            class="my-5 p-5 bg-gradient-to-r from-sky-200 to-sky-300 border-4 border-sky-400 rounded-lg shadow-lg"
            :class="[ isValidAddress ? 'opacity-100' : 'opacity-30 cursor-not-allowed']"
        >
            <h1 class="text-4xl font-bold">
                I have:
            </h1>

            <nav class="mt-5 flex flex-col sm:flex-row">
                <button class="mr-3 flex items-center group cursor-not-allowed" @click="showPrev">
                    <span class="ml-1 mb-3 text-7xl text-sky-400">
                        ‹
                    </span>
                    <span class="text-xs text-sky-400 font-bold">
                        SHOW<br />PREV
                    </span>
                </button>

                <ul class="flex flex-col sm:flex-row gap-5">
                    <AssetButton
                        assetid="BTC"
                        asset-name="Bitcoin"
                        class="w-full sm:w-36 opacity-50 cursor-not-allowed"
                    />

                    <AssetButton
                        @click="startBitcoinCash"
                        assetid="BCH"
                        asset-name="Bitcoin Cash"
                        class="w-full sm:w-36"
                        :class="[ isValidAddress ? 'opacity-100' : 'opacity-50 cursor-not-allowed']"
                    />

                    <AssetButton
                        assetid="CASH"
                        asset-name="Ca$h Money"
                        class="w-full sm:w-36 opacity-50 cursor-not-allowed"
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
