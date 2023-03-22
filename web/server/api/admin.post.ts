export default defineEventHandler(async (event) => {
    /* Set authorization. */
    const auth = event.context.auth
    console.log('AUTH', auth)

    if (auth.profileid !== 1337) {
        throw createError({
            statusCode: 401,
            statusMessage: 'You are NOT an authorized administrator.',
        })
    }

    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY', body)

    return {
        auth,
        body,
    }
})
