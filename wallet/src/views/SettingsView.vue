<script setup>
import NavView from '@/components/NavView.vue'
import SendPreview from '@/components/SendPreview.vue'
</script>

<template>
    <main class="flex flex-col">
        <NavView />

        <section class="mt-6 grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-6">
                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
            </div>

            <div class="col-span-12 sm:col-span-6">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
            </div>

            <div class="col-span-12">
                <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
                <input type="text" name="url" id="url" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
            </div>
        </section>

        <section class="mt-5">
            <div>
                <h2 class="text-lg font-medium leading-6 text-gray-900">Privacy</h2>
                <p class="mt-1 text-sm text-yellow-900">Ornare eu a volutpat eget vulputate. Fringilla commodo amet.</p>
            </div>

            <ul role="list" class="mt-2 divide-y divide-yellow-700">
                  <li class="flex items-center justify-between py-4">
                    <div class="flex flex-col">
                      <p class="text-sm font-medium text-gray-900" id="privacy-option-2-label">Make account private</p>
                      <p class="text-sm text-yellow-900" id="privacy-option-2-description">Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.</p>
                    </div>
                    <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" -->
                    <button type="button" class="bg-gray-200 relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2" role="switch" aria-checked="false" aria-labelledby="privacy-option-2-label" aria-describedby="privacy-option-2-description">
                      <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                      <span aria-hidden="true" class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </li>
                  <li class="flex items-center justify-between py-4">
                    <div class="flex flex-col">
                      <p class="text-sm font-medium text-gray-900" id="privacy-option-3-label">Allow commenting</p>
                      <p class="text-sm text-yellow-900" id="privacy-option-3-description">Integer amet, nunc hendrerit adipiscing nam. Elementum ame</p>
                    </div>
                    <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" -->
                    <button type="button" class="bg-gray-200 relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2" role="switch" aria-checked="true" aria-labelledby="privacy-option-3-label" aria-describedby="privacy-option-3-description">
                      <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                      <span aria-hidden="true" class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </li>
                </ul>
        </section>
    </main>
</template>
