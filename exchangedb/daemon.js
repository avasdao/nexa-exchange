/* Import modules. */
import fetch from 'node-fetch'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Import environment variables. */
const CMC_API_KEY = process.env.CMC_API_KEY

/* Set endpoint. */
const CMC_API_ENDPOINT = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'

/* Set (request) target. */
const target = CMC_API_ENDPOINT + `?symbol=NEXA` // ID = 23380

/* Initialize constants. */
const UPDATE_INTERVAL = 3e5 // default: 5 minutes
const BLOCKCHAIN_UPDATE_INTERVAL = 6e4 // default: 1 minute

/* Import helpers. */
import decodeRawTransaction from './utils/decodeRawTransaction.js'
import getBlock from './utils/getBlock.js'
import getBlockchainInfo from './utils/getBlockchainInfo.js'

/* Import indexers. */
import hodlsIndexer from './indexer/hodls.js'
import stakehousesIndexer from './indexer/stakehouses.js'
import tradingPostsIndexer from './indexer/tradingPosts.js'
import wiserSwapsIndexer from './indexer/wiserSwaps.js'

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

const manageHodls = async () => {
    await hodlsIndexer(blockchainInfo.blocks)
    setTimeout(manageHodls, 1000)
}

const manageStakehouses = async () => {
    await stakehousesIndexer(blockchainInfo.blocks)
    setTimeout(manageStakehouses, 1000)
}

const manageTradingPosts = async () => {
    await tradingPostsIndexer(blockchainInfo.blocks)
    setTimeout(manageTradingPosts, 1000)
}

const manageWiserSwaps = async () => {
    await wiserSwapsIndexer(blockchainInfo.blocks)
    setTimeout(manageWiserSwaps, 1000)
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
    manageHodls()
    manageStakehouses()
    manageTradingPosts()
    manageWiserSwaps()
})()
