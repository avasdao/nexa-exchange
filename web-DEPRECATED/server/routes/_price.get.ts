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
    price: number,
}

export default defineEventHandler(async (event) => {
    /* Request ticker (from our own API). */
    const ticker: Ticker = await $fetch('/_ticker')

    /* Set price. */
    const price: number = ticker?.quote?.USD?.price

    /* Return price. */
    return price
})
