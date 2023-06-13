<script setup>
/* Import modules. */
//

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'

/* Initialize profile. */
const Profile = useProfileStore()

onBeforeMount(() => {
    Profile.$state = JSON.parse(localStorage.getItem('profile'))
})

watch(Profile.$state, (_state) => {
    localStorage.setItem('profile', JSON.stringify(_state))
})



/* Initialize constants. */
const POLLING_FREQUENCY = 3000 // 3 seconds

let pollingid

const hasAuth = ref(false)
const isLoading = ref(true)

const nickname = ref(null)
nickname.value = 'Satoshi'

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

const pollForAuth = async () => {
    console.log('POLLING FOR AUTH')

    if (!Profile.sessionid) {
        /* Handle loading flag. */
        if (isLoading.value) {
            isLoading.value = false
        }

        return console.error('Oops! We DO NOT have an active Session.')
    }

    /* Set target. */
    const target = '/v1/session/' + Profile.sessionid
    console.log('TARGET', target)

    const session = await $fetch(target)
    console.log('SESSION', session)

    /* Validate authorized session. */
    if (session?.profileid) {
        /* Set authorization flag. */
        hasAuth.value = true

        /* Scroll to page top. */
        scrollToTop()

        /* Stop polling. */
        if (pollingid) {
            clearInterval(pollingid)
        }

        /* Save session to profile. */
        Profile.saveSession(session)
    }

    /* Handle loading flag. */
    if (isLoading.value) {
        isLoading.value = false
    }
}

/**
 * Sign Out
 *
 * Deletes ALL stored values from the browsers (IndexedDB) cache.
 */
 const signOut = () => {
    /* Delete ALL session data. */
    Profile.deleteSession()

    /* Initialize route handler. */
    const router = useRouter()

    /* Go to homepage. */
    router.replace('/')
}

/* Handle mounting. */
onMounted(() => {
    /* Setup API polling. */
    pollForAuth()

    /* Initialize authorization polling. */
    // FIXME How can we implement WebSockets for more efficiency?
    pollingid = setInterval(pollForAuth, POLLING_FREQUENCY)
})

onBeforeUnmount(() => {
    /* Stop polling. */
    if (pollingid) {
        clearInterval(pollingid)
    }
})
</script>

<template>
    <main class="px-3 max-w-5xl mx-auto">
        <div class="pt-10 flex justify-center">
            <h1 v-if="isLoading || hasAuth" class="text-3xl sm:text-5xl font-bold tracking-widest text-center">
                My Profile
            </h1>
            <h1 v-else class="text-3xl sm:text-5xl font-bold tracking-widest text-center">
                Authorization Required
            </h1>
        </div>

        <section v-if="isLoading" class="pt-10 py-10 flex justify-center">
            <h1 class="text-2xl">
                loading, please wait...
            </h1>
        </section>

        <div v-else>
            <section v-if="hasAuth" class="py-10 flex flex-col items-center gap-10">
                <h2 class="text-3xl text-rose-500 font-bold">
                   Coming Soon...
                </h2>

                <p class="max-w-lg text-xl text-center">
                    While you wait for your Awesome profile page, please submit your favorite Nexa link.
                </p>

                <NuxtLink to="/submit" class="px-5 py-2 bg-green-500 text-xl text-green-50 font-medium border-4 border-green-700 rounded-md shadow-md hover:bg-green-600">
                    Submit a New Listing
                </NuxtLink>

                <button @click="signOut" class="px-5 py-2 bg-red-500 text-xl text-red-50 font-medium border-4 border-red-700 rounded-md shadow-md hover:bg-red-600">
                    Sign Out
                </button>
            </section>

            <AuthView v-else />
        </div>
    </main>
</template>
