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
 * Decode Raw Transaction
 *
 * Translates a raw transaction from bytecode to JSON.
 */
export default async (_rawTx) => {
    let method
    let params
    let response

    /* Set method. */
    method = 'decoderawtransaction'

    /* Set parameters. */
    params = [_rawTx]

    /* Execute JSON-RPC request. */
    response = await callNode(method, params, RPC_OPTIONS)
    // console.log('\nJSON-RPC response:\n%s', response)

    /* Return response. */
    return response
}
