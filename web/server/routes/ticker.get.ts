/* Import modules. */
import PouchDB from 'pouchdb'
import { getTip } from '@nexajs/rostrum'

/* Initialize databases. */
const tickerDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/ticker`)

export default defineEventHandler(async (event) => {
    let blockTip
    let doc
    let pkg
    let quote
    let response
    let totalSupply

    response = await tickerDb
        .allDocs({
            include_docs: true,
            limit: 1,
            descending: true,
        })
        .catch(err => console.error(err))
    // console.log('RESPONSE (ticker):', response)

    /* Validate response. */
    if (response?.rows[0]?.doc) {
        doc = response?.rows[0]?.doc

        quote = {
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

        pkg = {
            name: doc.name,
            symbol: doc.symbol,
            numMarkets: doc.num_market_pairs,
            maxSupply: doc.max_supply,
            circulatingSupply: doc.circulating_supply,
            totalSupply: doc.total_supply,
            updatedAt: doc.last_updated,
            quote,
        }

        // NOTE: We need to fix the (incorrect) supply totals from CMC. */
        // FIXME: Add caching to prevent unnecessary requests.
        {
            /* Request block tip. */
            blockTip = await getTip()
                .catch(err => console.error(err))
            // console.log('BLOCK TIP', blockTip)

            totalSupply = blockTip.height * 1e7
            // console.log('TOTAL SUPPLY', totalSupply)

            // NOTE: We need to fix the (incorrect) supply totals from CMC. */
            pkg.circulatingSupply = totalSupply
            pkg.totalSupply = totalSupply
            pkg.marketCap = totalSupply * doc.quote.USD.price
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
