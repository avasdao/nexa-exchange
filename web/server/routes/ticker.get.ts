/* Import modules. */
// import moment from 'moment'
import PouchDB from 'pouchdb'
// import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
// const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const tickerDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/ticker`)

export default defineEventHandler(async (event) => {
    const response = await tickerDb
        .allDocs({
            include_docs: true,
            limit: 1,
            descending: true,
        })
        .catch(err => console.error(err))
    // console.log('RESPONSE (ticker):', response)

    /* Validate response. */
    if (response?.rows[0]?.doc) {
        const doc = response?.rows[0]?.doc

        const quote = {
            USD: {
                price: doc.quote.USD.price,
                vol24: doc.quote.USD.volume_24h,
                volChg24: doc.quote.USD.volume_change_24h,
                pctChg1h: doc.quote.USD.percent_change_1h,
                pctChg24h: doc.quote.USD.percent_change_24h,
                pctChg7d: doc.quote.USD.percent_change_7d,
                pctChg30d: doc.quote.USD.percent_change_30d,
                marketCap: doc.quote.USD.market_cap,
            }
        }

        const pkg = {
            name: doc.name,
            symbol: doc.symbol,
            numMarkets: doc.num_market_pairs,
            maxSupply: doc.max_supply,
            circulatingSupply: doc.circulating_supply,
            totalSupply: doc.total_supply,
            updatedAt: doc.last_updated,
            quote,
        }

        /* Return ticker (package). */
        return pkg
    } else {
        /* Return error message. */
        return {
            error: `Oops! It looks like we don't have any ticker information. Administrators have been notified of the situation.`
        }
    }
})
