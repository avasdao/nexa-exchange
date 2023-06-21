export default defineEventHandler((event) => {
    /* Set (invalid) path URL. */
    const orderid = event.context.params.orderid

    return {
        orderid,
        msg: 'lets go!',
    }
})
