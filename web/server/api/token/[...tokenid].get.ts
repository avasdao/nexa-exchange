/* Import modules. */
import { getGenesisInfo } from '@nexajs/rostrum'

export default defineEventHandler(async (event) => {
    let tokenid
    let tokenDetails

    /* Set token id. */
    tokenid = event.context.params.tokenid
    console.log('TOKEN ID', tokenid)

    tokenDetails = await getGenesisInfo(tokenid)
        .catch(err => console.error(err))
    console.log('TOKEN DETAILS', tokenDetails)

    /* Return token details. */
    return tokenDetails || {}
})
