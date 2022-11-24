<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <header>
        <img
            alt="Nexa Wallet Logo"
            class="logo h-48 w-48 sm:h-40 sm:w-40"
            src="@/assets/logo.png"
        />

        <div class="wrapper">
            <h1 class="text-6xl font-bold uppercase bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                Nexa
            </h1>
            <h1 class="text-8xl font-bold bg-gradient-to-r from-indigo-400 via-sky-600 to-indigo-400 bg-clip-text text-transparent">
                Wallet
            </h1>

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/help">Help</RouterLink>
            </nav>

            <h3 class="text-sm text-center italic text-red-400">
                ☠️ This project is in alpha. Use at your own risk.
            </h3>
        </div>
    </header>

    <RouterView
        class="main-win my-2 sm:p-3 sm:bg-gradient-to-r sm:from-yellow-400 sm:to-yellow-500 sm:border-l-2 sm:border-r-2 sm:border-yellow-600 rounded-2xl"
    />
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.main-win {
    height: calc(100vh - 20px);
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
