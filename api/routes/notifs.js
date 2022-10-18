/* Import modules. */
const Client = require('bitcoin-core')
const moment = require('moment')
const nodemailer = require('nodemailer')
const PouchDB = require('pouchdb')
const util = require('util')
const { v4: uuidv4 } = require('uuid')
const validator = require('validator')

/* Initialize databases. */
// const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
// const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sessions`)
const notifsDb = new PouchDB('dbs/notifs')
const sessionsDb = new PouchDB('dbs/sessions')

/* Initialize new Bitcoin client. */
const client = new Client({
    port: process.env.NEXA_RPC_PORT || 7227, // Testnet RPC port is 7229
    host: process.env.NEXA_RPC_HOST || '127.0.0.1',
    username: process.env.NEXA_RPC_USER || 'user',
    password: process.env.NEXA_RPC_PASS || 'password',
})

const txtTemplate = (_msgDetails) => {
    return `
        NEXA Transaction Event
        ----------------------------------------

        We just saw a transaction on your watched wallet.
        ${_msgDetails.txid}

        ________________________________________
        https://nexa.rocks
        brought to you with ❤️ from Ava's DAO
    `
}

const htmlTemplate = (_msgDetails) => {
    return `
        <h2>Nexa Rocks! Event</h2>

        <p>
            i have a <strong>BOLD</strong> body!
        </p>

        <p>
            We just saw a transaction on your watched wallet.
            <br>
            <a href="https://explorer.nexa.org/tx/${_msgDetails.txid}">
                ${_msgDetails.txid}
            </a>
        </p>

        <div style="text-align: center;">
            <hr />

            <a href="https://nexa.rocks" style="text-decoration: none;">
                https://nexa.rocks
            </a>

            <br />
            brought to you with ❤️ from
            <a href="https://avasdao.org" style="text-decoration: none;">Ava's DAO</a>
        </div>
    `
}

/**
 * Notifications
 */
const notifs = async function (req, res) {
    let id
    let address
    let body
    let email
    let response
    let results

    body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (!body) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing body parameter.'
        })
    }

    address = body.address
    console.log('\nNotification address:', address)

    /* Validate body. */
    if (!address) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing address parameter.'
        })
    }

    result = await client.validateAddress(address)
    console.log('\nIs address valid:', result.isvalid, result)

    /* Validate address. */
    if (!result.isvalid) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Your Nexa address is invalid.'
        })
    }

    email = body.email
    console.log('\nNotification email:', email)

    result = validator.isEmail(email)
    console.log('\nIs email valid:', result)

    /* Validate email. */
    if (!result) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Your email address is invalid.'
        })
    }

    /* Generate id. */
    id = uuidv4()

    /* Add record to database. */
    response = await notifsDb
        .put({
            _id: id,
            address,
            email,
        })
        .catch(err => {
            console.error(err)

            return res.json(err)
        })

    /* Send response back to client. */
    res.json({
        id,
        response,
    })
}

/* Export module. */
module.exports = notifs
