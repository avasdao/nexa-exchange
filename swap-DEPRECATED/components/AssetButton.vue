<script setup>
defineProps({
    assetid: String,
    assetName: String,
})
</script>

<template>
    <button class="w-32 h-32 flex flex-col items-center justify-center bg-gray-800 border-2 border-gray-400 rounded-xl shadow">
        <h1 class="text-3xl text-gray-100">
            {{assetid}}
        </h1>

        <h3 class="text-gray-100">
            {{assetName}}
        </h3>
    </button>
</template>
