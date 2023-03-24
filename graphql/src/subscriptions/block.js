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

export default (_pubsub) {
    type: BlockType,
    subscribe: () => _pubsub.asyncIterator(['NEW_BLOCK']),
    description: `A Block subscription will report every new block that appears on the blockchain.`,
}
