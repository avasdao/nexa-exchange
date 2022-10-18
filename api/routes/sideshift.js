/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const sideshiftDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sideshift`)

/**
 * Sideshift Module
 */
const sideshift = async function (req, res) {
    console.log('BODY', req.body)

    let body
    let createdAt
    let id
    let pkg
    let results

    body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (body) {
        id = uuidv4()
        createdAt = moment().unix()

        pkg = {
            _id: id,
            src: 'sideshift',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    /* Set (created) timestamp. */
    createdAt = moment().unix()

    /* Build (data) package. */
    pkg = {
        _id: uuidv4(),
        ...body,
        createdAt,
    }
    console.log('PKG', pkg)

    /* Retrieve results. */
    results = await sideshiftDb.put(pkg)
        .catch(err => {
            console.error('AUTH ERROR:', err)
        })
    console.log('RESULT (sideshift)', util.inspect(results, false, null, true))

    if (!results) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json([])
    }

    /* Build (result) package. */
    const result = {
        error: null,
        success: true,
        results,
    }

    /* Return params. */
    res.json(result)
}

/* Export module. */
module.exports = sideshift
