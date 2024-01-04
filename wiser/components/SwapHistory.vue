<script setup lang="ts">
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const txHistory = ref(null)

const init = async () => {
    txHistory.value = []

    txHistory.value.push({
        txidem: 'ec8694604ff74eb8ca0e43f5c6a343cb26de4bf35c1c25f4b785c06d480a7846',
        quote: {
            ticker: 'STUDIO',
            quantity: 100542,
        },
        usdValue: '$625.75',
        timestamp: 1704346054,
    })

    txHistory.value.push({
        txidem: '25b3f270b8015c14c0797f25d7285e20c0d1a32b50db323484171ca7f249038f',
        quote: {
            ticker: 'STUDIO',
            quantity: 710038,
        },
        usdValue: '$1,925.75',
        timestamp: 1704164063,
    })
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="w-full px-3 sm:px-10">
        <ul role="list" class="divide-y divide-amber-300">

            <li v-for="swap of txHistory" :key="swap.txidem" class="py-4">
                <Nuxt :to="'https://explorer.nexa.org/tx/' + swap.txidem" target="_blank" class="px-1 grid grid-cols-4 gap-x-3 items-center">
                    <div class="col-span-2 flex flex-row items-center gap-2">
                        <img src="https://nexa.studio/icon.svg" alt="" class="w-8 h-auto flex-none" />

                        <h3 class="flex-auto truncate text-sm font-medium text-gray-400">
                            <span class="text-lg text-semibold text-gray-600 tracking-widest">
                                {{numeral(swap.quote.quantity).format('0,0[.]00')}}
                            </span>

                            ${{swap.quote.ticker}}
                        </h3>
                    </div>

                    <h3 class="flex truncate text-base font-bold text-rose-600 justify-center tracking-widest">
                        {{swap.usdValue}}
                    </h3>

                    <time datetime="2023-01-23T11:00" class="flex justify-end text-xs text-gray-500 italic">
                        {{moment.unix(swap.timestamp).fromNow()}}
                    </time>
                </Nuxt>
            </li>

        </ul>
    </main>
</template>
