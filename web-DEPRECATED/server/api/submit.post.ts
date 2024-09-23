/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const submissionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/submissions`)

export default defineEventHandler(async (event) => {
    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY', body)

    if (!body) {
        // FIXME Use an HTTP error code.
        return {
            success: false,
        }
    }

    let profileid
    let summary
    let title
    let url

    /* Set profile id. */
    profileid = body.session?.profileid

    /* Set listing title. */
    title = body.title

    /* Set listing URL. */
    url = body.url

    /* Set listing summary. */
    summary = body.summary

    const pkg = {
        _id: uuidv4(),
        profileid,
        title,
        url,
        summary,
        createdAt: moment().unix(),
    }

    const success = await submissionsDb
        .put(pkg)
        .catch(err => console.error(err))
    console.log('SUBMIT (success):', success)

    return {
        success: true
    }
})
