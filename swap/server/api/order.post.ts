const EXCHANGE_ENDPOINT = 'https://nexa.exchange/v1'

export default defineEventHandler(async (event) => {
    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY', body)

    // let body
    let headers
    let method
    let orderid
    let response

    method = 'POST'

    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    response = await $fetch(EXCHANGE_ENDPOINT, {
        method,
        headers,
        body,
    })
    .catch(err => console.error(err))
    console.log('REQUEST SWAP', response)
    return response

    /* Set order id. */
    orderid = response.id
    console.log('ORDER ID', orderid)

    /* Reset order. */
    // this.resetOrder()

    /* Return order id. */
    return orderid
})
