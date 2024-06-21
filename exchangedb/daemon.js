/* Import modules. */
import fetch from 'node-fetch'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

const CMC_API_KEY = process.env.CMC_API_KEY

/* Set endpoint. */
const CMC_API_ENDPOINT = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'

/* Set (request) target. */
const target = CMC_API_ENDPOINT + `?symbol=NEXA` // ID = 23380

const UPDATE_INTERVAL = 3e5 // default: 5 minutes

/* Import helpers. */
import decodeRawTransaction from './utils/decodeRawTransaction.js'
import getBlock from './utils/getBlock.js'
import getBlockchainInfo from './utils/getBlockchainInfo.js'

/* Import indexers. */
import wiserswapsIndexer from './indexer/wiserswaps.js'

/* Initialize ticker. */
let ticker

const headers = {
    'accept': 'json',
    'Content-type': 'application/json;charset=utf-8',
    'X-CMC_PRO_API_KEY': CMC_API_KEY || '',
}

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const tickerDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/ticker`)

const update = async () => {
    /* Request data. */
    const response = await fetch(target, {
        headers,
    })
    // console.log('API RESPONSE', response)

    const ticker = await response.json()
    // console.log('CMC DATA', ticker)

    let success

    success = await logsDb
        .put({
            _id: uuidv4(),
            source: 'ticker',
            body: ticker,
            createdAt: moment().unix(),
        })
    // console.log('SUCCESS (logs):', success)

    if (ticker?.data?.NEXA) {
        success = await tickerDb
            .put({
                _id: moment().unix().toString(),
                ...ticker.data.NEXA
            })
        // console.log('SUCCESS (ticker):', success)
    }
}

/* Start (Update) interval. */
// setInterval(update, UPDATE_INTERVAL)

/* Perform an update immediately (at startup). */
update()

/* Initialize locals. */
let blockchainInfo

setInterval(async () => {
    /* Request Blockchain information. */
    blockchainInfo = await getBlockchainInfo()
    console.log('UPDATE: BLOCKCHAIN INFO', blockchainInfo)
}, BLOCKCHAIN_UPDATE_INTERVAL)

const manageWiserswaps = async () => {
    await wiserswapsIndexer(blockchainInfo.blocks)
    setTimeout(manageWiserswaps, 1000)
}

console.info('\n\n  Starting Nexa Exchange Database daemon...\n')

;(async () => {
    /* Initialize locals. */
    // let decoded
    // let msg
    // let sock
    // let topic
    let updatedSystem

    /* Request Blockchain information. */
    blockchainInfo = await getBlockchainInfo()
    console.log('BLOCKCHAIN INFO', blockchainInfo)

    if (!blockchainInfo.blocks) {
        throw new Error('Oops! No blockchain info received.')
    }

    /* Start (sync) database indexers. */
    manageWiserswaps()
})()
