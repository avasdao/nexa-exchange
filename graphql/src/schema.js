/* Import modules. */
import { PubSub } from 'graphql-subscriptions'

/* Import types. */
import BlockType from './types/Block.js'

/* Import mutations. */
import createOrder from './mutations/createOrder.js'
import createSession from './mutations/createSession.js'

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

/* Initialize PubSub. */
const pubsub = new PubSub()

// FOR DEV PURPOSES ONLY
let counter = 1337
const SAMPLE_BLOCK = {
  "hash": "78ee2c10c94e377a56c2d25e6478d75b3168043dec6a4bfaabc73421a03df8aa",
  "confirmations": 1,
  "height": 0,
}

// FOR DEV PURPOSES ONLY
setInterval(() => {
    pubsub.publish('NEW_BLOCK', { block: {
        ...SAMPLE_BLOCK,
        height: counter++,
    } })
}, 5000)

/**
 * GraphQL Schema
 *
 * Construct a GraphQL schema and define the necessary resolvers.
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
                    // Datastore logic lives in blockchainController
                    // return blockchainController.broadcast(args)
                    console.log('BLOCKCHAIN CONTROLLER:', blockchainController)
                    return 'Broadcasted successfully!'
                },
                description: `Broadcast description goes here...`,
            },
            createOrder,
            createSession,
        },
        description: `Make authenticated requests to the entire suite of Nexa Exchange on-chain services.`,
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
