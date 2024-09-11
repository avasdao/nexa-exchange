export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let error
    let response
    let poolid
    let target

    /* Set pool id. */
    poolid = event.context.params.poolid
    // console.log('POOL ID', poolid)

    /* Set (request) target. */
    target = process.env.TELR_API_ENDPOINT + 'exchange/pool/' + poolid

    /* Request (remote) pool. */
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
    return `Session [ ${poolid} ] was NOT found!`
})
