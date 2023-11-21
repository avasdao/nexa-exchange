/* Import modules .*/
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
    /* Initialize locals.*/
    let requestBody
    let postBody

    /* Set (request) body. */
    requestBody = await readBody(event)
    // console.log('REQUEST BODY (_reg_/auto)', requestBody)

    postBody = {
        id: uuidv4(),
        jsonrpc: '2.0',
        method: 'session',
        params: requestBody,
    }

    return await $fetch(process.env.TELR_API_ENDPOINT + 'exchange/session', {
        method: 'POST',
        body: postBody.params, // FIXME Update required!
    })
    .catch(err => console.error(err))
})
