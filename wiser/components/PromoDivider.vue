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
    <main class="bg-white">
        <div class="mx-auto max-w-7xl py-12 sm:px-6 sm:py-16 lg:px-8">
            <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg
                    viewBox="0 0 1024 1024"
                    class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    aria-hidden="true"
                >
                    <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stop-color="#7775D6" />
                            <stop offset="1" stop-color="#E935C1" />
                        </radialGradient>
                    </defs>
                </svg>

                <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left">
                    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-3xl">
                        Are you a Creator or Builder?
                    </h2>

                    <h3 class="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        Launch your <span class="pr-1 text-amber-400 text-3xl font-light italic">OWN</span> $TOKEN or NFT...
                    </h3>

                    <p class="mt-6 text-lg leading-7 text-gray-300">
                        <span class="font-bold">The F.O.M.O. is real fam!</span>
                        Take the 1st steps towards your financial freedom and #BUIDL something that's uniquely YOU!
                    </p>

                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <NuxtLink to="https://nexa.studio/nft" target="_blank"
                            class="rounded-md bg-amber-400 px-5 py-2.5 text-2xl font-semibold text-gray-900 shadow-sm hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Launch NFT Studio
                        </NuxtLink>

                        <NuxtLink to="https://nexa.studio" target="_blank" class="text-xl font-semibold leading-6 text-white">
                            Learn more <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="relative mt-16 h-80 lg:mt-8">
                    <img
                        class="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://bafkreifqm4h5i7nqsajcigbk27yv5h4q26e7z2e6dbmzw3643iwjh5nami.nexa.garden"
                        alt="NFT collage"
                        width="1200"
                        height="712"
                    />
                </div>
            </div>
        </div>
    </main>
</template>
