export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let error
    let response
    let tokenid
    let target

    /* Set token id. */
    tokenid = event.context.params.tokenid
    // console.log('TOKEN ID', tokenid)

    /* Set (request) target. */
    target = process.env.TELR_API_ENDPOINT + 'exchange/pools/' + tokenid

    /* Request (remote) token. */
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
    return `Session [ ${tokenid} ] was NOT found!`
})
