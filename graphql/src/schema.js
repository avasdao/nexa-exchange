/* Import (Schema) objects. */
import mutation from './mutation.js'
import query from './query.js'
import subscription from './subscription.js'

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
