/* Import (test) modules. */
import { v4 as uuidv4 } from 'uuid'

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
const WISERSWAP_HEX = '6c6c6c6c6c6c6c5779009c63c076cd01217f517f7c817f775279c701217f517f7c817f77537a7b888876c678c7517f7c76010087636d00677f77517f7c76010087636d00677f758168689578cc7bcd517f7c76010087636d00677f77517f7c76010087636d00677f758168686e95537aa269c4c353939d02220202102752535a79547aa403005114597a7e56795a7a95557996765379a4c4557a9476cd547a88cca16903005114577a7e5679587a95557a9676547aa4c4557a9476cd547a88cca16972965479009e63765579a169685579009e63765679a269686d6d6d7567577a519d5779827758797ea988577a577aad6d6d6d68'
const ADMIN = hexToBin('45f5b9d41dd723141f721c727715c690fedbbbd6')
const ADMIN_FEE = '0100' // 256 or 2.56% (FIXME: This is bug limit.)
const DUST_VALUE = BigInt(546)

let secp256k1

;(async () => {
    /* Instantiate Libauth crypto interfaces. */
    secp256k1 = await instantiateSecp256k1()
})()

export default async (
    _scriptArgs,
    _baseAsset,
    _quoteAsset,
    _action,
    _amount,
) => {
    console.log('WISERSWAP (script args):', _scriptArgs)
    console.log('WISERSWAP (base asset):', _baseAsset)
    console.log('WISERSWAP (quote asset):', _quoteAsset)
    console.log('WISERSWAP (action):', _action)
    console.log('WISERSWAP (amount):', _amount)

    /* Initialize locals.*/
    let adminAddress
    let adminFee
    let allTokens
    let amountBuyer
    let amountProvider
    let amountSeller
    let balanceSatoshis
    let balanceTokens
    let baseServiceFee
    let contractAddress
    let contractChange
    let contractCoins
    let contractTokens
    let lockingScript
    let nullData
    let payoutAddress
    let payout
    let providerFee
    let provider
    let providerPubKey
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
    let walletChange
    let walletCoins
    let walletTokens

    console.info('\n  Nexa address:', Wallet.address)
    console.info('\n  WIF', Wallet.wallet.wif)

//----------------------------------

    /* Set locking script. */
    lockingScript = hexToBin(WISERSWAP_HEX)
    console.info('\nCONTRACT TEMPLATE', binToHex(lockingScript))

    scriptHash = ripemd160(sha256(lockingScript))
    console.log('\nTEMPLATE HASH', binToHex(scriptHash))

    /* Set Provider public key (hash). */
    provider = hexToBin(_scriptArgs?.provider)
    console.log('PROVIDER HASH', binToHex(provider))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(ADMIN),
    ])
    console.log('ADMIN HASH', binToHex(ADMIN))
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
    console.log('ADMIN FEE', binToHex(adminFee))

    /* Set Provider public key hash. */
    payout = hexToBin(_scriptArgs?.payout)
    console.info('\nPAYOUT HASH', binToHex(payout))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(payout),
    ])
    // console.info('\nPAYOUT SCRIPT PUBKEY', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    payoutAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set provider fee. */
    providerFee = _scriptArgs?.fee.toString(16)
    if (providerFee.length % 2 === 1) {
        providerFee = '0' + providerFee
    }
    providerFee = hexToBin(providerFee)
    providerFee.reverse()
    providerFee = encodeDataPush(providerFee)
    console.log('PROVIDER FEE', binToHex(providerFee))

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
    if (_scriptArgs?.ceiling === 0) {
        tradeCeiling = new Uint8Array([ OP.ZERO ])
    } else {
        tradeCeiling = _scriptArgs?.ceiling.toString(16)

        if (tradeCeiling.length % 2 === 1) {
            tradeCeiling = '0' + tradeCeiling
        }

        tradeCeiling = hexToBin(tradeCeiling)
        tradeCeiling.reverse()
        tradeCeiling = encodeDataPush(tradeCeiling)
    }
    console.log('TRADE CEILING', binToHex(tradeCeiling))

    /* Set trade floor. */
    if (_scriptArgs?.floor === 0) {
        tradeFloor = new Uint8Array([ OP.ZERO ])
    } else {
        tradeFloor = _scriptArgs?.floor.toString(16)

        if (tradeFloor.length % 2 === 1) {
            tradeFloor = '0' + tradeFloor
        }

        tradeFloor = hexToBin(tradeFloor)
        tradeFloor.reverse()
        tradeFloor = encodeDataPush(tradeFloor)
    }
    console.log('TRADE FLOOR', binToHex(tradeFloor))

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
    console.info('\nTX SCRIPT PUBLIC KEY', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    contractAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )
    console.info('\nCONTRACT ADDRESS', contractAddress)

    /* Set unlocking script. */
    // NOTE: Index of (executed) contract method.
    unlockingScript = new Uint8Array([ OP.ZERO ])

    walletCoins = await getCoins(Wallet.wallet.wif)
        .catch(err => console.error(err))
    console.log('\nWALLET COINS', walletCoins)

    contractCoins = await getCoins(Wallet.wallet.wif, scriptPubKey)
        .catch(err => console.error(err))
    console.log('\nCONTRACT COINS', contractCoins)

    contractTokens = await getTokens(Wallet.wallet.wif, scriptPubKey)
        .catch(err => console.error(err))
    // FOR DEV PURPOSES ONLY -- take the LARGEST input
    contractTokens = [contractTokens.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]
    // FOR DEV PURPOSES ONLY -- add scripts
    contractTokens[0].locking = lockingScript
    contractTokens[0].unlocking = unlockingScript
    console.log('\nCONTRACT TOKENS', contractTokens)

    walletTokens = await getTokens(Wallet.wallet.wif)
        .catch(err => console.error(err))
    console.log('\nWALLET TOKENS', walletTokens)

    /* Filter ONLY swappable tokens. */
    walletTokens = walletTokens.filter(_token => {
        return _token.tokenidHex === contractTokens[0].tokenidHex
    })
    console.log('FILTERED (WALLET) TOKENS', walletTokens)

    /* Aggregate ALL tokens. */
    allTokens = [
        ...contractTokens,
        ...walletTokens,
    ]
    console.log('\nALL TOKENS', allTokens)

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

    let cProduct

    cProduct = contractTokens[0].satoshis * contractTokens[0].tokens

    balanceTokens = (contractTokens[0].tokens - _amount)
    console.log('BALANCE (tokens):', balanceTokens)

    /* Calculate remaining (satoshis) balance requirement. */
    // FIXME Adjust precision to account for BigInt truncation.
    balanceSatoshis = (cProduct / balanceTokens) + BigInt(1)
    console.log('BALANCE (satoshis):', balanceSatoshis)

    /* Add contract. */
    receivers.push({
        address: contractAddress,
        satoshis: balanceSatoshis,
        tokenid: tokenidHex,
        tokens: balanceTokens,
    })

    /* Add token request output. */
    receivers.push({
        address: Wallet.address,
        tokenid: tokenidHex,
        tokens: BigInt(_amount),
    })

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

    // NOTE: Administrative fee MUST be 3rd from last output.
    receivers.push({
        address: adminAddress,
        // satoshis: (receivers[0].satoshis * 300n) / 10000n,
        satoshis: DUST_VALUE,
    })

    // NOTE: Provider commission MUST be 2nd from last output.
    receivers.push({
        address: payoutAddress,
        // satoshis: (receivers[0].satoshis * 1000n) / 10000n,
        satoshis: DUST_VALUE,
    })

    // FIXME: FOR DEV PURPOSES ONLY
    receivers.push({
        address: Wallet.address,
    })
    console.log('\n  Receivers:', receivers)

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
