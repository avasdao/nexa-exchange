/* Import (test) modules. */
import { encodeAddress } from '@nexajs/address'

import {
    ripemd160,
    sha256,
} from '@nexajs/crypto'

/* Import library modules. */
import { getCoins } from '@nexajs/purse'

/* Import (individual) modules. */
import {
    encodeDataPush,
    encodeNullData,
    OP,
} from '@nexajs/script'

import {
    getTokens,
    sendToken,
} from '@nexajs/token'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

/* Libauth helpers. */
import { instantiateSecp256k1 } from '@bitauth/libauth'

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
const Wallet = useWalletStore()

/* Set constants. */
const STUDIO_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'
const WISERSWAP_HEX = hexToBin('6c6c6c6c6c6c6c5779009c63c076cd01217f517f7c817f775279c701217f517f7c817f77537a7b888876c678c7517f7c76010087636d00677f77517f7c76010087636d00677f758168689578cc7bcd517f7c76010087636d00677f77517f7c76010087636d00677f758168686e95537aa269c4c353939d02220202102752535a79547aa403005114597a7e56795a7a95557996765379a4c4557a9476cd547a88cca16903005114577a7e5679587a95557a9676547aa4c4557a9476cd547a88cca16972965479009e63765579a169685579009e63765679a269686d6d6d7567577a519d5779827758797ea988577a577aad6d6d6d68')
const ADMIN = hexToBin('45f5b9d41dd723141f721c727715c690fedbbbd6')
const ADMIN_FEE = '0100' // 256 or 2.56% (FIXME: This is bug limit.)
const DUST_VALUE = BigInt(546)

let secp256k1

;(async () => {
    /* Instantiate Libauth crypto interfaces. */
    secp256k1 = await instantiateSecp256k1()
})()

export default async (
    _poolArgs,
    _baseAsset, // NEXA is the default
    _quoteAsset,
    _amount,
) => {
    console.log('WISERSWAP (script args):', _poolArgs)
    console.log('WISERSWAP (base asset):', _baseAsset)
    console.log('WISERSWAP (quote asset):', _quoteAsset)
    console.log('WISERSWAP (amount):', _amount)

    /* Initialize locals.*/
    let adminAddress
    let adminFee
    let adminSatoshis
    let allTokens
    let balanceSatoshis
    let balanceTokens
    let baseServiceFee
    let contractAddress
    let contractTokens
    let cProduct
    let lockingScript
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
    let unlockingScript
    let unspentTokens
    let userData
    let walletCoins
    let walletTokens

    console.info('NEXA ADDRESS', Wallet.address)

//----------------------------------

    /* Set locking script. */
    lockingScript = WISERSWAP_HEX // FOR DEVELOPMENT PURPOSES ONLY
    // console.info('CONTRACT TEMPLATE', binToHex(lockingScript))

    scriptHash = ripemd160(sha256(lockingScript))
    // console.log('TEMPLATE HASH', binToHex(scriptHash))

    /* Set Provider public key (hash). */
    provider = hexToBin(_poolArgs?.provider)
    console.log('PROVIDER HASH', binToHex(provider))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(ADMIN),
    ])
    // console.log('ADMIN HASH', binToHex(ADMIN))
    // console.log('ADMIN SCRIPT PUBKEY', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    adminAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set exchange admin fee. */
    adminFee = ADMIN_FEE.toString(16)
    if (adminFee.length % 2 === 1) {
        adminFee = '0' + adminFee
    }
    adminFee = hexToBin(adminFee)
    adminFee.reverse()
    adminFee = encodeDataPush(adminFee)
    // console.log('ADMIN FEE', binToHex(adminFee))

    /* Set Provider public key hash. */
    payout = hexToBin(_poolArgs?.payout)
    // console.info('PAYOUT HASH', binToHex(payout))

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
    providerFee = _poolArgs?.fee.toString(16)
    if (providerFee.length % 2 === 1) {
        providerFee = '0' + providerFee
    }
    providerFee = hexToBin(providerFee)
    providerFee.reverse()
    providerFee = encodeDataPush(providerFee)
    // console.log('PROVIDER FEE', binToHex(providerFee))

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
        ...encodeDataPush(provider), // The Providers' public key.
        ...providerFee, // The rate of exchange, charged by the Provider. (measured in <satoshis> per asset)
        ...encodeDataPush(ADMIN), // An optional 3rd-party (specified by the Provider) used to facilitate the tranaction.
        ...adminFee, // The platform fee charged by the Administration. (measured in <satoshis> per asset)
        ...baseServiceFee, // The base service fee. (specified in satoshis)
        ...tradeCeiling, // An optional base (floor) rate, set by the Provider.
        ...tradeFloor, // An optional base (floor) rate, set by the Provider.
    ])
    // console.info('TX SCRIPT PUBLIC KEY', binToHex(scriptPubKey))

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
    // FOR DEV PURPOSES ONLY -- take the LARGEST UTXO
    contractTokens = [contractTokens.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]
    // FOR DEV PURPOSES ONLY -- add scripts
    contractTokens[0].locking = lockingScript
    contractTokens[0].unlocking = unlockingScript
    console.log('CONTRACT ASSETS', contractTokens)

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
        return _token.tokenidHex === contractTokens[0].tokenidHex
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
        'WiserSwap v1',
        'I/O Pairing',
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)
    // console.log('HEX DATA', nullData)

    /* Initialize receivers. */
    receivers = []

    /* Set token id. */
    tokenidHex = STUDIO_ID_HEX

    /* Calculate base quantity. */
    // NOTE: Measured in satoshis.
    // baseQuantity = BigInt(_newQuote * 100)
    // console.log('BASE QUANTITY', baseQuantity)

    /* Calculate constant product. */
    cProduct = contractTokens[0].satoshis * contractTokens[0].tokens
console.log('_baseAsset === 0', _baseAsset === '0', typeof _baseAsset, _baseAsset)
    if (_baseAsset === '0') {
        /* Calculate remaining (tokens) balance requirement. */
        balanceTokens = (contractTokens[0].tokens - BigInt(_amount))
        console.log('CONTRACT BALANCE (tokens):', balanceTokens)

        /* Calculate remaining (satoshis) balance requirement. */
        // FIXME Adjust precision to account for BigInt truncation.
        balanceSatoshis = (cProduct / balanceTokens) + BigInt(1)
        console.log('CONTRACT BALANCE (satoshis):', balanceSatoshis)
    } else {
        /* Calculate remaining (satoshis) balance requirement. */
        balanceSatoshis = (contractTokens[0].satoshis - BigInt(parseInt(_amount * 100)))
        console.log('CONTRACT BALANCE (satoshis):', balanceSatoshis)

        /* Calculate remaining (tokens) balance requirement. */
        // FIXME Adjust precision to account for BigInt truncation.
        balanceTokens = (cProduct / balanceSatoshis) + BigInt(1)
        console.log('CONTRACT BALANCE (tokens):', balanceTokens)
    }

    /* Add contract. */
    receivers.push({
        address: contractAddress,
        satoshis: balanceSatoshis,
        tokenid: tokenidHex,
        tokens: balanceTokens,
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
    if (allTokens.length > 1) {
        // NOTE: Add output pairs for ALL "additional" token inputs.
        for (let i = 1; i < allTokens.length; i++) {
            receivers.push({
                data: nullData
            })
        }
    }

    /* Handle (coin) output (input/output) pairing. */
    if (walletCoins.length > 1) {
        // NOTE: Add output pairs for ALL "additional" coin inputs.
        for (let i = 1; i < walletCoins.length; i++) {
            receivers.push({
                data: nullData
            })
        }
    }

    /* Calculate admin satoshis. */
    adminSatoshis = (receivers[0].satoshis * BigInt(256)) / BigInt(10000)

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
    payoutSatoshis = (receivers[0].satoshis * BigInt(256)) / BigInt(10000)

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
    response = await sendToken({
        coins: walletCoins,
        tokens: allTokens,
        receivers,
    })
    // console.log('Send UTXO (response):', response)

    /* Return transaction result. */
    return response
}
