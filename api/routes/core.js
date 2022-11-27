/* Import modules. */
const Client = require('bitcoin-core')
const ethers = require('ethers')
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/* Initialize new Bitcoin client. */
const client = new Client({
    port: process.env.NEXA_RPC_PORT || 7227, // Testnet RPC port is 7229
    host: process.env.NEXA_RPC_HOST || '127.0.0.1',
    username: process.env.NEXA_RPC_USER || 'user',
    password: process.env.NEXA_RPC_PASS || 'password',
})

/**
 * Remote Procedure Call (RPC)
 *
 * @param {String} _method
 * @param {Object} _params
 * @returns
 */
const rpc = async (_method, _params) => {
    let endpoint
    let error
    let response

    try {
        /* Set endpoint. */
        endpoint = `http://user:password@127.0.0.1:7227`

        /* Build package. */
        const pkg = {
            "jsonrpc": "2.0",
            "id": "core",
            "method": _method,
            "params": _params,
        }

        /* Request Elasticsearch query. */
        response = await superagent
            .post(endpoint)
            .set('accept', 'json')
            .send(pkg)
            .catch(_err => {
                console.error(_err)

                if (_err && _err.response && _err.response.text) {
                    error = JSON.parse(_err.response.text)
                } else if (_err && _err.response) {
                    error = _err.response
                } else {
                    error = _err
                }
            })

        /* Validate error. */
        if (error) {
            return error
        }

        /* Validate response. */
        if (!response) {
            return null
        }
        // console.log('\nRPC CALL (response):', response)

        /* Validate response. */
        if (response.body && response.body.result) {
            return response.body.result
        } else if (response.text) {
            return response.text
        } else {
            return null
        }

    } catch (err) {
        return err
    }
}

/**
 * Core (Node) Module
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const core = async function (req, res) {
    let action
    let address
    let body
    let endpoint
    let params
    let pkg
    let response

    try {
        body = req.body
        console.log('BODY', body)

        action = body.action
        address = body.address
        params = body.params

        /* Validate body. */
        if (!body) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing body parameter.'
            })
        }

        if (action === 'getbalance') {
            const balance = await client
                .getBalance('*', 0)
                .catch(err => {
                    console.error('ERROR (getbalance):', err)
                })
            // console.log('BALANCE', balance)
            return res.json(balance)
        }

        /* Handle mining candidate. */
        if (action === 'getminingcandidate') {
            /* Make core request. */
            response = await rpc(action, params)
            // console.log('RPC RESPONSE', response)

            /* Return response. */
            return res.json(response)
        }

        if (action === 'getmininginfo') {
            const miningInfo = await rpc(action, params)
            // console.log('MINING INFO', miningInfo)

            return res.json(miningInfo)
        }

        if (action === 'validateaddress') {
            const validateAddress = await rpc(action, params)
            // console.log('VALIDATE ADDRESS', validateAddress)

            return res.json(validateAddress)
        }

        if (!pkg) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Invalid action requested.'
            })
        }

        /* Fallback. */
        return res.end('Oops! Something went wrong.')
    } catch (err) {
        console.error('CORE ERROR', err)

        return res.json(err)
    }
}

/* Export module. */
module.exports = core
