

/* Set endpoint. */
const API_ENDPOINT = 'https://api.telr.io/v1/exchange'

export default defineEventHandler(async (event) => {
    let body
    let errors
    let method
    let response
    let success

    /* Set (request) body. */
    body = await readBody(event)
    console.log('BODY', body)

    /* Validate method. */
    if (body?.method) {
        method = body.method

        switch(method) {
        case 'createOrder':
            return await $fetch(API_ENDPOINT, {
                method: 'POST',
                body,
            })
            .catch(err => console.error(err))
        default:
            errors = `[ ${method} ] is an unknown method.`
        }
    }

    /* Set errors. */
    errors = null

    response = {
        success,
        body,
        errors,
    }

    /* Return response. */
    return response
})
