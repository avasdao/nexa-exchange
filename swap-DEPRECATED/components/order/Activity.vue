<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

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
    <main class="lg:col-start-3">
        <!-- Activity feed -->
        <h2 class="text-lg font-semibold leading-6 text-gray-900">
            Order Activity
        </h2>

        <ul role="list" class="mt-6 space-y-6">
            <li class="relative flex gap-x-4">
                <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div class="w-px bg-gray-200"></div>
                </div>

                <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                </div>

                <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span class="font-medium text-gray-900">Chelsea Hagon</span> created the invoice.
                </p>

                <time datetime="2023-01-23T10:32" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    7d ago
                </time>
            </li>

            <li class="relative flex gap-x-4">
                <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div class="w-px bg-gray-200"></div>
                </div>

                <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                </div>

                <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span class="font-medium text-gray-900">Chelsea Hagon</span> edited the invoice.
                </p>

                <time datetime="2023-01-23T11:03" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    6d ago
                </time>
            </li>

            <li class="relative flex gap-x-4">
                <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div class="w-px bg-gray-200"></div>
                </div>

                <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                </div>

                <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span class="font-medium text-gray-900">Chelsea Hagon</span> sent the invoice.
                </p>

                <time datetime="2023-01-23T11:24" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    6d ago
                </time>
            </li>

            <li class="relative flex gap-x-4">
                <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div class="w-px bg-gray-200"></div>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                />

                <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div class="flex justify-between gap-x-4">
                        <div class="py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Chelsea Hagon</span> commented</div>
                        <time datetime="2023-01-23T15:56" class="flex-none py-0.5 text-xs leading-5 text-gray-500">3d ago</time>
                    </div>

                    <p class="text-sm leading-6 text-gray-500">
                        Called client, they reassured me the invoice would be paid by the 25th.
                    </p>
                </div>
            </li>

            <li class="relative flex gap-x-4">
                <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                    <div class="w-px bg-gray-200"></div>
                </div>

                <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                </div>

                <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span class="font-medium text-gray-900">Alex Curren</span> viewed the invoice.
                </p>

                <time datetime="2023-01-24T09:12" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    2d ago
                </time>
            </li>

            <li class="relative flex gap-x-4">
                <div class="absolute left-0 top-0 flex w-6 justify-center h-6">
                    <div class="w-px bg-gray-200"></div>
                </div>

                <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    <svg class="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>

                <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span class="font-medium text-gray-900">Alex Curren</span> paid the invoice.
                </p>

                <time datetime="2023-01-24T09:20" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    1d ago
                </time>
            </li>
        </ul>
    </main>
</template>
