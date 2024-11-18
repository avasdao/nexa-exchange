/* Set contants. */
const EXCHANGE_ENDPOINT = 'https://nexa.exchange/v1'

export default defineEventHandler(async (event) => {
    /* Set (request) query. */
    const query = getQuery(event)
    // console.log('QUERY', query)

    /* Set order id. */
    const orderid = query.id

    return await $fetch(EXCHANGE_ENDPOINT + '/order/' + orderid)
        .catch(err => console.error(err))
})
