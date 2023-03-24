import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql'

import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

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
            },
        },
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
            },
        },
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
                        yield { farewells: `${hi} bye!` }
                    }
                },
            },

            blocks: {
                type: GraphQLString,
                subscribe: () => pubsub.asyncIterator(['NEW_BLOCK']),
            },
        },
    }),

})
