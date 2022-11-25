'use strict'

const express = require('express')
const cors = require('cors')

/* Set constants. */
const HOST = '127.0.0.1'
const PORT = 3000

/* Initialize application. */
const app = express()

/* Initialize CORS. */
app.use(cors())

/* Initialize JSON parser. */
app.use(express.json())

/* Initialize URL parser. */
app.use(express.urlencoded({ extended: true }))

/* Initialize public folder. */
app.use(express.static('public'))

/* Initialize Administration route. */
app.post('/v1/admin', require('./routes/admin'))

/* Initialize Bootstrap route. */
app.post('/v1/bootstrap', require('./routes/bootstrap'))

/* Initialize Magic (Email) Link route. */
app.post('/v1/magiclink', require('./routes/magiclink'))

/* Initialize Notifications route. */
app.post('/v1/notifs', require('./routes/notifs'))

/* Initialize Orders route. */
app.get('/v1/orders', require('./routes/orders'))
app.get('/v1/orders/:orderid', require('./routes/orders'))
app.post('/v1/orders', require('./routes/orders'))

/* Initialize Profiles route. */
app.post('/v1/profiles', require('./routes/profiles'))

/* Initialize RPC route. */
app.post('/v1/rpc', require('./routes/rpc'))

/* Initialize Sessions route. */
app.post('/v1/sessions', require('./routes/sessions'))

/* Initialize Proxies route. */
app.get('/v1/ticker/price/:assetid', require('./routes/proxy'))
app.get('/v1/ticker/quote/:assetid', require('./routes/proxy'))

// TODO: Offer help.
app.get('/v1', (req, res) => {
    res.end('Oops! I think you forgot something.')
})

/* Start listening for connections. */
app.listen(PORT, HOST)

/* Display current environment variables. */
console.info()
console.log(`Running on http://${HOST}:${PORT}`)
console.info()
console.info('Current Environment Variables')
console.info('-----------------------------')
console.info('  - NODE_ENV         :', process.env.NODE_ENV)
console.info('  - COUCHDB_AUTH     :', process.env.COUCHDB_AUTH)
console.info('  - MAGIC_LINK_KEY   :', process.env.MAGIC_LINK_KEY)
console.info('  - SMTP_HOST        :', process.env.SMTP_HOST)
console.info('  - SMTP_USER        :', process.env.SMTP_USER)
console.info('  - SMTP_PASS        :', process.env.SMTP_PASS)
console.info('  - TRADE_ENGINE_KEY :', process.env.TRADE_ENGINE_KEY)
console.info()
