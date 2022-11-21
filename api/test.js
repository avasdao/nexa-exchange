const TronWeb = require('tronweb')

// const tronWeb = new TronWeb({
//     fullHost: 'https://api.trongrid.io',
//     headers: { 'TRON-PRO-API-KEY': '5614f392-af1c-44d0-8713-32bd0729d9ab' },
//     privateKey: 'your private key'
// })


const fullNode      = 'https://api.shasta.trongrid.io'
const solidityNode  = 'https://api.shasta.trongrid.io'
const eventServer   = 'https://api.shasta.trongrid.io'
const privateKey    = 'cb81dbac94567046df25572240c00bd2db521f0a11d023f682bd6a73bc8f77ef'

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
)

;(async () => {
    // create new account
    // const address = tronWeb.address.toHex()
    const address = tronWeb.address.fromPrivateKey(privateKey)
    console.log('ADDRESS (hex):', address)

    const balance = await tronWeb.trx.getBalance(address)
    console.log('BALANCE', balance)

    const account = await tronWeb.trx.getAccount(address)
    console.log('ACCOUNT', account)
    console.log('ACCOUNT (keys):', account.keys)

})()
