<script setup>
/* Import modules. */

import QrScanner from 'qr-scanner'

/* Initialize router. */
const router = useRouter()

const showPrev = () => {
    // alert('show last')
}

const showMore = () => {
    alert('Our team is hard at work! 💪\nMore assets are being added soon..')
}

/* Initialize Swap API endpoint. */
const ENDPOINT = 'https://nexa.exchange/v1/swap/'

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
    console.log('SETTLE ADDRESS CHANGED', _address)

    // FIXME: Verify that 20 chars is valid for all supported address formats.
    if (_address && _address.length > 20) {
        /* Request address validation. */
        validateAddress()
    }
})

const startNexa = () => {
    isShowingNexa.value = true
}

const startUSDT = () => {
    /* Request swap. */
    requestSwap(settleAddress.value)
}

const startBCH = () => {
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





</script>

<template>
    <main>
        <section>
            <DesktopSwap />
            <MobileSwap />
        </section>

        <div class="my-3 pr-3 flex justify-end">
            <a href="https://nexa.exchange" target="_blank" class="text-xs text-gray-300 hover:no-underline hover:bg-transparent">
                Powered by Nexa Exchange
            </a>
        </div>
    </main>
</template>
