export default defineEventHandler(async (event) => {
    /* Set (invalid) path URL. */
    const path = event.context.params.invalid

    if (path.startsWith('ticker/price') || path.startsWith('ticker/quote')) {
        return await $fetch(`https://api.telr.io/v1/${path}`)
    }

    return {
        error: `Oops! [ ${path} ] is invalid. You MUST provide a valid endpoint. Please visit https://nexa.exchange/api for more help.`
    }
})
