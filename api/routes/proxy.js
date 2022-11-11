/* Import modules. */
const superagent = require('superagent')

/**
 * Proxy Module
 */
const proxy = async function (req, res) {
    let assetid
    let result
    let routePath

    // console.log(req)
    routePath = req.route.path
    // console.log('Route path', routePath)

    if (!routePath) {
        return res.end()
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

    if (result.body && Object.keys(result.body) > 0) {
        res.json(result.body)
    } else if (result.text) {
        res.end(result.text)
    } else {
        res.end()
    }
}

/* Export module. */
module.exports = proxy
