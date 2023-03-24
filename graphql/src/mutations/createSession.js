/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

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
        console.log('BLANK PARAMS:', params)

        /* Initialize holders. */
        let errors
        let sessionid

        // FOR DEV PURPOSES ONLY
        sessionid = uuidv4()

        return {
            errors,
            sessionid,
        }
    },
    description: `Create a new Session for authenticated requests.`,
}
