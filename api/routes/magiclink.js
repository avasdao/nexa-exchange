/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

const { Magic } = require('@magic-sdk/admin')

const magicAdmin = new Magic(process.env.MAGIC_LINK_KEY)

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sessions`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Magic Module
 */
const magic = async function (req, res) {
    console.log('SESSIONS BODY', req.body)

    let createdAt
    let id
    let pkg
    let results

    const body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (body) {
        id = uuidv4()
        createdAt = moment().unix()

        pkg = {
            _id: id,
            src: 'magic',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    /* Set DID token. */
    const did = body.did
    console.log('DID TOKEN', did)

    if (!did) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing DID token.'
        })
    }

    /* Set issuer. */
    const issuer = magicAdmin.token.getIssuer(did)

    /* Set (public) address. */
    const address = magicAdmin.token.getPublicAddress(did)

    if (!address) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing user (account) address.'
        })
    }

    /* Set issuer metadata. */
    const metadata = await magicAdmin.users.getMetadataByIssuer(issuer)
    console.log('MAGIC LOGIN (data):', JSON.stringify(metadata, null, 4))

    /* Set email address. */
    const email = metadata.email

    if (!email) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing user email.'
        })
    }

    /* Request existing user. */
    results = await profilesDb.query('api/byEmail', {
        key: email,
        include_docs: true,
    }).catch(err => {
        console.error('DATA ERROR:', err)
    })
    // console.log('PROFILES RESULT (byEmail)', util.inspect(results, false, null, true))

    if (!results || results.rows.length === 0) {
        id = uuidv4()
        createdAt = moment().unix()

        pkg = {
            _id: id,
            address,
            email,
            createdAt,
        }

        /* Retrieve results. */
        results = await profilesDb.put(pkg)
            .catch(err => {
                console.error('PROFILES ERROR:', err)
            })
        // console.log('RESULT (new user)', util.inspect(results, false, null, true))
    }

    /* Set (created) timestamp. */
    createdAt = moment().unix()

    /* Build (data) package. */
    pkg = {
        _id: uuidv4(),
        issuer,
        address,
        email,
        metadata,
        did,
        createdAt,
    }
    console.log('PKG', pkg)

    /* Retrieve results. */
    results = await sessionsDb.put(pkg)
        .catch(err => {
            console.error('AUTH ERROR:', err)
        })
    console.log('RESULT (sessions)', util.inspect(results, false, null, true))

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
        metadata,
    }

    /* Return params. */
    res.json(result)
}

/* Export module. */
module.exports = magic
