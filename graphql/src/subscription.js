/* Import modules. */
import { GraphQLObjectType } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

/* Import subscriptions. */
import block from './subscriptions/block.js'
import greetings from './subscriptions/greetings.js'

/* Initialize PubSub. */
const pubsub = new PubSub()

// FOR DEV PURPOSES ONLY
let counter = 1337
const SAMPLE_BLOCK = {
  "hash": "78ee2c10c94e377a56c2d25e6478d75b3168043dec6a4bfaabc73421a03df8aa",
  "confirmations": 1,
  "height": 0,
}

// FOR DEV PURPOSES ONLY
setInterval(() => {
    pubsub.publish('NEW_BLOCK', { block: {
        ...SAMPLE_BLOCK,
        height: counter++,
    } })
}, 5000)

/* Set name. */
const name = 'Subscription'

/* Set (Mutation) fields. */
const fields = {
    block: block(pubsub),
    greetings,
}

/* Set (Mutation) description. */
const description = `
Subscribe to a feed of authenticated data directly from the Nexa blockchain.
See the [Docs](https://docs.nexa.exchange) for more info.
`.trim()

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
