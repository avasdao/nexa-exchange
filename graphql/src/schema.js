/* Import modules. */
import { GraphQLSchema } from 'graphql'

/* Import (Schema) objects. */
import mutation from './mutation.js'
import query from './query.js'
import subscription from './subscription.js'

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
