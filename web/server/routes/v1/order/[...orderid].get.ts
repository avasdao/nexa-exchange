/* Set endpoint. */
const API_ENDPOINT = 'https://api.telr.io/v1/exchange'

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let headers
    let method
    let orderid

    /* Set (invalid) path URL. */
    orderid = event.context.params.orderid

    body = {
        method: 'requestOrder',
        params: {
            orderid,
        }
    }

    /* Validate order id. */
    if (orderid) {
        /* Set method. */
        method = 'POST'

        /* Set headers. */
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TELR-API': process.env.TELR_API_KEY,
        }

        return await $fetch(API_ENDPOINT, {
            method,
            headers,
            body,
        })
        .catch(err => console.error(err))
})
