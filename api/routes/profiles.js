/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const usersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/users`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)

/**
 * Profiles Module
 */
const profiles = async function (req, res) {
    const address = req.params.address
    console.log('USER ADDRESS', address)

    const body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (body) {
        const id = uuidv4()
        const createdAt = moment().unix()

        const pkg = {
            _id: id,
            src: 'magic',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }


    if (req.method === 'GET') {
        if (address) {
            /* Request existing user. */
            results = await usersDb.query('api/byAddress', {
                key: address,
                include_docs: true,
            }).catch(err => {
                console.error('DATA ERROR:', err)
            })
            console.log('USERS RESULT (byAddress)', util.inspect(results, false, null, true))

            if (!results || results.rows.length === 0) {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json({
                    error: 'User not found.'
                })
            }

            let user = results.rows[0].doc

            let pkg = {
                address: user.address,
                email: user.email,
                createdAt: user.createdAt,
            }

            /* Return results. */
            return res.json(pkg)
        }

        return res.json({})
    } else if (req.method === 'POST') {
        /* Initialize email. */
        let email

        /* Set headers. */
        const headers = req.headers

        /* Validate headers. */
        if (headers) {
            /* Set authorization. */
            const authorization = headers.authorization

            /* Validate authorization. */
            if (!authorization) {
                /* Set status. */
                res.status(401)

                /* Return error. */
                return res.json({
                    error: 'You MUST provide authorization.'
                })
            }

            /* Retrieve token. */
            const token = authorization.split(' ')[1]
            // console.log('RECEIVED TOKEN', token)

            /* Validate token. */
            if (!token) {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json({
                    error: 'You MUST provide a DID token.'
                })
            }

            /* Set email address. */
            email = metadata.email
            // console.log('MAGIC LOGIN (email):', email)

            /* Validate email. */
            if (!email) {
                /* Set status. */
                res.status(401)

                /* Return error. */
                return res.json({
                    error: 'Unauthorized user.'
                })
            }

        }

        /* Set merchant. */
        const merchant = body

        const pkg = {
            _id: uuidv4(),
            ...merchant,
            users: [
                email,
            ],
            createdAt: moment().unix(),
        }

        /* Retrieve results. */
        results = await usersDb.put(pkg)
            .catch(err => {
                console.error('AUTH ERROR:', err)
            })
        console.log('RESULT (merchant)', util.inspect(results, false, null, true))


        return res.json(results)
    } else {
        return res.end('done!')
    }
}

/* Export module. */
module.exports = profiles
