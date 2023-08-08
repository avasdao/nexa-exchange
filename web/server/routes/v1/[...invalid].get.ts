import { log } from "console"

export default defineEventHandler(async (event) => {
    /* Set (invalid) path URL. */
    const path = event.context.params.invalid

    let response

    if (path.startsWith('ticker/price') || path.startsWith('ticker/quote')) {
        response = await $fetch(`https://api.telr.io/v1/${path}`)
            .catch(err => console.error(err))
        console.log('TICKER RESPONSE', response)
    }

    if (response) {
        return response
    }

    return {
        error: `Oops! [ ${path} ] is invalid. You MUST provide a valid endpoint. Please visit https://nexa.exchange/api for more help.`
    }
})
