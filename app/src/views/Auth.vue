<template>
    <main>
        <Navbar />

        <section class="my-5 flex gap-10 max-w-4xl mx-auto">
            <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img class="h-16 w-auto" :src="require('@/assets/logo.png')" alt="Nexa Rocks! Logo" />

                        <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-100">
                            Sign in to your account
                        </h2>

                        <p class="hidden mt-2 text-sm text-gray-600">
                            Or
                            <a href="javascript://" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a>
                        </p>
                    </div>

                    <div class="mt-8">
                        <div v-if="enableSocials">
                            <div>
                                <p class="text-sm font-medium text-gray-700">Sign in with</p>

                                <div class="mt-1 grid grid-cols-3 gap-3">
                                    <div>
                                        <a href="javascript://" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                            <span class="sr-only">Sign in with Facebook</span>
                                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </div>

                                    <div>
                                        <a href="javascript://" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                            <span class="sr-only">Sign in with Twitter</span>
                                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path
                                                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                                                />
                                            </svg>
                                        </a>
                                    </div>

                                    <div>
                                        <a href="javascript://" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                            <span class="sr-only">Sign in with GitHub</span>
                                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="relative mt-6">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="w-full border-t border-gray-300"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="bg-white px-2 text-gray-500">Or continue with</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6">
                            <form action="javascript://" method="POST" class="space-y-6">
                                <div>
                                    <label for="email" class="block text-lg font-medium text-gray-500">
                                        Email address
                                    </label>

                                    <div class="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autocomplete="email"
                                            required
                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-lg text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            v-model="email"
                                        />
                                    </div>
                                </div>

                                <button
                                    @click="signIn()"
                                    class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-xl font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Request Magic Link
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="relative hidden w-0 flex-1 lg:block">
                <img
                    class="absolute inset-0 h-full w-48 object-cover rounded-xl border-4 border-yellow-500 shadow-lg"
                    :src="bannerUrl"
                    alt=""
                />
            </div>
        </section>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Navbar from '@/components/Navbar.vue'

export default {
    components: {
        Navbar,
    },
    data: () => {
        return {
            bannerUrl: null,
            email: null,
            enableSocials: null
        }
    },
    computed: {
        ...mapGetters({
            //
        }),

    },
    methods: {
        ...mapActions({
            //
        }),

        signIn () {
            if (!this.email) {
                return alert('Please enter an email address')
            }

            /* Request email auth. */
            this.$store.dispatch('profile/signin', { email: this.email })
        }
    },
    created: function () {
        /* Initialize social medial logins. */
        this.enableSocials = false

        // this.bannerUrl = 'https://images.unsplash.com/photo-1542438927-433fdaaec56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80'
        this.bannerUrl = 'https://images.unsplash.com/photo-1438762398043-ac196c2fa1e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        // this.bannerUrl = 'https://images.unsplash.com/photo-1600408987023-15d4ec3a9499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=398&q=80'
    },
    mounted: function () {
        //
    },
}
</script>
