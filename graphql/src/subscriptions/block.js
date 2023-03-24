/* Import types. */
import BlockType from '../types/Block.js'

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

import { PubSub } from 'graphql-subscriptions'
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

export default {
    type: BlockType,
    subscribe: () => pubsub.asyncIterator(['NEW_BLOCK']),
    description: `A Block subscription will report every new block that appears on the blockchain.`,
}
