<script setup>
import NavView from '@/components/NavView.vue'
import SendPreview from '@/components/SendPreview.vue'

import { ref } from 'vue'

import QRCode from 'qrcode'

const DONATION_ADDRESS = 'nexa:nqtsq5g5v80h5ky86u5uc8uuyjqtsmxgn9rver6hzhqx6qt9'

/* Initialize data URL. */
let dataUrl = ref('')

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

/* Generate code. */
generateQR(DONATION_ADDRESS)
</script>

<template>
    <main>
        <NavView />

        <h1 class="my-5 ml-3 text-3xl text-yellow-700 font-medium">
            Receive
        </h1>

        <img
            :src="dataUrl"
            class="m-5 w-48 h-48"
        />

        <h2 class="mt-3 text-xl">
            {{DONATION_ADDRESS}}
        </h2>

        <small>Development / donation address</small>
    </main>
</template>
