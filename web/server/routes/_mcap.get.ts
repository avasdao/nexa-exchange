/* Define Ticker */
interface Ticker {
    quote: Quote,
}

/* Define Quote */
interface Quote {
    USD: Currency,
}

/* Define Currency */
interface Currency {
    mcap: number,
}

export default defineEventHandler(async (event) => {
    /* Request ticker (from our own API). */
    const ticker: Ticker = await $fetch('/_ticker')

    /* Set market cap. */
    const mcap: number = ticker?.quote?.USD?.marketCap

    /* Return market cap. */
    return mcap
})
