/* Set endpoint. */
const API_ENDPOINT = 'https://api.telr.io/v1/exchange'

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let headers
    let errors
    let method
    let response
    let success

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('BODY', body)

    /* Validate (body) method. */
    if (body?.method) {
        /* Set method. */
        method = 'POST'

        /* Set headers. */
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TELR-API': process.env.TELR_API_KEY,
        }

        /* Handle method. */
        switch(body.method) {
        case 'createOrder':
            return await $fetch(API_ENDPOINT, {
                method,
                headers,
                body,
            })
            .catch(err => console.error(err))
        default:
            errors = `[ ${method} ] is an unknown method.`
        }
    }

    /* Set errors. */
    errors = null

    /* Build response. */
    response = {
        success,
        body,
        errors,
    }

    /* Return response. */
    return response
})
