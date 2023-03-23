import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import PouchDB from 'pouchdb'
import { WebSocketServer } from 'ws'

import { buildSchema } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/express'
import { useServer } from 'graphql-ws/lib/use/ws'

import schema from './src/schema.js'



import { ApolloServer } from '@apollo/server'
// import { startStandaloneServer } from '@apollo/server/standalone'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

// import express from 'express';
import http from 'http';
// import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './schema';

// const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 6000 },
})
console.log(`🚀  Server ready at ${url}`);



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
});
// Ensure we wait for our server to start
await server.start()


app.use(
  '/',
  cors(),
  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
  bodyParser.json({ limit: '50mb' }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);


// const server = new WebSocketServer({
//   	port: 7000,
//   	path: '/socket',
// })
// useServer({ schema }, server)
// console.log('Listening for GraphQL /Socket requests on port 7000')

// ------------------------

// NOTE: Construct a schema, using GraphQL schema language.
const schema_REF = buildSchema(`
  "Welcome to the Nexa Exchange GraphQL online query manager for Traders."
  type Query {

    "Provides information about on-chain address: balance, first seen, # of transactions and more."
    address(
        "Accepts a base58-formatted (nexa:) address."
        base58: [String],

        "Accepts a raw Script-formatted address."
        script: [String],
    ): [Address]

    "Retreive Block information, including: hash, # of txs, etc."
    block(
		height: [Int],

		hash: [String],
	): [Block]

    "Retreive Metadata stored on-chain."
    meta(
		id: [String],
	): [Meta]

    "Retreive Owner information, including: tokens and transactions."
    owner(
		id: [String],
	): [Owner]

    "Retreive Script information from OP_RETURN."
    script(
        "A string to match when searching."
		id: String,
	): [Script]

    "Retreive Token information, including: id, imageUrl."
    token(
		id: [String],

		owner: [String],
	): [Token]

    "Retreive Transaction information, including: txid, txidem, blocknum."
    transaction(
		txid: [String],

		txidem: [String],
	): [Transaction]

  }

  "This is an ADDRESS type for the Docs."
  type Address {
    "A Base58 encoded address."
    base58: String

    "A raw encoded address."
    script: String

    "The address type."
    type: String
  }

  "This is an BLOCK type for the Docs."
  type Block {
    "Height at which the block was confirmed by the network."
    height: Int

    "Immutable hash of the block data."
    hash: String

	"Size (in bytes) of the block."
    size: Int

	"Number of transactions processed within this block."
    txcount: Int

    feePoolAmt: Int
    merkleroot: String
    time: Int
    mediantime: Int
    nonce: String
    bits: String
    difficulty: Float
    chainwork: String
    utxoCommitment: String
    minerData: String
    status: String
    onMainChain: Boolean
    previousblockhash: String
    ancestorhash: String
    txid: [String]
    txidem: [String]
    txs: [Transaction]
  }

  "This is an GROUP type for the Docs."
  type Group {
    id: String
    owner: Owner
    tokens: [Token]
  }

  "This is an META type for the Docs."
  type Meta {
    id: String
    data: String
  }

  "Owner is a convenient class for retrieving ALL on-chain details for a specific Owner ID."
  type Owner {
    id: String
    address: String
    pubkey: String
    tokens: [Token]
    txs: [Transaction]
  }

  "This is an SCRIPT type for the Docs."
  type Script {
    id: String
    txidem: String
    owner: Owner
  }

  "This is an TOKEN type for the Docs."
  type Token {
    id: String
    owner: String
    groups: [Group]
  }

  "This is an TRANSACTION type for the Docs."
  type Transaction {
    txid: String
    txidem: String
    owner: Owner
    amount: Int
  }
`)

// NOTE: The root provides a resolver function for each API endpoint.
const rootValue = {
    address: async (_args) => {
        /* Set base58. */
        // NOTE: Array of addresses.
        const base58 = _args?.base58 || ['nexa:my-awesome-address']

        return [{
            base58: base58[0],
            script: '001840888777666555444333222111',
            type: 'template',
        }]
    },

    block: async (_args) => {
        /* Initialize blocks. */
        const blocks = []

        /* Set heights. */
        const height = _args?.height

        /* Validate heights. */
        if (!height) {
            return blocks
        }

        /* Handle each height. */
        for (let i = 0; i < height.length; i++) {
            /* Request block data. */
            const block = await blocksDb
                .get(height[i])
                .catch(err => {
                    console.error(err)
                    // TODO: Handle (logging) errors.
                })
            // console.log('BLOCK', block)

            /* Add block to list. */
            blocks.push(block)
        }

        /* Return blocks. */
        return blocks
    },

    meta: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set meta id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            owner: 'nexa:SatoshiOne',
        }]
    },

    owner: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set owner id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            tokens: [{
                id: 'awesome-token',
                name: 'Awesome Token',
            }, {
                id: 'super-token',
                name: 'Super Token',
            }],
        }]
    },

    script: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set script id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            owner: 'nexa:SatoshiOne',
        }]
    },

    token: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set token id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            owner: 'nexa:SatoshiOne',
        }]
    },

    transaction: async (_args) => {
        /* Initialize locals. */
        let txidem

        /* Set tx idem. */
        txidem = _args?.txidem || ['my-leet-txidem']

        /* Validate array. */
        if (!Array.isArray(txidem)) {
            txidem = [txidem]
        }

        // TODO Add queries.

        return [{
            txid: 'my-leet-txid',
            txidem: txidem[0],
            amount: 1337.00
        }]
    },
}

/* Set interactive flag. */
const graphiql = {
    defaultQuery: `######################################################################
#
#  Welcome to the Nexa Exchange GraphiQL
#
#  Nexa Traders should make great use of this tool for:
#    ✔ Comprehensive market analysis
#    - validating queries
#    - and testing queries
#
#  Sample queries from each (of 5) data categories shown below:
#
#        Assets:   Request transaction histories
#                   and full balance details.
#
#          Markets:   Request confirmation and transaction
#                   details.
#
#           Orders:   Request information from Meta (extended)
#                   on-chain data.
#
#          Reports:   Request all available on-chain details for
#                   a specific Owner ID.
#
#         Swap:   Request on-chain metadata details stored
#                   in a transaction's 'OP_RETURN' script area.
#
######################################################################

{
  # Sample address query
  address(base58: "nexa:...") {
    base58
    script
    type
  }

  # Sample block query
  block(height: [227570, 227571, 227572]) {
    height
    hash
    size
    txcount
    time
    mediantime
    nonce
    bits
    difficulty
    utxoCommitment
    minerData
  }

  # Sample meta query
  meta(id: "txidem-for-some-nft-pfp") {
    id
  }

  # Sample owner query
  owner(id: "nexa:someone-with-too-many-nfts") {
    id
  }

  # Request specific data match based on OP_RETURN
  # data stored on-chain.
  # NOTE: 'FUZ' is the datacode for a CashFusion transaction.
  script(id: "FUZ") {
    id
    txidem
    owner {
      id
    }
  }

  # Sample token query
  token(id: "a-very-cool-tokenid") {
    id
  }

  # Sample transaction query
  transaction(txid: "my-super-expensive-txid") {
    txid
    txidem
    amount
  }
}
    `,
}

/* Set options. */
const graphqlOptions = {
    schema,
    rootValue,
    graphiql,
}

/* Setup GraphQL endpoint. */
// app.use('/graphql', graphqlHTTP(graphqlOptions))

// app.all('/graphql', createHandler(graphqlOptions))

// app.listen({ port: PORT })
// console.log(`Listening for /GraphQL requests on port ${PORT}`)


// app.listen(PORT)
// console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
