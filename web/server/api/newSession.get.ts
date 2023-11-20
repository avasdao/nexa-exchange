export default defineEventHandler(async (event) => {
    /* Return (Telr Exchange) session. */
    return $fetch(process.env.TELR_API_ENDPOINT + 'exchange/session', {
        method: 'POST',
        'ttl': 86400, // 24 hours
    })
})
