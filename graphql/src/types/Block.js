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
        hash: {
            type: GraphQLString,
            description: `The block hash. [ a 32-btye hex value ]`
        },
        confirmations: {
            type: GraphQLInt,
            description: `The number of confirmations, or -1 if the block is not on the main chain.`
        },
        height: {
            type: GraphQLInt,
            description: `The block height or index.`
        },
    }),
    description: `A __Block__ contains the full details for a miner-submitted pool of Transaction(s) to be confirmed by the Network.`,
})
