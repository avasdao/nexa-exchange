import BlockType from './types/Block.js'

import { PubSub } from 'graphql-subscriptions'

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

const pubsub = new PubSub()

let counter = 1337
const SAMPLE_BLOCK = {
  "hash": "78ee2c10c94e377a56c2d25e6478d75b3168043dec6a4bfaabc73421a03df8aa",
  "confirmations": 1,
  "height": 0,
}

setInterval(() => {
    pubsub.publish('NEW_BLOCK', { block: {
        ...SAMPLE_BLOCK,
        height: counter++,
    } })
}, 5000)

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
                    // Datastore logic lives in blockchainController
                    // return blockchainController.broadcast(args)
                    console.log('BLOCKCHAIN CONTROLLER:', blockchainController)
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
