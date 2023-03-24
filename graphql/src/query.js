/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import hello from './queries/hello.js'

/* Set name. */
const name = 'Query'

/* Set (Mutation) fields. */
const fields = {
    hello,
}

/* Set (Mutation) description. */
const description = `Make requests for authenticated data directly from the Nexa blockchain.`

/**
 * Query
 *
 * Make requests for Exchagne data.
 */
export default new GraphQLObjectType({
    name,
    fields,
    description,
})
