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

export default GraphQLObjectType({
    name: 'Session',
    fields: () => ({
        errors: { type: GraphQLString },
        sessionid: { type: GraphQLNonNull(GraphQLString) },
    }),
    description: `A __Session__ allows for _authenticated_ requests.`,
})
