<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const emit = defineEmits(['closeDrawer'])

const closeDrawer = () => {
    emit('closeDrawer')
}

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
        Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div @click="closeDrawer" class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
                <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                        <div class="mx-auto flex w-16 h-auto items-center justify-center">
                            <img src="https://i.ibb.co/5j3K9T0/image.png" class="w-full">
                        </div>

                        <div class="mt-3 text-center sm:mt-5">
                            <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                                Enter Your Card Details
                            </h3>

                            <p class="mt-2 px-2 text-sm text-gray-500">
                                Our partner will purchase your crypto and automatically send it to our Exchange for swapping to your requested asset.
                            </p>
                        </div>
                    </div>

                    <div class="mt-5 flex flex-col gap-3">
                        <button
                            class="inline-flex w-full justify-center rounded-md bg-indigo-200 px-3 py-2 text-xl font-semibold text-white shadow-sm"
                            disabled
                        >
                            Binance | BEP-20
                        </button>

                        <button
                            class="inline-flex w-full justify-center rounded-md bg-indigo-200 px-3 py-2 text-xl font-semibold text-white shadow-sm"
                            disabled
                        >
                            Ethereum | ERC-20
                        </button>

                        <button
                            @click="startTrc20Usdt"
                            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Tron | TRC-20
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
