<script setup lang="ts">
useHead({
    title: 'Mastercard — Nexa Swap',
    meta: [
        { name: 'description', content: 'Nexa Studio makes building your next BIG idea effortless.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

onBeforeMount(() => {
    System.$state = JSON.parse(localStorage.getItem('system'))
    // add additional states here...
})

watch(System.$state, (_state) => {
    localStorage.setItem('system', JSON.stringify(_state))
})
// watch additional states here...

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
    <main class="max-w-7xl mx-auto h-full px-3 flex flex-col gap-5">
        <div class="px-2 py-2 border-2 border-amber-300 shadow-md aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
            <img
                src="https://i.ibb.co/68w6MYH/image.png"
                alt="Mastercard"
                class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
        </div>

        <section class="mt-0 px-3 flex flex-col">
            <h3 class="text-xl text-gray-700">
                Mastercard Virtual Gift Card
            </h3>

            <div>
                <label for="price" class="block text-lg font-medium leading-6 text-gray-400 text-left">
                    Select an amount
                </label>
            </div>
        </section>

        <div class="w-full">
            <div class="relative">
                <button
                    type="button"
                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                >
                    <span class="block truncate">
                        $50
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                <!--
            Select popover, show/hide based on select state.

            Entering: ""
                From: ""
                To: ""
            Leaving: "transition ease-in duration-100"
                From: "opacity-100"
                To: "opacity-0"
            -->
                <ul
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    tabindex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                >
                    <!--
                Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
            -->
                    <li class="text-gray-900 relative cursor-default select-none py-2 pl-8 pr-4" id="listbox-option-0" role="option">
                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                        <span class="font-normal block truncate">$10</span>

                        <span class="text-white absolute inset-y-0 left-0 flex items-center pl-1.5">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </li>

                    <li class="text-gray-900 relative cursor-default select-none py-2 pl-8 pr-4" id="listbox-option-0" role="option">
                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                        <span class="font-normal block truncate">$20</span>

                        <span class="text-white absolute inset-y-0 left-0 flex items-center pl-1.5">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </li>

                    <li class="bg-indigo-600 text-white relative cursor-default select-none py-2 pl-8 pr-4" id="listbox-option-0" role="option">
                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                        <span class="font-normal block truncate">$50</span>

                        <span class="text-white absolute inset-y-0 left-0 flex items-center pl-1.5">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </li>

                    <li class="text-gray-900 relative cursor-default select-none py-2 pl-8 pr-4" id="listbox-option-0" role="option">
                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                        <span class="font-normal block truncate">$100</span>

                        <span class="text-white absolute inset-y-0 left-0 flex items-center pl-1.5">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </li>

                    <!-- More items... -->
                </ul>
            </div>
        </div>

        <p class="mt-40 p-3 text-gray-500">
            Sorry, this card is not yet available in your area/region.
            Please check back soon.
        </p>

        <button disabled class="px-3 py-2 text-xl text-blue-900 font-medium bg-blue-300 border-2 border-blue-500 rounded-lg shadow hover:bg-blue-200">
            Purchase Card
        </button>
    </main>
</template>
