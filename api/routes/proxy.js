/* Import modules. */
const superagent = require('superagent')

/**
 * Proxy Module
 */
const proxy = async function (req, res) {
    let assetid
    let orderid
    let result
    let routePath

    // console.log(req)
    routePath = req.route.path
    // console.log('Route path', routePath)

    if (!routePath) {
        return res.end()
    }

    if (routePath === '/v1/swaps/:orderid') {
        orderid = req.params.orderid
        result = await superagent.get(`https://api.telr.io/v1/concierge/${orderid}`)
    }

    if (routePath === '/v1/ticker/price/:assetid') {
        assetid = req.params.assetid
        result = await superagent.get(`https://api.telr.io/v1/ticker/price/${assetid}`)
    }

    if (routePath === '/v1/ticker/quote/:assetid') {
        assetid = req.params.assetid
        result = await superagent.get(`https://api.telr.io/v1/ticker/quote/${assetid}`)
    }

    // console.log('RESULT', result)
    if (!result) {
        return res.end()
    }

    /* Validate result (body). */
    if (result.body && Object.keys(result.body) > 0) {
        /* Return JSON. */
        res.json(result.body)
    } else if (result.text) {
        /* Let's try and decode the text into JSON. */
        try {
            /* Parse JSON. */
            const json = JSON.parse(result.text)

            /* Return JSON. */
            res.json(json)
        } catch (err) {
            console.error('FAILED! Could not proxy request.', err)

            /* Return text. */
            res.end(result.text)
        }
    } else {
        /* Fallback. */
        res.end()
    }
}

/* Export module. */
module.exports = proxy
