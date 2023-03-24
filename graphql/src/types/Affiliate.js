/* Import types. */
import RewardType from '../types/Reward.js'

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
    name: 'Affiliate',
    fields: () => ({
        affiliateid: { type: GraphQLString },
        shortid: { type: GraphQLString },
        rewards: { type: RewardType },
        dateAdded: { type: GraphQLInt },
    }),
    description: `An __Affiliate__ receives Rewards for their supportive efforts.`,
})
