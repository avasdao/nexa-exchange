/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

/* Import types. */
import SessionType from '../types/Session.js'

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
    type: SessionType,
    resolve: (parent, args, params) => {
        console.log('SESSION PARAMS:', params)

        /* Initialize holders. */
        let errors
        let sessionid

        /* Create a new Session ID. */
        sessionid = uuidv4()

        return {
            errors,
            sessionid,
        }
    },
    description: `Create a new Session for authenticated requests.`,
}
