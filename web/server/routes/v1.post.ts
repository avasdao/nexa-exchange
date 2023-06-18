export default defineEventHandler(async (event) => {
    let body
    let errors
    let method
    let pkg
    let success

    /* Set (request) body. */
    body = await readBody(event)
    console.log('BODY', body)

    if (body?.method) {
        method = body.method
    }

    if (method) {
        switch(method) {
        case 'createOrder':
            success = 'creating new order...'
            break
        default:
            errors = 'Unknown method'
        }
    }

    errors = null

    pkg = {
        success,
        body,
        errors,
    }

    return pkg
})
