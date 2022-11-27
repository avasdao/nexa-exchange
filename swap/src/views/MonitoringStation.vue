<template>
    <main class="mt-5 flex flex-col space-y-5">
        <h1 class="text-2xl sm:text-4xl font-medium text-center">
            Order Monitoring Station
        </h1>

        <p class="text-red-500 font-medium text-center">
            Please <strong>Save</strong> or <strong>Bookmark</strong> this page to easily track of your order status and tx details.
        </p>

        <div class="flex flex-col">
            <small class="text-gray-500 font-medium uppercase">
                Your Order ID
            </small>

            <h2 class="text-2xl font-medium">
                {{orderid}}
            </h2>
        </div>

        <hr />

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

    </main>
</template>

<script>
const ENDPOINT = 'https://api.telr.io/v1/swap/'

export default {
    data: () => ({
        orderid: null,
        depositAddress: null,
        swap: null,
        amount: null,
        dataUrl: null,

        showVideoPreview: null,
        video: null,
        scanner: null,
        cameraError: null,
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        const route = this.$route
        const path = route.path

        this.orderid = path.slice(1)
        console.log('Order ID', this.orderid)
    },
    mounted: function () {
        //
    },
}
</script>
