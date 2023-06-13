export default defineEventHandler(async (event) => {
    /* Set session id. */
    const sessionid = event.context.params.sessionid
    // console.log('SESSION ID', sessionid)

    /* Return (Telr Exchange) session. */
    return await $fetch('https://api.telr.io/v1/exchange/session/' + sessionid)
})
