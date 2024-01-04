<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const emits = defineEmits(['close'])

const close = () => {
    emits('close')
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
    <main class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-600">
                            <svg class="h-8 w-8 text-amber-100" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"></path>
                            </svg>
                        </div>

                        <div class="mt-3 text-center sm:mt-5">
                            <h2 class="text-3xl font-light leading-6 text-gray-700 tracking-widest" id="modal-title">
                                Swap Settings
                            </h2>

                            <div class="mt-5">
    <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium leading-6 text-amber-600">
            Slippage Manager
        </h2>

        <a href="javascript://" class="text-sm font-medium leading-6 text-amber-600 hover:text-amber-500">
            See history
        </a>
    </div>

    <fieldset class="mt-2">
        <legend class="sr-only">Choose a memory option</legend>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <!--
        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
        Active: "ring-2 ring-amber-600 ring-offset-2"
        Checked: "bg-amber-600 text-white hover:bg-amber-500", Not Checked: "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50"
      -->
            <label class="flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none">
                <input type="radio" name="memory-option" value="4 GB" class="sr-only" aria-labelledby="memory-option-0-label" />
                <span id="memory-option-0-label">0.1%</span>
            </label>
            <!--
        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
        Active: "ring-2 ring-amber-600 ring-offset-2"
        Checked: "bg-amber-600 text-white hover:bg-amber-500", Not Checked: "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50"
      -->
            <label class="flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none">
                <input type="radio" name="memory-option" value="8 GB" class="sr-only" aria-labelledby="memory-option-1-label" />
                <span id="memory-option-1-label">0.5%</span>
            </label>
            <!--
        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
        Active: "ring-2 ring-amber-600 ring-offset-2"
        Checked: "bg-amber-600 text-white hover:bg-amber-500", Not Checked: "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50"
      -->
            <label class="flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none">
                <input type="radio" name="memory-option" value="16 GB" class="sr-only" aria-labelledby="memory-option-2-label" />
                <span id="memory-option-2-label">1%</span>
            </label>
            <!--
        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
        Active: "ring-2 ring-amber-600 ring-offset-2"
        Checked: "bg-amber-600 text-white hover:bg-amber-500", Not Checked: "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50"
      -->
            <label class="flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none">
                <input type="radio" name="memory-option" value="32 GB" class="sr-only" aria-labelledby="memory-option-3-label" />
                <span id="memory-option-3-label">[input]</span>
            </label>

        </div>
    </fieldset>
</div>

<hr class="my-3" />

                            <fieldset>
    <legend class="text-base font-medium leading-6 text-amber-600 tracking-widest">
        Rewards Priority
    </legend>

    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <!-- Active: "border-amber-600 ring-2 ring-amber-600", Not Active: "border-gray-300" -->
        <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
            <input type="radio" name="project-type" value="Newsletter" class="sr-only" aria-labelledby="project-type-0-label" aria-describedby="project-type-0-description-0 project-type-0-description-1" />
            <span class="flex flex-1">
                <span class="flex flex-col">
                    <span id="project-type-0-label" class="block text-base font-medium text-gray-700">Lowest Fees</span>
                    <span id="project-type-0-description-1" class="mt-1 text-base font-medium text-rose-600">save up to 8.5%</span>
                    <span id="project-type-0-description-0" class="mt-1 flex items-center text-sm text-gray-500 italic">last activity an hour ago</span>
                </span>
            </span>
            <!-- Not Checked: "invisible" -->
            <svg class="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <!--
        Active: "border", Not Active: "border-2"
        Checked: "border-amber-600", Not Checked: "border-transparent"
      -->
            <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
        </label>

        <!-- Active: "border-amber-600 ring-2 ring-amber-600", Not Active: "border-gray-300" -->
        <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
            <input type="radio" name="project-type" value="Existing Customers" class="sr-only" aria-labelledby="project-type-1-label" aria-describedby="project-type-1-description-0 project-type-1-description-1" />
            <span class="flex flex-1">
                <span class="flex flex-col">
                    <span id="project-type-1-label" class="block text-base font-medium text-gray-700">Maximum Rewards</span>
                    <span id="project-type-1-description-1" class="mt-1 text-base font-medium text-rose-600">up to 5K $STUDIO</span>
                    <span id="project-type-1-description-0" class="mt-1 flex items-center text-sm text-gray-500 italic">last activity 2 weeks ago</span>
                </span>
            </span>
            <!-- Not Checked: "invisible" -->
            <svg class="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <!--
        Active: "border", Not Active: "border-2"
        Checked: "border-amber-600", Not Checked: "border-transparent"
      -->
            <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
        </label>

    </div>
</fieldset>



                            <div class="mt-2">
                                <p class="text-sm text-amber-700 font-semi-bold italic">
                                    You can save your preferred defaults from your Profile page.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-6">
                        <button
                            @click="close"
                            type="button"
                            class="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-3 text-3xl font-medium text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                            Save &amp; Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
