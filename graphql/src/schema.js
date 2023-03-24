/* Import modules. */
import { PubSub } from 'graphql-subscriptions'

/* Import (Schema) objects. */
import mutation from './mutation.js'

/* Import types. */
import BlockType from './types/Block.js'

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
 * Query
 *
 * Make requests for Exchagne data.
 */
const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world',
            description: `Hello description goes here...`,
        },
    },
    description: `Query description goes here...`,
})


/**
 * Subscription
 *
 * Allows for long-lived subscriptios to Exchange data.
 */
const subscription = new GraphQLObjectType({
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
})

/**
 * GraphQL Schema
 *
 * Construct a GraphQL schema and define the necessary resolvers.
 */
export default new GraphQLSchema({
    /* Query */
    query,

    /* Mutation */
    mutation,

    /* Subscription */
    subscription,
})
