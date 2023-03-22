/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Define Ticker */
interface APIResponse {
    status: Object,
    data: CMCData,
}

/* Define CoinMarketCap Data */
interface CMCData {
    NEXA: Object,
}

const CMC_API_KEY: string | undefined = process.env.CMC_API_KEY

/* Set endpoint. */
const CMC_API_ENDPOINT: string = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'

/* Set (request) target. */
const target: string = CMC_API_ENDPOINT + `?symbol=NEXA` // ID = 23380

/* Initialize ticker. */
let ticker: CMCData | unknown

const headers: HeadersInit = {
    'accept': 'json',
    'Content-type': 'application/json;charset=utf-8',
    'X-CMC_PRO_API_KEY': CMC_API_KEY || '',
}

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const tickerDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/ticker`)

/**
 * Manage the latest ticker information for NEXA.
 *
 * Will query CoinMarketCap API to retrieve the latest
 * data every 300 seconds (5 minutes).
 */
;(async () => {
    try {
        /* Request data. */
        const response: APIResponse = await $fetch(target, {
            headers,
        })
        // console.log('API RESPONSE', response)

        let success

        success = await logsDb
            .put({
                _id: uuidv4(),
                source: 'ticker',
                body: response,
                createdAt: moment().unix(),
            })
        // console.log('SUCCESS (logs):', success)

        if (response?.data?.NEXA) {
            /* Set ticker to the response. */
            ticker = response.data.NEXA

            success = await tickerDb
                .put({
                    _id: uuidv4(),
                    ...response.data.NEXA,
                    createdAt: moment().unix(),
                })
            // console.log('SUCCESS (ticker):', success)
        }

    } catch (err) {
        // FIXME Handle errors. (setup Bugsnag)
        console.error(err)
    }

})()

export default defineEventHandler((event) => {
    /* Set error message. */
    const errorMsg = {
        error: `Oops! It looks like we don't have any ticker information. Administrators have been notified of the situation.`
    }

    /* Return ticker. */
    return ticker || errorMsg
})
