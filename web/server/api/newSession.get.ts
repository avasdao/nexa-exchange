/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Create new session id. */
    const sessionid = uuidv4()

    /* Create new challenge. */
    const challenge = uuidv4()

    /* Set creation time. */
    const createdAt = moment().unix()

    /* Set expiration time. */
    const expiresAt = moment().add(7, 'days').unix()

    /* Build (database) session. */
    const dbSession = {
        _id: sessionid,
        challenge,
        createdAt,
        expiresAt,
    }

    /* Save (database) session. */
    const success = await sessionsDb
        .put(dbSession)
        .catch(err => console.error(err))
    console.log('NEW SESSION (success):', success)

    /* Build (web) session. */
    const webSession = {
        id: sessionid,
        challenge,
        createdAt,
        expiresAt,
    }

    /* Return (web) session. */
    return webSession
})
