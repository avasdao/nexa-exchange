export default defineEventHandler((event) => {
    /* Set price. */
    // FIXME FOR DEV PURPOSES ONLY
    const marketCap = '25000000'

    /* Send response. */
    event.node.res.end(marketCap)
})
