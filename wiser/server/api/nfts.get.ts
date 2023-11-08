/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const assetsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/assets`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let query
    let response
    let tokens

    /* Set (request) query. */
    query = getQuery(event)

    /* Set session id. */
    // sessionid = query?.sid

    /* Request (all) assets. */
    response = await assetsDb
        .query('api/isSubgroup', {
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Validate response. */
    if (!response) {
        return []
    }

    /* Parse tokens. */
    tokens = response.rows.map(_asset => {
        let token

        token = {
            id: _asset.id,
            ..._asset.doc,
        }

        delete token._id
        delete token._rev

        return token
    })

    /* Return (asset) tokens. */
    return tokens
})
