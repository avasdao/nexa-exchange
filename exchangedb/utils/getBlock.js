/* Import modules. */
import { callNode } from '@nexajs/rpc'

/* Set node options. */
const RPC_OPTIONS = {
    username: process.env.RPC_USERNAME || 'user', // required
    password: process.env.RPC_PASSWORD || 'password', // required
    host: process.env.RPC_HOST || '127.0.0.1', // (optional) default is localhost (127.0.0.1)
    port: process.env.RPC_PORT || '7227', // (optional) default is 7227
}

/**
 * Get Block
 *
 * Retrieves the block information from the local node.
 */
export default async (_blockHash) => {
    let method
    let options
    let params
    let response

    /* Set method. */
    method = 'getblock'

    /* Set parameters. */
    params = [_blockHash]

    /* Set node options. */
    options = {
        username: process.env.RPC_USERNAME || 'user', // required
        password: process.env.RPC_PASSWORD || 'password', // required
        host: process.env.RPC_HOST || '127.0.0.1', // (optional) default is localhost (127.0.0.1)
        port: process.env.RPC_PORT || '7227', // (optional) default is 7227
    }

    /* Execute JSON-RPC request. */
    response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}
