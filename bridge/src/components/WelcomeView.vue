<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
    <WelcomeItem>
        <template #icon>
            <DocumentationIcon />
        </template>

        <template #heading>Introduction</template>

        Nexa Bridge is your gateway between foreign blockchains and your Nexa assets.
        Get official support for the following projects:
        <a href="javascript://" target="_blank" class="font-bold">Avalanche</a>,
        <a href="javascript://" target="_blank" class="font-bold">Binance</a>,
        <a href="javascript://" target="_blank" class="font-bold">Ethereum</a>, and
        <a href="javascript://" target="_blank" class="font-bold">Polygon</a>.
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <ToolingIcon />
        </template>

        <template #heading>Coins &amp; Tokens</template>

        Move your precious coins and tokens between the Nexa blockchain and ANY supported blockchain for FREE.
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <EcosystemIcon />
        </template>

        <template #heading>NFTs</template>

        Move your precious NFTs between Nexa and foreign blockchains in an instant, absolutely FREE.
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <CommunityIcon />
        </template>

        <template #heading>Community</template>

        Got stuck? Ask your question on <a href="https://nexa.org" target="_blank">Reddit</a>, the official Matrix/TG server, or <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank">StackOverflow</a>.
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <SupportIcon />
        </template>

        <template #heading>Support Nexa</template>

        As an independent project, Nexa relies on community backing for its sustainability. You can help us by <a href="https://nexa.org" target="_blank">becoming a sponsor</a>.
    </WelcomeItem>
</template>
