/* Import modules. */
import moment from 'moment'

export default defineEventHandler(async (event) => {
    /* Set 24-hour volume. */
    // FIXME FOR DEV PURPOSES ONLY
    const vol_24 = 1234567890

    const price = await $fetch('/price')

    const summary = {
        price,
    }

    /* Set updated timestamp. */
    const updatedAt = moment().unix()

    /* Build CoinMarketCap market. */
    const COIN_MARKET_CAP = {
        vol_24,
        updatedAt,
    }

    /* Build Txbit market. */
    const TXBIT = {
        vol_24,
        updatedAt,
    }

    /* Return ALL markets. */
    return {
        summary,
        COIN_MARKET_CAP,
        TXBIT,
        updatedAt,
    }
})
