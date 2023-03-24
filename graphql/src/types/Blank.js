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
    name: 'Blank',
    fields: () => ({
        field1: { type: GraphQLString },
        field2: { type: GraphQLInt },
        field3: { type: GraphQLInt },
    }),
    description: `A __Blank__ description goes here.`,
})
