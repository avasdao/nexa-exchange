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

const UPDATE_INTERVAL = 300000 // default: 5 minutes

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
setInterval(update, UPDATE_INTERVAL)

/* Perform an update immediately (at startup). */
update()

console.info('\n\n  Starting Nexa Exchange Database daemon...\n')
