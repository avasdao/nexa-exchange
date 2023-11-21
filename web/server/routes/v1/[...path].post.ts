export default defineEventHandler((event) => {
    /* Set response header. */
    setResponseStatus(event, 400)

    /* Return response. */
    return {
        error: 'Invalid request!'
    }
})
