/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import subscriptions. */
import block from './subscriptions/block.js'
import greetings from './subscriptions/greetings.js'

/* Set name. */
const name = 'Subscription'

/* Set (Mutation) fields. */
const fields = {
    block,
    greetings,
}

/* Set (Mutation) description. */
const description = `Subscribe to a feed of authenticated data directly from the Nexa blockchain.`

/**
 * Subscription
 *
 * Allows for long-lived subscriptios to Exchange data.
 */
export default new GraphQLObjectType({
    name,
    fields,
    description,
})
