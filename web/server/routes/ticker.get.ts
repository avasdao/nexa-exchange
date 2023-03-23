/* Import modules. */
// import moment from 'moment'
import PouchDB from 'pouchdb'
// import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
// const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const tickerDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/ticker`)

export default defineEventHandler(async (event) => {
    const response = await tickerDb
        .allDocs({
            include_docs: true,
            limit: 1,
            descending: true,
        })
        .catch(err => console.error(err))
    // console.log('RESPONSE (ticker):', response)

    /* Validate response. */
    if (response?.rows[0]?.doc) {
        /* Return ticker. */
        return response?.rows[0]?.doc
    } else {
        /* Return error message. */
        return {
            error: `Oops! It looks like we don't have any ticker information. Administrators have been notified of the situation.`
        }
    }
})
