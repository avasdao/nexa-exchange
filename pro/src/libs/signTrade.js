const signTrade = async () => {
    // console.log('Signing nexa transfer for nexa trade..')

    const web3 = new Web3(ethereum)

    let anamenexa = '0x565d0859a620aE99052Cc44dDe74b199F13A3433'
    let ttl = 5210054
    let expiration = 1552543377

    const contract = { t: 'address', v: anamenexa }
    const token = { t: 'address', v: '0xc778417E063141139Fce010982780140Aa0cD5Ab' }
    const from = { t: 'address', v: ethereum.selectedAddress }
    const to = { t: 'address', v: '0xE632A8cBfcd7bF9d87dac9B59A039007080658CA' }
    const tokens = { t: 'uint256', v: '7000000000000000' } // 0.007 WETH
    // const staekholder = { t: 'bytes', v: '0x1936712F2Ff24469b41F1E665AB6483e6CaE2035' }
    const staekholder = { t: 'bytes', v: '0x0000000000000000000000000000000000000000' }
    const staek = { t: 'uint256', v: '0' }
    const expires = { t: 'uint256', v: ttl }
    const nonce = { t: 'uint256', v: expiration } // seconds
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
}

export default signTrade
