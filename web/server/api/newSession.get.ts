export default defineEventHandler(async (event) => {
    /* Return (Telr Exchange) session. */
    return $fetch('https://api.telr.io/v1/exchange/session', {
        method: 'POST',
        'ttl': 86400, // 24 hours
    })
})
