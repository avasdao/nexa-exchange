import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const BlockType = new GraphQLObjectType({
    name: 'Block',
    fields: () => ({
        hash: { type: GraphQLString },
        confirmations: { type: GraphQLInt },
        height: { type: GraphQLInt },
    })
})

const SAMPLE_BLOCK_FULL = {
  "hash": "78ee2c10c94e377a56c2d25e6478d75b3168043dec6a4bfaabc73421a03df8aa",
  "confirmations": 1,
  "height": 236856,
  "size": 9337,
  "txcount": 4,
  "feePoolAmt": 0,
  "merkleroot": "4b56f7934b45316421edcc19b7c03d3e08ebffed9de4563f21b363f716339beb",
  "time": 1679672566,
  "mediantime": 1679672180,
  "nonce": "fa0921f55803629697ea7100",
  "bits": "1a304900",
  "difficulty": 347455.8498503357,
  "chainwork": "000000000000000000000000000000000000000000000003d10c6700e183ac4f",
  "utxoCommitment": "",
  "minerData": "",
  "status": "valid header, tree, transactions, chain, and scripts; has data, has undo; processed, linked",
  "onMainChain": true,
  "previousblockhash": "a588c48d85eda785562a5f46cbfa9a3f9191389ae4f4fa8171c9c195cd771bce",
  "ancestorhash": "176c7f9a1cc5879c8baa7017e380e9e4706e4ff3f86a08e07d8aeb4bbb9ebcf7",
  "txid": [
    "0a92b9eeff641fac562fbbd377e4e6f15d54af1f7779f4adb0fe9ecbe5a46d3a",
    "bf1ebf468701c6c6480f41da9e70e23a11210492f02de19ba8fe7c746c25fffc",
    "c5f4f62832124d0d6fce962e7bdffebf346c10c02b94866d8ccfbb11935c0e82",
    "d1d54ef2bc9556f33be45efd6d05c915dae3a180d860f1e5096534a4b46a7072"
  ],
  "txidem": [
    "7cde811406ff27c1792dcdb90e3e3e810786375100c57a5457b0bc2d91ec5543",
    "b8a0db8c1bac6c33c20a84d4425f27a5f22c6ca4f6bcf52f6206db0ebde607de",
    "a4dbe8635c92099e44b297af1c8d8ff337354b39ef8586a3c06f48d7493a3418",
    "edaf910726ac078953c5511082e111e432567b587cf103b7aa6ecc8212032b42"
  ]
}

let counter = 1337
const SAMPLE_BLOCK_MIN = {
  "hash": "78ee2c10c94e377a56c2d25e6478d75b3168043dec6a4bfaabc73421a03df8aa",
  "confirmations": 1,
  "height": counter++,
}

setInterval(() => {
    pubsub.publish('NEW_BLOCK', { block: SAMPLE_BLOCK_MIN })
}, 5000)

// pubsub.asyncIterator(['NEW_BLOCK'])

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 * type Subscription {
 *   greetings: String
 * }
 */
export default new GraphQLSchema({

    /* Query */
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'world',
                description: `Hello description goes here...`,
            },
        },
        description: `Query description goes here...`,
    }),

    /* Mutation */
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            broadcast: {
                type: GraphQLString,
                resolve: (parent, args, { blockchainController }) => {
                    // pubsub.publish('POST_CREATED', { postCreated: args })

                    // Datastore logic lives in blockchainController
                    // return blockchainController.broadcast(args)
                    return 'Broadcasted successfully!'
                },
                description: `Broadcast description goes here...`,
            },
        },
        description: `Mutation description goes here...`,
    }),

    /* Subscription */
    subscription: new GraphQLObjectType({
        name: 'Subscription',
        fields: {
            greetings: {
                type: GraphQLString,
                subscribe: async function* () {
                    for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
                        yield { greetings: hi }
                    }
                },
                description: `Greetings description goes here...`,
            },

            block: {
                type: BlockType,
                subscribe: () => pubsub.asyncIterator(['NEW_BLOCK']),
                description: `Block description goes here...`,
            },
        },
        description: `Subscription description goes here...`,
    }),

    description: `Default GraphQL description goes here...`,

})
