/* Import modules .*/
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
    let requestBody
    let postBody

    /* Set (request) body. */
    const requestBody = await readBody(event)
    // console.log('REQUEST BODY (_reg_/auto)', requestBody)

    const postBody = {
        id: uuidv4(),
        jsonrpc: '2.0',
        method: 'auth',
        params: requestBody,
    }

    return await $fetch('https://api.telr.io/v1/exchange/auth', {
        method: 'POST',
        body: postBody.params, // FIXME Update required!
    })
    .catch(err => console.error(err))
})
