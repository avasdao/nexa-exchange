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
    name: 'Reward',
    fields: () => ({
        rewardid: { type: GraphQLString },
        affiliateid: { type: GraphQLString },
        amount: { type: GraphQLInt },
        dateCreated: { type: GraphQLInt },
    }),
    description: `A __Reward__ is earned from the effort(s) of an Affiliate.`,
})
