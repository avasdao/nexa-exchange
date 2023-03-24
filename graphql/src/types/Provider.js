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
    name: 'Provider',
    fields: () => ({
        field1: { type: GraphQLString },
        field2: { type: GraphQLInt },
        field3: { type: GraphQLInt },
    }),
    description: `A __Provider__ is a generic space for 3rd-party affiliates.`,
})
