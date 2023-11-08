/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const plantationsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/plantations`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let plantation
    let plantationid

    /* Set token id. */
    plantationid = event.context.params.plantationid
    console.log('PLANTATION ID', plantationid)

    /* Request (all) plantations. */
    plantation = await plantationsDb
        .get(plantationid, {
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('PLANTATION', plantation)

    /* Validate plantation. */
    if (!plantation) {
        return null
    }

    /* Cleanup db fields. */
    delete plantation._id
    delete plantation._rev

    /* Return plantation. */
    return plantation
})
