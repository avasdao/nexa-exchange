/* Import (test) modules. */
import { encodeAddress } from '@nexajs/address'
import {
    ripemd160,
    sha256,
} from '@nexajs/crypto'
import { broadcast } from '@nexajs/provider'
import { getCoins } from '@nexajs/purse'
import {
    encodeDataPush,
    encodeNullData,
    OP,
} from '@nexajs/script'
import {
    buildTokens,
    getTokens,
    sendTokens,
} from '@nexajs/token'
import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'

/* Set constants. */
// const STUDIO_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'
const WISERSWAP_HEX = hexToBin('6c6c6c6c6c5579009c63c076cd01217f517f7c817f775279c701217f517f7c817f77537a7b888876c678c7517f7c76010087636d00677f77517f7c76010087636d00677f75816868787c955279cc537acd517f7c76010087636d00677f77517f7c76010087636d00677f7581686878547a94905279527995547aa269c4c353939d02220202102752530164030051145b7a7e56797b95547996765679a4c4547a9476cd547a88cca16903005114587a7e557a587a95547a9676557aa4c4557a9476cd547a88cca16972965379009e63765479a169685479009e63765579a269686d6d6d67557a519d5579827756797ea98871ad6d6d68')
// const ADMIN = hexToBin('45f5b9d41dd723141f721c727715c690fedbbbd6')
// const ADMIN_FEE = '0100' // 256 or 2.56% (FIXME: This is bug limit.)
const DUST_VALUE = BigInt(546)

export default async (
    _poolArgs,
    _baseAsset, // NEXA is the default
    _quoteAsset,
    _amount,
) => {
    console.log('WISERSWAP (script args):', _poolArgs)
    console.log('WISERSWAP (base asset):', _baseAsset)
    console.log('WISERSWAP (quote asset):', _quoteAsset)
    console.log('WISERSWAP (amount):', typeof _amount, _amount)

    /* Initialize wallet (store). */
    const Wallet = useWalletStore()

    /* Initialize locals.*/
    let admin
    let adminAddress
    let adminFee
    let adminSatoshis
    let allTokens
    let amount
    let outputSatoshis
    let outputTokens
    let baseServiceFee
    let contractAddress
    let contractTokens
    let cProduct
    let lockingScript
    let multiplier
    let numDecimals
    let nullData
    let payout
    let payoutAddress
    let payoutSatoshis
    let provider
    let providerFee
    let receivers
    let response
    let scriptHash
    let scriptPubKey
    let tokenidHex
    let tradeCeiling
    let tradeFloor
    let txValue
    let unlockingScript
    let unspentTokens
    let userData
    let walletCoins
    let walletTokens

    console.info('NEXA ADDRESS', Wallet.address)

    /* Set token id. */
    if (_baseAsset === '0') {
        tokenidHex = _quoteAsset
    } else {
        tokenidHex = _baseAsset
    }

    /* Calculate amount (incl. decimals). */
    switch(_quoteAsset) {
    case '0':
        numDecimals = 2
        break
    case '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000': // AVAS
        numDecimals = 8
        break
    case 'a15c9e7e68170259fd31bc26610b542625c57e13fdccb5f3e1cb7fb03a420000': // NXL
        numDecimals = 4
        break
    case '5f2456fa44a88c4a831a4b7d1b1f34176a29a3f28845af639eb9b1c88dd40000': // NXY
        numDecimals = 2
        break
    case '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000': // STUDIO
        numDecimals = 0
        break
    }
    console.log('NUM DECIMALS', numDecimals)

    /* Calculate (decimal) multiplier.*/
    multiplier = 10 ** numDecimals

    /* Calculate amount. */
    // FIXME Add supprot for BigInt multiplier.
    amount = parseInt(_amount * multiplier)

    /* Convert amount (format). */
    amount = BigInt(amount)
    console.log('AMOUNT', typeof amount, amount)

//----------------------------------

    /* Set locking script. */
    lockingScript = WISERSWAP_HEX // FOR DEVELOPMENT PURPOSES ONLY
    // console.info('CONTRACT TEMPLATE', binToHex(lockingScript))

    scriptHash = ripemd160(sha256(lockingScript))
    // console.log('TEMPLATE HASH', binToHex(scriptHash))

    /* Set Admin public key (hash). */
    admin = hexToBin(_poolArgs?.admin)
    console.log('ADMIN HASH', binToHex(admin))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(admin),
    ])
    // console.log('ADMIN HASH', binToHex(admin))
    // console.log('ADMIN SCRIPT PUBKEY', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    adminAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set exchange admin fee. */
    // adminFee = ADMIN_FEE.toString(16)
    // if (adminFee.length % 2 === 1) {
    //     adminFee = '0' + adminFee
    // }
    // adminFee = hexToBin(adminFee)
    // adminFee.reverse()
    // adminFee = encodeDataPush(adminFee)
    // console.log('ADMIN FEE', binToHex(adminFee))

    /* Set Provider public key hash. */
    payout = hexToBin(_poolArgs?.payout)
    console.info('PAYOUT HASH', binToHex(payout))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(payout),
    ])
    // console.info('PAYOUT SCRIPT PUBKEY', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    payoutAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set provider fee. */
    providerFee = _poolArgs?.providerFee.toString(16)
    console.log('PROVIDER FEE-1', providerFee)
    if (providerFee.length % 2 === 1) {
        providerFee = '0' + providerFee
    }
    providerFee = hexToBin(providerFee)
    providerFee.reverse()
    providerFee = encodeDataPush(providerFee)
    console.log('PROVIDER FEE-2', binToHex(providerFee))

    /* Set base service fee. */
    // NOTE: Default is (DUST) 546 satoshis.
    // baseServiceFee = DUST_VALUE.toString(16)
    // if (baseServiceFee.length % 2 !== 0) {
    //     baseServiceFee = baseServiceFee.padStart(baseServiceFee.length + 1, '0')
    // }
    // baseServiceFee = hexToBin(baseServiceFee)
    // baseServiceFee.reverse()
    // baseServiceFee = encodeDataPush(baseServiceFee)
    baseServiceFee = new Uint8Array([ OP.ZERO ])

    /* Set trade ceiling. */
    if (_poolArgs?.ceiling === 0) {
        tradeCeiling = new Uint8Array([ OP.ZERO ])
    } else {
        tradeCeiling = _poolArgs?.ceiling.toString(16)

        if (tradeCeiling.length % 2 === 1) {
            tradeCeiling = '0' + tradeCeiling
        }

        tradeCeiling = hexToBin(tradeCeiling)
        tradeCeiling.reverse()
        tradeCeiling = encodeDataPush(tradeCeiling)
    }
    // console.log('TRADE CEILING', binToHex(tradeCeiling))

    /* Set trade floor. */
    if (_poolArgs?.floor === 0) {
        tradeFloor = new Uint8Array([ OP.ZERO ])
    } else {
        tradeFloor = _poolArgs?.floor.toString(16)

        if (tradeFloor.length % 2 === 1) {
            tradeFloor = '0' + tradeFloor
        }

        tradeFloor = hexToBin(tradeFloor)
        tradeFloor.reverse()
        tradeFloor = encodeDataPush(tradeFloor)
    }
    // console.log('TRADE FLOOR', binToHex(tradeFloor))

    /* Build script public key. */
    scriptPubKey = new Uint8Array([
        OP.ZERO, // groupid or empty stack item
        ...encodeDataPush(scriptHash), // script hash
        OP.ZERO, // arguments hash or empty stack item
        ...encodeDataPush(payout), // Payout public key (designated by Provider).
        ...providerFee, // The rate of exchange, charged by the Provider. (measured in <satoshis> per asset)
        ...encodeDataPush(admin), // An optional 3rd-party (specified by the Provider) used to facilitate the tranaction.
        // ...adminFee, // The platform fee charged by the Administration. (measured in <satoshis> per asset)
        // ...baseServiceFee, // The base service fee. (specified in satoshis)
        ...tradeCeiling, // An optional base (floor) rate, set by the Provider.
        ...tradeFloor, // An optional base (floor) rate, set by the Provider.
    ])
    console.info('TX SCRIPT PUBLIC KEY', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    contractAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )
    console.info('CONTRACT ADDRESS', contractAddress)

    /* Set unlocking script. */
    // NOTE: Index of (executed) contract method.
    unlockingScript = new Uint8Array([ OP.ZERO ])

    /* Request contract (coins and) tokens. */
    contractTokens = await getTokens(Wallet.wallet.wif, scriptPubKey)
        .catch(err => console.error(err))
    console.log('CONTRACT ASSETS (all):', contractTokens)

    console.log('TOKEN ID', tokenidHex)

    /* Filter by "active" token. */
    contractTokens = contractTokens.filter(_unspent => {
        return _unspent.tokenidHex === tokenidHex
    })

    // FOR DEV PURPOSES ONLY -- take the LARGEST UTXO
    contractTokens = [contractTokens.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]

    // FOR DEV PURPOSES ONLY -- add scripts
    contractTokens[0].locking = lockingScript
    contractTokens[0].unlocking = unlockingScript
    console.log('CONTRACT ASSETS (final):', contractTokens)

    /* Request wallet coins. */
    walletCoins = await getCoins(Wallet.wallet.wif)
        .catch(err => console.error(err))
    console.log('WALLET COINS', walletCoins)

    /* Request wallet tokens. */
    walletTokens = await getTokens(Wallet.wallet.wif)
        .catch(err => console.error(err))
    // console.log('WALLET TOKENS', walletTokens)

    /* Filter ONLY swappable tokens. */
    walletTokens = walletTokens.filter(_token => {
        return _token.tokenidHex === tokenidHex
    })
    // console.log('WALLET (FILTERED) TOKENS', walletTokens)

    /* Aggregate ALL tokens. */
    allTokens = [
        ...contractTokens,
        ...walletTokens,
    ]
    console.log('ALL TOKENS', allTokens)

    /* Calculate the total balance of the unspent outputs. */
    // FIXME: Add support for BigInt.
    unspentTokens = allTokens
        .reduce(
            (totalValue, unspentOutput) => (totalValue + unspentOutput.tokens), BigInt(0)
        )
    console.log('UNSPENT TOKENS', unspentTokens)

    userData = [
        // 'WiserSwap v1',
        // 'I/O Pairing',
        'SWAP',
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)
    // console.log('HEX DATA', nullData)

    /* Initialize receivers. */
    receivers = []

    /* Calculate base quantity. */
    // NOTE: Measured in satoshis.
    // baseQuantity = BigInt(_newQuote * 100)
    // console.log('BASE QUANTITY', baseQuantity)

    /* Calculate constant product. */
    cProduct = contractTokens[0].satoshis * contractTokens[0].tokens
    // console.log('CONSTANT PRODUCT', cProduct)

    if (_baseAsset === '0') {
        /* Calculate remaining (tokens) balance requirement. */
        outputTokens = (contractTokens[0].tokens - amount)
        console.log('CONTRACT BALANCE (tokens):', outputTokens)

        /* Calculate remaining (satoshis) balance requirement. */
        // FIXME Adjust precision to account for BigInt truncation.
        outputSatoshis = (cProduct / outputTokens) + BigInt(1)
        console.log('CONTRACT BALANCE (satoshis):', outputSatoshis)
    } else {
        /* Calculate remaining (satoshis) balance requirement. */
        outputSatoshis = (contractTokens[0].satoshis - amount)
        console.log('CONTRACT BALANCE (satoshis):', outputSatoshis)

        /* Calculate remaining (tokens) balance requirement. */
        // FIXME Adjust precision to account for BigInt truncation.
        outputTokens = (cProduct / outputSatoshis) + BigInt(1)
        console.log('CONTRACT BALANCE (tokens):', outputTokens)
    }

    /* Add contract. */
    receivers.push({
        address: contractAddress,
        satoshis: outputSatoshis,
        tokenid: tokenidHex,
        tokens: outputTokens,
    })

    /* Validate user is receiving tokens. */
    // NOTE: We MUST manually handle ALL (token) output + change
    //       in a single output, as per contract specs.
    if (unspentTokens > receivers[0].tokens) {
        /* Add token request output. */
        receivers.push({
            address: Wallet.address,
            tokenid: tokenidHex,
            tokens: (unspentTokens - receivers[0].tokens),
        })
    }

    /* Handle (token) output (input/output) pairing. */
// FIXME: Handle `oversize-op-return` error.
    if (allTokens.length > 1) {
        // NOTE: Add output pairs for ALL "additional" token inputs.
        for (let i = 1; i < allTokens.length; i++) {
            receivers.push({
                data: nullData
            })
        }
    }

    /* Handle (coin) output (input/output) pairing. */
// FIXME: Handle `oversize-op-return` error.
    if (walletCoins.length > 1) {
        // NOTE: Add output pairs for ALL "additional" coin inputs.
        for (let i = 1; i < walletCoins.length; i++) {
            receivers.push({
                data: nullData
            })
        }
    }

    /* Calculate transaction value. */
    if (receivers[0].satoshis > contractTokens[0].satoshis) {
        txValue = (receivers[0].satoshis - contractTokens[0].satoshis)
    } else {
        txValue = (contractTokens[0].satoshis - receivers[0].satoshis)
    }
    console.log('TX VALUE', txValue)

    /* Calculate admin satoshis. */
    adminSatoshis = (txValue * BigInt(100)) / BigInt(10000)

    /* Validate admin satoshis. */
    if (adminSatoshis < DUST_VALUE) {
        adminSatoshis = DUST_VALUE
    }
    console.log('ADMIN SATOSHIS', adminSatoshis)

    // NOTE: Administrative fee MUST be 3rd from last output.
    receivers.push({
        address: adminAddress,
        satoshis: adminSatoshis,
    })

    /* Calculate payout satoshis. */
    payoutSatoshis = (txValue * BigInt(300)) / BigInt(10000)

    /* Validate admin satoshis. */
    if (payoutSatoshis < DUST_VALUE) {
        payoutSatoshis = DUST_VALUE
    }
    console.log('PAYOUT SATOSHIS', payoutSatoshis)

    // NOTE: Provider commission MUST be 2nd from last output.
    receivers.push({
        address: payoutAddress,
        satoshis: payoutSatoshis,
    })

    // FIXME: FOR DEV PURPOSES ONLY
    receivers.push({
        address: Wallet.address,
    })
    console.log('RECEIVERS', receivers)

    /* Send UTXO request. */
    response = await buildTokens({
        coins: walletCoins,
        tokens: allTokens,
        receivers,
    })
    console.log('Build UTXO (response)', response.raw)

    /* Validate transaction bytecode. */
    if (response.raw) {
        response = await broadcast(response.raw)
        console.log('BROADCAST (response)', response)
    } else {
        response = 'Transaction build ERROR!'
    }

    /* Return transaction result. */
    return response
}
