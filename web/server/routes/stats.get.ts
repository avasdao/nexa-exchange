export default defineEventHandler((event) => {
    /* Set daily active users (DAU). */
    // FIXME FOR DEV PURPOSES ONLY
    const dau = 888

    /* Set # of CashFusion transactions. */
    // FIXME FOR DEV PURPOSES ONLY
    const fusions = {
        last_24h: 0,
        last_30d: 0,
        total: 0,
    }

    /* Set monthly active users (MAU). */
    // FIXME FOR DEV PURPOSES ONLY
    const mau = 13370

    /* Set # of CashShuffle transactions. */
    // FIXME FOR DEV PURPOSES ONLY
    const shuffles = {
        last_24h: 1337,
        last_30d: 30000,
        total: 1000000,
    }

    /* Build statistics. */
    const stats = {
        dau,
        fusions,
        mau,
        shuffles,
    }

    /* Return statistics. */
    return stats
})
