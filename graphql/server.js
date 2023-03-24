import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import PouchDB from 'pouchdb'
import { WebSocketServer } from 'ws'

import { createHandler } from 'graphql-http/lib/use/express'
import { createServer } from 'http'
import { useServer } from 'graphql-ws/lib/use/ws'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

/* Import Schema. */
import schema from './src/schema.js'

/* Set (GraphQL) port. */
const PORT = 6000

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
// const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
// const txsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/txs`)

/* Initialize Express application. */
const app = express()

/* Set rate limits. */
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // NOTE: Default is 2 minutes.
	max: 250, // NOTE: We limit each IP to 250 requests per 2 minute window.
	standardHeaders: true, // NOTE: Return rate limit info in the `RateLimit-*` headers.
	legacyHeaders: false, // NOTE: Disable the `X-RateLimit-*` headers.
})

/* Apply the rate limiting middleware to all requests. */
app.use(limiter)

app.set('trust proxy', 3) // NOTE: 0 is localhost, 1,2 are Cloudflare
app.get('/ip', (request, response) => response.send(request.ip))

/* Initialize HTTP server. */
const httpServer = createServer(app)

/* Create WebSocket server. */
const wsServer = new WebSocketServer({
    // NOTE: This is the `httpServer` we created in a previous step.
    server: httpServer,

    // NOTE: Serves expressMiddleware at a this path.
    path: '/graphql',
})

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer)

/* Initialize Apollo Server. */
const server = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose()
                    },
                }
            },
        },
    ],
})

/* Start Apollo Server. */
await server.start()

/* Initialize Express middleware. */
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server))

// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
})
