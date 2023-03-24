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

export default new GraphQLObjectType({
    name: 'Block',
    fields: () => ({
        hash: { type: GraphQLString },
        confirmations: { type: GraphQLInt },
        height: { type: GraphQLInt },
    }),
    description: `A __Block__ contains the details for a miner-submitted pool of [Transaction](/transaction)(s) to be confirmed by the Network.`,
})
