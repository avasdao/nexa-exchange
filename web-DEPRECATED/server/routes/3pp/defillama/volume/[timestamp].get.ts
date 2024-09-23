/* Import modules. */
import PouchDB from 'pouchdb'
import { getTip } from '@nexajs/rostrum'

/* Initialize databases. */
const volumeDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/volume`)

const SAMPLE_VOLUME = [
    {
        "one_day_sats": 0,
        "thirty_days_sats": 33878,
        "token_id": "02a690fadd8e3ff5539726c6eca6c2b8039bce945634d78ac46b1db26a8a0eaf",
        "total_sats": 92285
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 3518676,
        "token_id": "15b6e0152a4ecb7a561ac0e1f3dca540db8133c520bffdaf532e6d99b4f980e3",
        "total_sats": 16399036
    },
    {
        "one_day_sats": 1073660919,
        "thirty_days_sats": 10514801715,
        "token_id": "d9ab24ed15a7846cc3d9e004aa5cb976860f13dac1ead05784ee4f4622af96ea",
        "total_sats": 16757605756
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 867576,
        "token_id": "391241c4ebc7ee249434da3bd7aaadf58db9294962cff999f9317c266e4ae020",
        "total_sats": 1258839
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 90139209,
        "token_id": "482d555258d3be69fef6ffcd0e5eeb23c4aaacec572b25ab1c21897600c45887",
        "total_sats": 125538843
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 0,
        "token_id": "5438105b673cbc062326daaa71d91889d3b1754386132d5bd9c9cd212fea536f",
        "total_sats": 310083
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 0,
        "token_id": "4a3cf93cc0921e64c1f6dd6f8e348888be5e289d0b4f6cedb9b718b8d9590259",
        "total_sats": 2150190
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 5994,
        "token_id": "38fc1a23370b089f45e5c76d2d78798b10965b634a759713bc9a39819217ba02",
        "total_sats": 3213490
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 0,
        "token_id": "2622a3edef92315442dc383d3cd0dee8c93feb8c42c95eb6f2fe7abab1c2a867",
        "total_sats": 5557396649
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 0,
        "token_id": "66bb036eb0c688b06905f12559885cf86be933289bb64135b6f77a213f234a11",
        "total_sats": 104984
    },
    {
        "one_day_sats": 2602516,
        "thirty_days_sats": 59670382,
        "token_id": "7955dd3bdbdd0a4f1ff3316865a0995416dd9d9b05e0d075b075069428e64cc4",
        "total_sats": 111921284
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 0,
        "token_id": "9efbad475f0fb80fb5f30e27a7432d625694996e23c227880887483b85979788",
        "total_sats": 14623252
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 1800793,
        "token_id": "8d76840bf20eb57f002e67f0ddec0698639db6c99c4a9c736f711b7c86fcbf22",
        "total_sats": 1800793
    },
    {
        "one_day_sats": 169801,
        "thirty_days_sats": 65304815,
        "token_id": "67f37913382a5ffcde88dbd689faf7098d7dcb92a93dd49878bd8ed64b80a85b",
        "total_sats": 302797893
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 66516,
        "token_id": "d44bf7822552d522802e7076dc9405f5e43151f0ac12b9f6553bda1ce8560002",
        "total_sats": 66516
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 41884037,
        "token_id": "5fa49b2cb281c87af59e74dd10d391b3d255849cab1ba49f5c953dff1947829b",
        "total_sats": 644350114
    },
    {
        "one_day_sats": 50553015,
        "thirty_days_sats": 903077812,
        "token_id": "8473d94f604de351cdee3030f6c354d36b257861ad8e95bbc0a06fbab2a2f9cf",
        "total_sats": 3859566357
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 182959653,
        "token_id": "23d41eb262cf32e6a8a94fe3432a03f649ca647a66a1a42f3168b0608291fa42",
        "total_sats": 182959653
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 0,
        "token_id": "ee552bdb70f9ae9fb212467fee7f0e56bc1264ff4956d85d0fde62513498f681",
        "total_sats": 212
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 1712014,
        "token_id": "2f0b0762d896c023819bc46a851c3451360a3191de606d4d5eb72abb40170302",
        "total_sats": 1712014
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 0,
        "token_id": "4fc338ac459519e5769ab097fa8927b2bbb3120b63d56584822cd4d14527447c",
        "total_sats": 103076
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 28585264,
        "token_id": "7918bd4f1f20c81d1338f2ce312558698d54d65dcc5208e90c4743fe6b1544d3",
        "total_sats": 34937596
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 8463469,
        "token_id": "bc1faf2615c0b2bdf94036f40f7b3b7bca87f8e515660905b4c454e150ee4f68",
        "total_sats": 9274622
    },
    {
        "one_day_sats": 4642890,
        "thirty_days_sats": 184305698,
        "token_id": "b69f76548653033603cdcb81299e3c1d1f3d61ad66e7ba0e6569b493605b4cbe",
        "total_sats": 447171637
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 354973,
        "token_id": "de980d12e49999f1dbc8d61a8f119328f7be9fb1c308eafe979bf10abb17200d",
        "total_sats": 6964123
    },
    {
        "one_day_sats": 11923030,
        "thirty_days_sats": 94890904,
        "token_id": "e9fed7ad0b4ece9e7f6a4f9644264467f5ce410ea20f32e0e7adc147d5e5180d",
        "total_sats": 308575745
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 23620,
        "token_id": "4ef5cf7feae104cff07259bd29ad2173d42658db3e6aceba30c847596db78fbc",
        "total_sats": 2414641
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 17,
        "token_id": "b62431202f3da15b3f1cb1f8f187731d7e0d25933ddfce781368960a983e985e",
        "total_sats": 2428752
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 6784897,
        "token_id": "ff4d6e4b90aa8158d39c5dc874fd9411af1ac3b5ed6f354755e8362a0d02c6b3",
        "total_sats": 148337191
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 101001,
        "token_id": "36546e4062a1cfd070a4a8d8ff9db18aae4ddf8d9ac9a4fa789314d108b49797",
        "total_sats": 7189032
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 3784,
        "token_id": "841a9e7522200b5fdd7023c7c71d17b93579283e28a362718cbcb551aea36635",
        "total_sats": 3784
    },
    {
        "one_day_sats": 483509,
        "thirty_days_sats": 2091180,
        "token_id": "1c427a7a7b46eff710b03c7abc794f4f84360e632a3983a782650d2d394148f9",
        "total_sats": 2653738
    },
    {
        "one_day_sats": 0,
        "thirty_days_sats": 353070864,
        "token_id": "b79bfc8246b5fc4707e7c7dedcb6619ef1ab91f494a790c20b0f4c422ed95b92",
        "total_sats": 136260552868
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
    response = await volumeDb
        .allDocs({
            include_docs: true,
            limit: 1,
            descending: true,
        })
        .catch(err => console.error(err))
    console.log('RESPONSE (volume):', response)



    /* Return statistics. */
    return SAMPLE_VOLUME
})
