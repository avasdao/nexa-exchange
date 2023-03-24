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

export default {
    type: GraphQLString,
    resolve: (parent, args, params) => {
        // Datastore logic lives in blockchainController
        // return blockchainController.broadcast(args)
        console.log('MUTATION PARAMS:', params)
        return 'Order created successfully!'
    },
    description: `Create a new Order for an asset exchange.`,
}
