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
    const ticker: Ticker = await $fetch('/ticker')

    /* Set price. */
    const price: number = ticker?.quote?.USD?.price

    /* Set MEX (million NEX) value. */
    const mex: number = price * 1000000

    /* Return price. */
    // event.node.res.end(mex?.toString())
    return mex
})
