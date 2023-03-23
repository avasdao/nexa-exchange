/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const tickerDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/ticker`)

export default defineEventHandler((event) => {

    const response = await tickerDb.get()
        .catch(err => console.error(err))
    console.log('RESPONSE', response)


    /* Set error message. */
    const errorMsg = {
        error: `Oops! It looks like we don't have any ticker information. Administrators have been notified of the situation.`
    }

    /* Return ticker. */
    return response
})
