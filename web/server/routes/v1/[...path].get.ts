import { log } from "console"

export default defineEventHandler(async (event) => {
    /* Set path URL. */
    const path = event.context.params.path
    console.log('PATH', path)

    let response

    if (path.startsWith('ticker/price') || path.startsWith('ticker/quote')) {
        response = await $fetch(process.env.TELR_API_ENDPOINT + path)
            .catch(err => console.error(err))
        console.log('TICKER RESPONSE', response)
    }

    if (path.startsWith('order/')) {
        console.log(process.env.TELR_API_ENDPOINT + `exchange/${path}`)
        response = await $fetch(process.env.TELR_API_ENDPOINT + `exchange/${path}`)
            .catch(err => console.error(err))
        console.log('EXCHANGE RESPONSE', response)
    }

    if (response) {
        return response
    }

    return {
        error: `Oops! [ ${path} ] is invalid. You MUST provide a valid endpoint. Please visit https://nexa.exchange/api for more help.`
    }
})
