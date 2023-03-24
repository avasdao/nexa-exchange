/* Import types. */
// import Type from '../types/Type.js'

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
        console.log('ASSET PARAMS:', params)
        return 'This is a GENERIC asset!'
    },
    description: `Discover all the __Assets__ supported by Nexa Exchange and our partners.`,
}
