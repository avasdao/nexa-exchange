export default defineEventHandler(async (event) => {
    /* Set session id. */
    const sessionid = event.context.params.sessionid
    console.log('SESSION ID', sessionid)

    /* Return (Telr Exchange) session. */
    return await $fetch(process.env.TELR_API_ENDPOINT + 'exchange/session/' + sessionid)
})
