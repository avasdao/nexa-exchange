/* Import modules. */
const ethers = require('ethers')
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/**
 * RPC Module
 */
const rpc = async function (req, res) {
    let body
    let endpoint
    let pkg
    let response

    body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (!body) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing body parameter.'
        })
    }

    /* Set endpoint. */
    endpoint = `http://user:password@127.0.0.1:7227`
    // console.log('ENDPOINT', endpoint)

    if (body.action === 'getmininginfo') {
        pkg = {
            "jsonrpc": "2.0", 
            "id": "api", 
            "method": "getmininginfo", 
            "params": [],
        }
    }

    if (!pkg) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Invalid action requested.'
        })
    }

    /* Request Elasticsearch query. */
    response = await superagent
        .post(endpoint)
        .send(pkg)
        .set('accept', 'json')
        .catch(err => console.error(err))
    console.log('\nRPC CALL:', response.body)

    if (response && response.body) {
        return res.json(response.body)
    }

    /* Fallback. */
    return res.end('Oops! Something went wrong.')
}

/* Export module. */
module.exports = rpc
