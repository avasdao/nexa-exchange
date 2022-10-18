/* Import modules. */
const ethers = require('ethers')
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/**
 * Sessions Module
 */
const sessions = async function (req, res) {
    console.log('BODY', req.body)

    const body = req.body
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

    const domain = {
        name: 'Nexa Rocks',
        version: '22.9.27',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    }

    // The named list of all type definitions
    const types = {
        Profile: [
            { name: 'email', type: 'string' },
            { name: 'account', type: 'address' },
        ]
    }

    // The data to sign
    const value = {
        email: 'satoshi@bitcoin.org',
        account: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    }

    const signature = body.signature
    console.log('\nSIGNATURE', signature)

    /* Validate signature. */
    if (!signature) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing signature parameter.'
        })
    }

    const isVerified = ethers.utils
        .verifyTypedData( domain, types, value, signature )
    console.log('\nIS VERIFIED', isVerified)

return res.json({
    isVerified,
})

    const id = uuidv4()
    console.log('ID', id)

    const profileid = body.profileid

    const createdAt = moment().unix()

    const updatedAt = null

    /* Build session object. */
    const session = {
        id,
        profileid,
        createdAt,
        updatedAt,
    }

    /* Set endpoint. */
    const endpoint = `http://127.0.0.1:9200/sessions/_doc/${session.id}`
    // console.log('ENDPOINT', endpoint)

    /* Request Elasticsearch query. */
    response = await superagent
        .put(endpoint)
        .send(session)
        .set('accept', 'json')
        .catch(err => console.error(err))
    console.log('\nSESSIONS ADD/UPDATE', response.body)


    return res.json(response.body)
}

/* Export module. */
module.exports = sessions
