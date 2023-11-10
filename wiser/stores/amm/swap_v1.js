/* Import (test) modules. */
import { v4 as uuidv4 } from 'uuid'

import { encodeAddress } from '@nexajs/address'

import { sha256 } from '@nexajs/crypto'

import { encodePrivateKeyWif } from '@nexajs/hdnode'

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
    reverseHex,
} from '@nexajs/utils'

/* Libauth helpers. */
import {
    instantiateRipemd160,
    instantiateSecp256k1,
} from '@bitauth/libauth'

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
const Wallet = useWalletStore()

/* Set constants. */
const STUDIO_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'
const WISERSWAP_HEX = '6c6c6c6c6c6c5679009c63c076cd01217f517f7c817f775279c701217f517f7c817f77537a7b888876c678c7517f7c76010087636d00677f77517f7c76010087636d00677f758168689578cc7bcd517f7c76010087636d00677f77517f7c76010087636d00677f758168686e95537aa269c4c353939d02220203005114577a7e5379587a9502102796765379a4c4539476cd547a88cca16903005114577a7e5479577a950210279676547aa4c4529476cd547a88cca1695579009e637096765779a26975686d6d6d7567567a519d567a7cad6d6d7568'

let ripemd160
let secp256k1

;(async () => {
    /* Instantiate Libauth crypto interfaces. */
    ripemd160 = await instantiateRipemd160()
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
    let adminPkh
    let amountBuyer
    let amountProvider
    let amountSeller
    let contractAddress
    let contractChange
    let contractCoins
    let contractTokens
    let lockingScript
    let nullData
    let payoutAddress
    let payoutPkh
    let providerFee
    let providerPubKey
    let receivers
    let response
    let scriptHash
    let scriptPubKey
    let tradeFloor
    let unspentTokens
    let userData
    let walletChange
    let walletCoins
    let walletTokens

    console.info('\n  Nexa address:', Wallet.address)
    console.info('\n  WIF', Wallet.wallet.wif)

//----------------------------------

    // NOTE: NexScript v0.1.0 offers a less-than optimized version
    //       of this (script) contract (w/ the addition of `OP_SWAP`).
    lockingScript = hexToBin(WISERSWAP_HEX)
    // console.info('\n  Script / Contract:', binToHex(lockingScript))

    scriptHash = ripemd160.hash(sha256(lockingScript))
    // console.log('SCRIPT HASH:', scriptHash)
    console.log('SCRIPT HASH (hex):', binToHex(scriptHash))

    /* Set Provider public key . */
    providerPubKey = hexToBin(_scriptArgs?.providerPubKey)

    /* Set Admin public key hash. */
    adminPkh = hexToBin(_scriptArgs?.admin)

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(adminPkh),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    adminAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set exchange admin fee. */
    adminFee = _scriptArgs?.adminFee.toString(16)
    if (adminFee.length % 2 === 1) {
        adminFee = '0' + adminFee
    }
    adminFee = hexToBin(adminFee).reverse()
    adminFee = encodeDataPush(adminFee)
    console.log('ADMIN FEE', binToHex(adminFee))

    /* Set (provider) payout public key hash. */
    payoutPkh = hexToBin(_scriptArgs?.payout)

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(payoutPkh),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    payoutAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set provider fee. */
    providerFee = _scriptArgs?.providerFee.toString(16)
    if (providerFee.length % 2 === 1) {
        providerFee = '0' + providerFee
    }
    providerFee = hexToBin(providerFee).reverse()
    providerFee = encodeDataPush(providerFee)
    console.log('PROVIDER FEE', binToHex(providerFee))

    /* Set trade floor. */
    if (_scriptArgs?.tradeFloor === 0) {
        tradeFloor = new Uint8Array([ OP.ZERO ])
    } else {
        tradeFloor = _scriptArgs?.tradeFloor.toString(16)

        if (tradeFloor.length % 2 === 1) {
            tradeFloor = '0' + tradeFloor
        }

        tradeFloor = hexToBin(tradeFloor).reverse()
        tradeFloor = encodeDataPush(tradeFloor) // FIXME Add support for OP.ZERO
    }
    console.log('TRADE FLOOR', binToHex(tradeFloor))

    /* Build script public key. */
    scriptPubKey = new Uint8Array([
        OP.ZERO, // groupid or empty stack item
        ...encodeDataPush(scriptHash), // script hash
        OP.ZERO, // arguments hash or empty stack item
        ...encodeDataPush(providerPubKey), // The Providers' public key.
        ...providerFee, // The rate of exchange, charged by the Provider. (measured in <satoshis> per asset)
        ...encodeDataPush(payoutPkh), // An optional 3rd-party (specified by the Provider) used to facilitate the tranaction.
        ...encodeDataPush(adminPkh), // An optional 3rd-party (specified by the Provider) used to facilitate the tranaction.
        ...adminFee, // The platform fee charged by the Administration. (measured in <satoshis> per asset)
        ...tradeFloor, // An optional base (floor) rate, set by the Provider.
    ])
    console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    contractAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )
    console.info('\n  Contract address:', contractAddress)

    coins = await getCoins(Wallet.wallet.wif)
        .catch(err => console.error(err))
    console.log('\n  Coins:', coins)

    // coinsGuest = await getCoins(Wallet.wallet.wif, scriptPubKey)
    //     .catch(err => console.error(err))
    // console.log('\n  Coins GUEST:', coinsGuest)

    tokens = await getTokens(Wallet.wallet.wif, scriptPubKey)
        .catch(err => console.error(err))

    // FOR DEV PURPOSES ONLY -- take the LARGEST input
    tokens = [tokens.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]
    // FOR DEV PURPOSES ONLY -- add scripts
    tokens[0].locking = encodeDataPush(lockingScript)
    tokens[0].unlocking = false
    console.log('\n  Tokens GUEST:', tokens)

    /* Calculate the total balance of the unspent outputs. */
    // FIXME: Add support for BigInt.
    unspentTokens = tokens
        .reduce(
            (totalValue, unspentOutput) => (totalValue + unspentOutput.tokens), BigInt(0)
        )
    console.log('UNSPENT TOKENS', unspentTokens)

    userData = [
        'TPOST',
        'All-in Buyout!',
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)
    // console.log('HEX DATA', nullData)

    contractChange = unspentTokens - BigInt(_amount)
    console.log('CONTRACT CHANGE', contractChange)

    amountBuyer = BigInt(_amount)
    console.log('AMOUNT BUYER', amountBuyer)

    amountSeller = BigInt(_amount) * BigInt(_scriptArgs?.rate)
    console.log('AMOUNT SELLER', amountSeller)

    amountProvider = (amountSeller * BigInt(_scriptArgs?.fee)) / BigInt(10000)
    console.log('AMOUNT PROVIDER', amountProvider)

    walletChange = unspentTokens - BigInt(_amount)
    console.log('WALLET CHANGE', walletChange)

    /* Initialize receivers. */
    receivers = []

    /* Add contract Covenant. */
    receivers.push({
        address: contractAddress,
        tokenid: STUDIO_ID_HEX,
        tokens: BigInt(contractChange),
    })

    // TODO: Add support for an aggregation of contracts

    /* Add Adminstration fee. */
    // NOTE: This is the 1st (required) "non-contract" output.
    receivers.push({
        address: adminAddress,
        satoshis: BigInt(amountSeller),
    })

    /* Add Provider payout. */
    // NOTE: This is the 2nd (required) "non-contract" output.
    receivers.push({
        address: payoutAddress,
        satoshis: BigInt(amountProvider),
    })

    /* Validate (wallet) change -OR- null data output. */
    // NOTE: This is the 3rd (required) "non-contract" output.
    if (walletChange === BigInt(0)) {
        /* Add (required) null data. */
        receivers.push({
            data: nullData
        })
    } else {
        /* Add (required) wallet change. */
        receivers.push({
            address: Wallet.address,
            tokenid: STUDIO_ID_HEX,
            tokens: BigInt(amountBuyer),
        })
    }


    // FIXME: FOR DEV PURPOSES ONLY
    receivers.push({
        address: Wallet.address,
    })
    return console.log('\n  Receivers:', receivers)

    /* Send UTXO request. */
    response = await sendToken({
        coins,
        tokens,
        receivers,
    })
    // console.log('Send UTXO (response):', response)

    /* Return transaction result. */
    return response
}
