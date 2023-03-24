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
    name: 'Session',
    fields: () => ({
        sessionid: { type: new GraphQLNonNull(GraphQLString) },
        errors: { type: GraphQLString },
    }),
    description: `A __Session__ allows for _authenticated_ requests.`,
})
