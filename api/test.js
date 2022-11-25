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

// ;(async () => {
//     // create new account
//     // const address = tronWeb.address.toHex()
//     const address = tronWeb.address.fromPrivateKey(privateKey)
//     console.log('ADDRESS (hex):', address)

//     const balance = await tronWeb.trx.getBalance(address)
//     console.log('BALANCE', balance)

//     const account = await tronWeb.trx.getAccount(address)
//     console.log('ACCOUNT', account)
//     console.log('ACCOUNT (keys):', account.keys)

// })()

const bitcore = require('bitcore-lib-cash')

;(async () => {
    let address
    let publicKeys

    publicKeys = [
        '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
    ]

    const requiredSignatures = 2

    address = new bitcore.Address(publicKeys, requiredSignatures)
    console.log('ADDRESS-1', address.toString())

    const privateKey = new bitcore.PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy')
    const privateKeys = [
        new bitcore.PrivateKey('91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgwmaKkrx'),
        new bitcore.PrivateKey('91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgww7vXtT')
    ]
    publicKeys = privateKeys.map(bitcore.PublicKey)
    address = new bitcore.Address(publicKeys, 2) // 2 of 2
    console.log('ADDRESS-2', address.toString())

    const utxo = {
        txId : '153068cdd81b73ec9d8dcce27f2c77ddda12dee3db424bff5cafdbe9f01c1756',
        outputIndex : 0,
        address : address.toString(),
        script : new bitcore.Script(address).toHex(),
        satoshis : 20000
    }

    const transaction = new bitcore.Transaction()
        .from(utxo, publicKeys, 2)
        .to('mtoKs9V381UAhUia3d7Vb9GNak8Qvmcsme', 20000)
        .sign(privateKeys);
})()
