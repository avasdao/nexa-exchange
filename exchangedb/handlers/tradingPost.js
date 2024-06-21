/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const tradingpostsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/tradingposts`)
const transactionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/transactions`)

/* Initialize constants. */
const TRADINGPOST_V1_SCRIPT_HASH = 'CFCBDA2CC2EEEC776BF34AA78EDD5BC0C5DFB1BC'
const TRADINGPOST_V2_SCRIPT_HASH = 'FA32BC238E03EB6A804221C3CE2C846807446496'

export default async (_transaction) => {
    /* Initialize locals. */
    let existingTx
    let newUpdatedTx
    let output
    let outputs
    let result
    let scriptHash
    let scriptPubKey
    let scriptType
    let txidem

    /* Set transaction IDEM .*/
    txidem = _transaction.txidem

    /* Set outputs. */
    outputs = _transaction.vout

    /* Handle outputs. */
    for (let i = 0; i < outputs.length; i++) {
        /* Set output. */
        output = outputs[i]

        /* Set script public key. */
        scriptPubKey = output?.scriptPubKey

        /* Set script type. */
        scriptType = scriptPubKey?.type || null
        // console.log('SCRIPT TYPE', typeof scriptType, scriptType)

        /* Set script hash. */
        scriptHash = scriptPubKey?.scriptHash || null
        // console.log('SCRIPT HASH', typeof scriptHash, scriptHash)

        // SKIP NON-SCRIPT CONTRACTS
        if (scriptType === 'pubkeyhash' || scriptType === 'nulldata' || scriptType === 'publiclabel' || scriptHash === 'pay2pubkeytemplate') {
            continue
        }
        // console.log('SCRIPT HASH', scriptHash)

        /* Filter WiserSwap transaction ONLY. */
        // TODO Add support for v2, etc...
        if (
            scriptHash !== TRADINGPOST_V1_SCRIPT_HASH &&
            scriptHash !== TRADINGPOST_V2_SCRIPT_HASH
        ) {
            continue
        }
        // console.log('SCRIPT HASH', scriptHash)

        // NOTE: Attepmt to (1st) retrieve "existing" transaction data.
        existingTx = await tradingpostsDb
            .get(txidem)
            .catch(err => console.error(err))
        // console.log('EXISTING TX', existingTx)

        /* Validate transaction. */
        if (existingTx) {
            /* Update existingTx entry. */
            newUpdatedTx = {
                _id: existingTx._id,
                _rev: existingTx._rev,
                ..._transaction,
                updatedAt: moment().unix(),
            }
        } else {
            /* Create NEW entry. */
            newUpdatedTx = {
                _id: _transaction.txidem,
                ..._transaction,
                createdAt: moment().unix(),
            }
        }
        // console.log('NEW UPDATED', newUpdatedTx)

        /* Add transaction to database. */
        result = await tradingpostsDb
            .put(newUpdatedTx)
            .catch(err => {
                console.error(err)
            })
    }

    /* Return result. */
    return result
}
