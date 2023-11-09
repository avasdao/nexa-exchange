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
    <main class="">
        <ul role="list" class="divide-y divide-gray-100">
            <li class="py-4">
                <div class="flex items-center gap-x-3">
                    <img src="https://nexa.studio/icon.svg" alt="" class="h-6 w-6 flex-none" />
                    <h3 class="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">$1,925.75</h3>
                    <h3 class="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">44.1431</h3>
                    <time datetime="2023-01-23T11:00" class="flex-none text-xs text-gray-500">1 min ago</time>
                </div>
            </li>
            <li class="py-4">
                <div class="flex items-center gap-x-3">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-none rounded-full bg-gray-800" />
                    <h3 class="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">Lindsay Walton</h3>
                    <time datetime="2023-01-23T09:00" class="flex-none text-xs text-gray-500">3h</time>
                </div>
                <p class="mt-3 truncate text-sm text-gray-500">Pushed to <span class="text-gray-700">mobile-api</span> (<span class="font-mono text-gray-700">249df660</span> on <span class="text-gray-700">main</span>)</p>
            </li>
            <li class="py-4">
                <div class="flex items-center gap-x-3">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-none rounded-full bg-gray-800" />
                    <h3 class="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">Courtney Henry</h3>
                    <time datetime="2023-01-23T00:00" class="flex-none text-xs text-gray-500">12h</time>
                </div>
                <p class="mt-3 truncate text-sm text-gray-500">Pushed to <span class="text-gray-700">ios-app</span> (<span class="font-mono text-gray-700">11464223</span> on <span class="text-gray-700">main</span>)</p>
            </li>
            <li class="py-4">
                <div class="flex items-center gap-x-3">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-none rounded-full bg-gray-800" />
                    <h3 class="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">Courtney Henry</h3>
                    <time datetime="2023-01-21T13:00" class="flex-none text-xs text-gray-500">2d</time>
                </div>
                <p class="mt-3 truncate text-sm text-gray-500">Pushed to <span class="text-gray-700">tailwindui.com</span> (<span class="font-mono text-gray-700">dad28e95</span> on <span class="text-gray-700">main</span>)</p>
            </li>
            <li class="py-4">
                <div class="flex items-center gap-x-3">
                    <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-none rounded-full bg-gray-800" />
                    <h3 class="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">Michael Foster</h3>
                    <time datetime="2023-01-18T12:34" class="flex-none text-xs text-gray-500">5d</time>
                </div>
                <p class="mt-3 truncate text-sm text-gray-500">Pushed to <span class="text-gray-700">relay-service</span> (<span class="font-mono text-gray-700">624bc94c</span> on <span class="text-gray-700">main</span>)</p>
            </li>
        </ul>
    </main>
</template>
