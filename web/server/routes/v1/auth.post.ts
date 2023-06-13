export default defineEventHandler(async (event) => {
    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY (_reg_/auto', body)

    const response = await $fetch('https://api.telr.io/v1/exchange/auth/', {
        method: 'POST',
        body,
    })

    return response
})
