/* Import modules. */
import PouchDB from 'pouchdb'
import { getTip } from '@nexajs/rostrum'

/* Initialize databases. */
const tvlDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/tvl`)

const SAMPLE_TVL = [
    {
        "satoshis": 638876,
        "token_amount": 115,
        "token_id": "38fc1a23370b089f45e5c76d2d78798b10965b634a759713bc9a39819217ba02"
    },
    {
        "satoshis": 2603547,
        "token_amount": 50,
        "token_id": "4fc338ac459519e5769ab097fa8927b2bbb3120b63d56584822cd4d14527447c"
    },
    {
        "satoshis": 1201639,
        "token_amount": 23,
        "token_id": "66bb036eb0c688b06905f12559885cf86be933289bb64135b6f77a213f234a11"
    },
    {
        "satoshis": 333534,
        "token_amount": 5,
        "token_id": "81fd176d7e3769aad00bc21539082cc3345f9cd613623fa281e6726f451f32f9"
    },
    {
        "satoshis": 100000,
        "token_amount": 26,
        "token_id": "841a9e7522200b5fdd7023c7c71d17b93579283e28a362718cbcb551aea36635"
    },
    {
        "satoshis": 2000000,
        "token_amount": 44,
        "token_id": "f0cb3d21305b2c774bf8b6dc70cb1cdf72625efb504fe2990a55865622c20c6e"
    },
    {
        "satoshis": 12846900,
        "token_amount": 12764657,
        "token_id": "ff4d6e4b90aa8158d39c5dc874fd9411af1ac3b5ed6f354755e8362a0d02c6b3"
    }
]

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let blockTip
    let timestamp
    let doc
    let pkg
    let quote
    let response
    let totalSupply
    let tvl

    /* Set token id. */
    timestamp = event.context.params.timestamp
    console.log('TIMESTAMP', timestamp)

    /* Request ticker. */
    response = await tvlDb
        .allDocs({
            include_docs: true,
            limit: 1,
            descending: true,
        })
        .catch(err => console.error(err))
    console.log('RESPONSE (tvl):', response)

    /* Validate response. */
    if (typeof response !== 'undefined' && response.rows) {
        /* Find timestamp. */
        tvl = response.rows.find(_tvl => {
            return _tvl.id === timestamp
        })

        /* Validate TVL. */
        if (tvl) {
            /* Set doc. */
            tvl = tvl.doc

            /* Sanitize data. */
            // FIXME Build package.
            delete tvl._id
            delete tvl._rev

            /* Return TVL. */
            // return tvl
            return SAMPLE_TVL
        }

        /* Return null/empty result. */
        return {}

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
            // pkg.circulatingSupply = totalSupply
            pkg.totalSupply = totalSupply
            // pkg.marketCap = totalSupply * doc.quote.USD.price
        }

        /* Return ticker (package). */
        return pkg
    } else {
        /* Return error message. */
        return {
            error: `Oops! It looks like we don't have any TVL information. Administrators have been notified of the situation.`
        }
    }
})
