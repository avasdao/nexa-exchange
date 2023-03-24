/* Import types. */
import AffiliateType from '../types/Affiliate.js'

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

const TEST_AFFILIATE = {
    affiliateid: '12345',
    shortid: '123',
    rewards: {
        rewardid: 'abcef',
        affiliateid: '12345',
        amount: 1337,
        dateCreated: 1234567890,
    },
    dateAdded: 1234567890,
}

export default {
    type: AffiliateType,
    resolve: (parent, args, params) => {
        console.log('AFFILIATE PARAMS:', params)
        return TEST_AFFILIATE
    },
    description: `Add a new Affiliate to the Exchange Rewards program.`,
}
