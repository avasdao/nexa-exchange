const connectMetamask = async () => {
    // console.log('Connecting Metamask..', ethereum)

    const web3 = new Web3(ethereum)

    let anamenexa = '0x565d0859a620aE99052Cc44dDe74b199F13A3433'
    let ttl = 5200000

    const contract = { t: 'address', v: anamenexa }
    const token = { t: 'address', v: '0x079F89645eD85b85a475BF2bdc82c82f327f2932' }
    const from = { t: 'address', v: ethereum.selectedAddress }
    const to = { t: 'address', v: '0xb07d84f2c5d8be1f4a440173bc536e0b2ee3b05e' }
    const tokens = { t: 'uint256', v: '13370000000' }
    // const staekholder = { t: 'bytes', v: '0x1936712F2Ff24469b41F1E665AB6483e6CaE2035' }
    const staekholder = { t: 'bytes', v: '0x0000000000000000000000000000000000000000' }
    const staek = { t: 'uint256', v: '0' }
    const expires = { t: 'uint256', v: ttl }
    const nonce = { t: 'uint256', v: 0 } // seconds
    // const nonce = { t: 'uint256', v: moment().unix() } // seconds

    /* Sign the parameters to generate a hash signature. */
    const sigHash = web3.utils.soliditySha3(
        contract, // nexa's contract address
        token, // token's contract address
        from, // sender's address
        to, // receiver's address
        tokens, // quantity of tokens
        staekholder, // staekholder (NOTE: bytes is the same as address, but w/out checksum)
        staek, // staek amount
        expires, // expiration time
        nonce // nonce (unique integer)
    )

    // console.log('SIGNATURE HASH', sigHash)

    /* Sign signature hash. */
    const signature = await web3.eth.personal.sign(
        sigHash, ethereum.selectedAddress)

    // console.log('SIGNATURE', signature)

    /* Build relay package. */
    const relayPkg = {
        token: token.v,
        from: from.v,
        to: to.v,
        tokens: tokens.v,
        staekholder: staekholder.v,
        staek: staek.v,
        expires: expires.v,
        nonce: nonce.v,
        signature
    }

    // console.log('Relay Package', relayPkg)

    /* Set method. */
    const method = 'POST'

    /* Set headers. */
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    /* Set body. */
    const body = JSON.stringify(relayPkg)

    /* Set options. */
    const options = { method, headers, body }

    /* Initialize (Cache) endpoint. */
    let endpoint = null

    /* Initialize (Cache) endpoint. */
    // FIXME We need to detect the network and connect appropriately.
    if (false) { // MAINNET
        endpoint = 'http://localhost:3000/v1'
        // endpoint = 'https://cache.nexa.exchange/v1'
    } else { // ROPSTEN
        endpoint = 'http://localhost:4000/v1'
        // endpoint = 'https://cache-ropsten.nexa.exchange/v1'
    }

    /* Make RPC. */
    const rawResponse = await fetch(endpoint + '/transfer', options)

    /* Retrieve response. */
    const content = await rawResponse.json()

    // console.log(content)

    return

    const eth = await ethereum.enable()
        .catch(_error => {
            console.error('ERROR:', _error)

            if (
                _error.message == 'User denied account authorization' ||
                _error.code == 4001
            ) {
                alert('Please refresh to Authorize nexa access to your Wallet.')
            }
        })

    // console.log('Address', ethereum.selectedAddress)
    // console.log('Network', ethereum.networkVersion)

    // const web3 = new Web3(ethereum)

    // console.log('WEB BCH', web3.eth)

    // let signed = await web3.eth.sign('Hi there!', ethereum.selectedAddress)
    // let signed = await web3.eth['personal'].sign('Hi there!', ethereum.selectedAddress)
    // let signed = await web3.eth.sign('Hi there!', ethereum.selectedAddress)
    //     .catch(_error => {
    //         console.error('SIGN FAILED:', _error)
    //     })

    // console.log('SIGNED', signed)

    // A JS library for recovering signatures:
    // const sigUtil = require('eth-sig-util')
    const msgParams = [{
        type: 'string',
        name: 'nexa Notice',
        value: `Your authorization / signature is required to continue your request. ` +
               `Please review the details shown below, then click 'SIGN' when ready.`
    }, {
        type: 'string',
        name: 'nexa Summary',
        value: `I want $13.3723 worth of NEX` +
               `\nI am offering 561.8613 USDT` +
               `\nMy offer will expire in ~24 hours`
    }]

    // Get the current account:
    web3.eth.getAccounts(function (err, accounts) {
        if (!accounts) return
        signMsg(msgParams, accounts[0])
    })

    function signMsg (msgParams, from) {
        web3.currentProvider.sendAsync({
            method: 'eth_signTypedData',
            params: [ msgParams, from ],
            from,
        }, function (err, result) {
            if (err) return console.error(err)

            if (result.error) {
                return console.error(result.error.message)
            }

            // console.log('RESULT', result)
        })
    }
}

export default connectMetamask
