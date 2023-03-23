import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import rateLimit from 'express-rate-limit'
import PouchDB from 'pouchdb'
import { WebSocketServer } from 'ws'

import { buildSchema } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/express'
import { useServer } from 'graphql-ws/lib/use/ws'

import schema from './src/schema.js'
import typeDefs from './src/typeDefs.js'
import resolvers from './src/resolvers.js'



import { ApolloServer } from '@apollo/server'
// import { startStandaloneServer } from '@apollo/server/standalone'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

// import express from 'express';
// import cors from 'cors';
// import { typeDefs, resolvers } from './schema';

// const server = new ApolloServer({ typeDefs, resolvers })

// const { url } = await expressMiddleware(server, {
//     context: async ({ req }) => ({ token: req.headers.token }),
//     listen: { port: 6000 },
// })
// console.log(`🚀  Server ready at ${url}`);



/* Set port. */
const PORT = 6000

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const txsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/txs`)

/* Initialize Express application. */
const app = express()

/* Enable CORS. */
// app.use(cors())

/* Set rate limits. */
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // NOTE: Default is 2 minutes.
	max: 250, // NOTE: We limit each IP to 250 requests per 2 minute window.
	standardHeaders: true, // NOTE: Return rate limit info in the `RateLimit-*` headers.
	legacyHeaders: false, // NOTE: Disable the `X-RateLimit-*` headers.
})

/* Apply the rate limiting middleware to all requests. */
// app.use(limiter)

// app.set('trust proxy', 3) // NOTE: 0 is localhost, 1,2 are Cloudflare
// app.get('/ip', (request, response) => response.send(request.ip))

const httpServer = http.createServer(app)


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
// Ensure we wait for our server to start
await server.start()


app.use('/', cors(),
    // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
    bodyParser.json({ limit: '50mb' }),

    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
)

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
console.log(`🚀 Server ready at http://localhost:${PORT}/`);


// const server = new WebSocketServer({
//   	port: 7000,
//   	path: '/socket',
// })
// useServer({ schema }, server)
// console.log('Listening for GraphQL /Socket requests on port 7000')

// ------------------------
