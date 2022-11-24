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

        Nexa Bridge offers an express gateway to safely move your Nexa assets between foreign blockchains.

        <span class="block mt-3 text-sm">
            <span class="font-medium">
                The following blockchains are officially supported:
            </span>

            <a href="javascript://" target="_blank" class="font-bold">Avalanche</a>,
            <a href="javascript://" target="_blank" class="font-bold">Binance</a>,
            <a href="javascript://" target="_blank" class="font-bold">Bitcoin</a>,
            <a href="javascript://" target="_blank" class="font-bold">Bitcoin Cash</a>,
            <a href="javascript://" target="_blank" class="font-bold">Dash</a>,
            <a href="javascript://" target="_blank" class="font-bold">Doge</a>,
            <a href="javascript://" target="_blank" class="font-bold">Ethereum</a>,
            <a href="javascript://" target="_blank" class="font-bold">Litecoin</a>,
            <a href="javascript://" target="_blank" class="font-bold">Monero</a>,
            <a href="javascript://" target="_blank" class="font-bold">Polygon</a>,
            <a href="javascript://" target="_blank" class="font-bold">Solana</a>,
            <a href="javascript://" target="_blank" class="font-bold">Tron</a>,
            <a href="javascript://" target="_blank" class="font-bold">Zcash</a>
            and many more...
        </span>
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <EcosystemIcon />
        </template>

        <template #heading>Coins &amp; Tokens</template>

        Move your precious coins and tokens between the Nexa blockchain and ANY supported blockchain for FREE*.
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <SupportIcon />
        </template>

        <template #heading>NFTs</template>

        Move your precious NFTs between Nexa and foreign blockchains in an instant, absolutely FREE*.
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <CommunityIcon />
        </template>

        <template #heading>24 x 7 Support</template>

        Did you get stuck?
        Ask your question on <a href="</a>" target="_blank">Reddit</a>, the official Matrix/TG server, or <a href="javascript://">Slack</a>.
    </WelcomeItem>

    <p class="flex justify-end">
        <em class="text-xs text-gray-500">* only pay network gas fees</em>
    </p>
</template>
