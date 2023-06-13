/* Import modules. */
import { getGenesisInfo } from '@nexajs/rostrum'

export default defineEventHandler(async (event) => {
    let docUrl
    let jsonDoc
    let tokenid
    let tokenDetails

    /* Set token id. */
    tokenid = event.context.params.tokenid
    console.log('TOKEN ID', tokenid)

    tokenDetails = await getGenesisInfo(tokenid)
        .catch(err => console.error(err))
    console.log('TOKEN DETAILS', tokenDetails)

    if (tokenDetails?.document_url) {
        docUrl = tokenDetails.document_url

        jsonDoc = await $fetch(docUrl)
            .catch(err => console.error(err))
    }

    return {
        ...tokenDetails,
        document: jsonDoc[0],
        signature: jsonDoc[1],
    }
})
