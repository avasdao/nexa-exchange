/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const ordersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/orders`)

/* Set (fixed) Nexa mining fee. */
// NOTE: Explorer is reporting an avg fee of (1.07sat/B).
const NEXA_MINING_FEE = 5.00
const NEXA_MINING_FEE_SATOSHI = 500

/**
 * Trade Engine
 */
const tradeEngine = async (req, res) => {
    let balance
    let body
    let error
    let id
    let inputs
    let outputs
    let pkg
    let response
    let rawTx
    let signedTx
    let txid
    let unspent

    body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (body) {
        id = uuidv4()
        createdAt = moment().unix()

        pkg = {
            _id: id,
            src: 'admin',
            ...body,
            createdAt,
        }

        results = await logsDb
            .put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    response = await rpc('getbalance', [])
    if (response) {
        balance = response.result
        console.log('BALANCE', balance)
    }

    response = await rpc('listunspent', [0]) // NOTE: Include unconfirmed.
    if (response) {
        unspent = response.result
        console.log('UNSPENT', unspent)
    }

    // TODO: Add validation for unspent array.

    const myUtxo = unspent.find(_utxo => {
        return Number(_utxo.satoshi) >= (Number(body.payoutAmount) + NEXA_MINING_FEE_SATOSHI)
    })
    console.log('MY UTXO', myUtxo)

    if (!myUtxo) {
        error = 'Oops! We are missing a UTXO.'
        console.error(error)

        return res.json({ error })
    }

    /* Set intpus. */
    inputs = [
        {
            outpoint: myUtxo.outpoint,
            amount: myUtxo.amount,
        }
    ]

    /* Set outputs. */
    outputs = {}
    outputs[body.payoutAddress] = Number((body.payoutAmount / 100.0).toFixed(2))
    outputs[myUtxo.address] = Number((myUtxo.amount - (body.payoutAmount / 100.0) - NEXA_MINING_FEE).toFixed(2))

    response = await rpc('createrawtransaction', [JSON.stringify(inputs), JSON.stringify(outputs)])
    if (response) {
        if (response.error) {
            error = response.error
            console.error(response.error)
        } else {
            rawTx = response.result
            console.log('RAW TX', rawTx)
        }
    }

    if (!rawTx || error) {
        if (!error) {
            error = 'Oops! Something went wrong building your transaction.'
        }

        console.error(error)
        console.log([JSON.stringify(inputs), JSON.stringify(outputs)])

        return res.json({ error })
    }

    response = await rpc('signrawtransaction', [rawTx])
    if (response) {
        signedTx = response.result
        console.log('SIGNED TX', signedTx)
    }

    response = await rpc('sendrawtransaction', [signedTx.hex])
    if (response) {
        if (response.error) {
            error = response.error
            console.error(response.error)
        } else {
            txid = response.result
            console.log('TXID', txid)
        }
    }

    res.json({
        error,
        balance,
        unspent,
        inputs,
        outputs,
        rawTx,
        signedTx,
        txid,
    })
}

const rpc = async function (_method, _params) {
    let endpoint
    let error
    let pkg
    let response

    /* Set endpoint. */
    endpoint = `http://user:password@127.0.0.1:7227`
    // console.log('ENDPOINT', endpoint)

    pkg = {
        "jsonrpc": "2.0",
        "id": "api",
        "method": _method,
        "params": _params,
    }

    /* Request Elasticsearch query. */
    response = await superagent
        .post(endpoint)
        .send(pkg)
        .set('accept', 'json')
        .catch(err => {
            if (err.response && err.response.text) {
                error = JSON.parse(err.response.text)
            } else {
                console.error(err)
            }
        })
    // console.log('\nRPC CALL:', response.body)

    if (error) {
        return { error }
    }

    if (response && response.body) {
        return response.body
    }

    /* Fallback. */
    return null
}

/* Export module. */
module.exports = tradeEngine
