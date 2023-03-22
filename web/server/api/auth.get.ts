/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize session. */
    let session
    let sessionid

    /* Set (request) query. */
    const query = getQuery(event)
    console.log('QUERY', query)

    /* Set session id. */
    sessionid = query?.sid
    console.log('SESSION ID', sessionid)

    /* Validate session id. */
    if (!sessionid) {
        return {
            error: 'Not found',
            query,
        }
    }

    /* Save (database) session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    console.log('SESSION:', session)

    /* Validate session. */
    if (!session) {
        return {
            error: 'Not found',
            query,
        }
    }

    /* Add ID to session. */
    session = {
        id: session._id,
        ...session,
    }

    /* Sanitize session. */
    delete session._id
    delete session._rev
    delete session.auth
    delete session.challenge

    /* Return session. */
    return session
})
