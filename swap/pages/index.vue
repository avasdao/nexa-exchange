<script setup>
/* Initialize router. */
const router = useRouter()


/* Watch the settle address for "instant" handling of changes. */
// NOTE: Watch is necessary to detect "pasting" on mobile.
// watch(settleAddress, (_address) => {
//     console.log('SETTLE ADDRESS CHANGED', _address)

//     // FIXME: Verify that 20 chars is valid for all supported address formats.
//     if (_address && _address.length > 20) {
//         /* Request address validation. */
//         validateAddress()
//     }
// })
</script>

<template>
    <main>
        <section>
            <!-- <DesktopSwap /> -->
            <MobileSwap />
        </section>

        <div class="my-3 pr-3 flex justify-end">
            <a href="https://nexa.exchange" target="_blank" class="text-xs text-gray-300 hover:no-underline hover:bg-transparent">
                Powered by Nexa Exchange
            </a>
        </div>
    </main>
</template>
