/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const nftsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/nfts`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let nfts
    let query
    let response

    /* Set (request) query. */
    query = getQuery(event)

    /* Set session id. */
    // sessionid = query?.sid

    /* Request (all) nfts. */
    // response = await nftsDb
    //     .query('api/isGroup', {
    //         include_docs: true,
    //     })
    //     .catch(err => console.error(err))
    response = await nftsDb
        .allDocs({
            include_docs: true,
        })
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Validate response. */
    if (!response) {
        return []
    }

    /* Parse nfts. */
    nfts = response.rows.map(_asset => {
        /* Create asset. */
        const asset = {
            id: _asset.id,
            ..._asset.doc,
        }

        /* Delete (asset) id. */
        delete asset._id

        /* Delete (asset) revision. */
        delete asset._rev

        /* Return asset. */
        return asset
    })

    /* Return nfts. */
    return nfts
})
