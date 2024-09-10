export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let error
    let response
    let sessionid
    let target

    /* Set session id. */
    sessionid = event.context.params.sessionid
    // console.log('SESSION ID', sessionid)

    /* Set (request) target. */
    target = process.env.TELR_API_ENDPOINT + 'exchange/session/' + sessionid

    /* Request (remote) session. */
    response = await $fetch(target)
        .catch(err => {
            console.error(err)
            error = err
        })
    console.log('RESPONSE', response)
    console.log('ERROR', error)

    /* Validate response. */
    if (response) {
        /* Return response. */
        return response
    }

    /* Return error. */
    setResponseStatus(event, 404, 'Session was NOT found!')
    return `Session [ ${sessionid} ] was NOT found!`
})
