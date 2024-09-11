<script setup lang="ts">
const emit = defineEmits(['close'])

const closer = () => {
    emit('close')
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
    <main class="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true" @click="closer">
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

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto" @keydown="closer">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-200">
                            <svg class="w-8 h-auto text-amber-600" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"></path>
                            </svg>
                        </div>

                        <div class="mt-3 text-center sm:mt-5">
                            <h2 class="text-2xl font-semibold leading-6 text-gray-700" id="modal-title">
                                Select An Asset
                            </h2>

                            <div class="mt-2">
                                <p class="text-sm text-gray-500 italic">
                                    Choose an asset for swaps and exploration...
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 grid grid-cols-3 gap-4 justify-around">
                        <NuxtLink to="/swap/NXL" class="p-3 flex flex-col items-center gap-2 border-2 border-transparent rounded-lg hover:bg-amber-100 hover:border-amber-300">
                            <img src="https://nexa.exchange/nxl.svg" class="w-20 h-auto" />

                            <span class="font-medium tracking-wider">
                                $NXL
                            </span>
                        </NuxtLink>

                        <NuxtLink to="/swap/NXY" class="p-3 flex flex-col items-center gap-2 border-2 border-transparent rounded-lg hover:bg-amber-100 hover:border-amber-300">
                            <img src="https://nxy.cash/icon.svg" class="w-20 h-auto" />

                            <span class="font-medium tracking-wider">
                                $NXY
                            </span>
                        </NuxtLink>

                        <NuxtLink to="/swap/STUDIO" class="p-3 flex flex-col items-center gap-2 border-2 border-transparent rounded-lg hover:bg-amber-100 hover:border-amber-300">
                            <img src="https://nexa.studio/icon.svg" class="w-20 h-auto" />

                            <span class="font-medium tracking-wider">
                                $STUDIO
                            </span>
                        </NuxtLink>

                        <NuxtLink to="/swap/AGNAR" class="p-3 flex flex-col items-center gap-2 border-2 border-transparent rounded-lg hover:bg-amber-100 hover:border-amber-300">
                            <img src="https://agnar.pages.dev/img/agnar.png" class="w-20 h-auto" />

                            <span class="font-medium tracking-wider">
                                $AGNAR
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
