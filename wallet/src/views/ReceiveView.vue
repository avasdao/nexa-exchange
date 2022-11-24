<script setup>
import NavView from '@/components/NavView.vue'
import SendPreview from '@/components/SendPreview.vue'

import { ref } from 'vue'

import QRCode from 'qrcode'

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
generateQR('nexa:')
</script>

<template>
    <main>
        <NavView />

        <h1>Receive</h1>

        <img :src="dataUrl" class="w-48 h-48" />
    </main>
</template>
