<script setup>
import NavView from '@/components/NavView.vue'
import SendPreview from '@/components/SendPreview.vue'
</script>

<template>
    <main>
        <NavView />

        <SendPreview />

        <section class="mt-5">
            <h3 class="ml-2 text-xs text-yellow-800 font-medium uppercase">
                Payment receiver
            </h3>

            <input
                type="text"
                placeholder="Enter a nexa: address"
                class="my-1 px-2 w-full py-1 flex text-2xl border-2 border-yellow-800 rounded-lg"
            />

            <div class="flex pr-3 justify-end">
                <button class="text-sm text-yellow-700 font-medium hover:text-yellow-800 hover:underline">
                    Who can I send to?
                </button>
            </div>
        </section>

    </main>
</template>
