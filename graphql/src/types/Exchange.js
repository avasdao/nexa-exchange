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
    name: 'Exchange',
    fields: () => ({
        field1: { type: GraphQLString },
        field2: { type: GraphQLInt },
        field3: { type: GraphQLInt },
    }),
    description: `An __Exchange__ offers a complete interface to its respective Platform.`,
})
