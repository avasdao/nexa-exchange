<script setup lang="ts">
useHead({
    title: 'WiserSwap — Trade Nexa Tokens & NFTs',
    meta: [
        { name: 'description', content: 'Trade Nexa tokens and NFTs trustlessly and instantly.' }
    ],
})

/* Initialize runtime config. */
const runtimeConfig = useRuntimeConfig()

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

onBeforeMount(() => {
    // TODO Move this block to @nexajs/app
    try {
        Profile.$state = JSON.parse(localStorage.getItem('profile'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        System.$state = JSON.parse(localStorage.getItem('system'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        Wallet.$state = JSON.parse(localStorage.getItem('wallet'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        // add additional states here...
    } catch (err) {
        console.error(err)
    }
})

// TODO Move this block to @nexajs/app
watch([Profile.$state, System.$state, Wallet.$state], (_state) => {
    localStorage.setItem('profile',
        JSON.stringify(_state[0], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('system',
        JSON.stringify(_state[1], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('wallet',
        JSON.stringify(_state[2], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    // watch additional states here...
})

onMounted(async () => {
    /* Initailize system. */
    System.init()

    /* Initialize profile. */
    // await Profile.init()

    /* Initialize wallet. */
    Wallet.init()

    console.log('API_ENDPOINT', runtimeConfig?.public?.API_ENDPOINT)
    console.log('API_ENDPOINT_RAW', runtimeConfig?.public?.API_ENDPOINT_RAW)
    console.log('API_ENDPOINT_NUXT', runtimeConfig?.public?.API_ENDPOINT_NUXT)
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <Header />

    <div class="master overflow-x-hidden">
        <slot />
    </div>
</template>

<style>
.max-lines-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
    -webkit-box-orient: vertical;
}
.max-lines-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
            line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>
