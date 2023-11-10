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

/* Set contants. */
const STUDIO_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'
const WISERSWAP_HEX = '6c6c6c6c6c6c5679009c63c076cd01217f517f7c817f775279c701217f517f7c817f77537a7b888876c678c7517f7c76010087636d00677f77517f7c76010087636d00677f758168689578cc7bcd517f7c76010087636d00677f77517f7c76010087636d00677f758168686e95537aa269c4c353939d02220203005114577a7e5379587a9502102796765379a4c4539476cd547a88cca16903005114577a7e5479577a950210279676547aa4c4529476cd547a88cca1695579009e637096765779a26975686d6d6d7567567a519d567a7cad6d6d7568'

let ripemd160
let secp256k1

;(async () => {
    /* Instantiate Libauth crypto interfaces. */
    ripemd160 = await instantiateRipemd160()
    secp256k1 = await instantiateSecp256k1()
})()

export default async (_tradeArgs, _amount) => {
    console.log('WISERSWAP (trade args):', _tradeArgs)
    console.log('WISERSWAP (amount):', _amount)

    /* Initialize locals.*/
    let amountBuyer
    let amountProvider
    let amountSeller
    let coins
    let contractAddress
    let contractChange
    let fee
    let lockingScript
    let nullData
    let providerAddress
    let providerPkh
    let rate
    let receivers
    let response
    let scriptHash
    let scriptPubKey
    let sellerAddress
    let sellerPkh
    let tokens
    let unspentTokens
    let userData

    console.info('\n  Nexa address:', Wallet.address)
    console.info('\n  WIF', Wallet.wallet.wif)

//----------------------------------

    // NOTE: NexScript v0.1.0 offers a less-than optimized version
    //       of this (script) contract (w/ the addition of `OP_SWAP`).
    lockingScript = hexToBin(WISERSWAP_HEX)
    // console.info('\n  Script / Contract:', binToHex(lockingScript))

    scriptHash = ripemd160.hash(sha256(lockingScript))
    // console.log('SCRIPT HASH:', scriptHash)
    return console.log('SCRIPT HASH (hex):', binToHex(scriptHash))

    /* Set Seller public key hash. */
    // nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug (Robin Hood Acct)
    // sellerPkh = hexToBin('b2912c4cc61f1b8cbe5c77ebd5eeea2641645f10')
    sellerPkh = hexToBin(_tradeArgs?.sellerHash)

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(sellerPkh),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    sellerAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set exchange rate. */
    rate = _tradeArgs?.rate.toString(16)
    if (rate.length % 2 === 1) {
        rate = '0' + rate
    }
    rate = hexToBin(rate).reverse()
    rate = encodeDataPush(rate) // FIXME Add support for OP.ZERO
    console.log('RATE', binToHex(rate))

    /* Set provider public key hash. */
    // nexa:nqtsq5g5x7evefxhusyp08wmk6xtu9rqee64uk0uaq28jnlk
    providerPkh = hexToBin(_tradeArgs?.providerHash)

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(providerPkh),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    providerAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set provider fee. */
    fee = _tradeArgs?.fee.toString(16)
    if (fee.length % 2 === 1) {
        fee = '0' + fee
    }
    fee = hexToBin(fee).reverse()
    fee = encodeDataPush(fee) // FIXME Add support for OP.ZERO
    console.log('FEE', binToHex(fee))

    /* Build script public key. */
    scriptPubKey = new Uint8Array([
        OP.ZERO, // groupid or empty stack item
        ...encodeDataPush(scriptHash), // script hash
        OP.ZERO, // arguments hash or empty stack item
        ...encodeDataPush(sellerPkh), // The Sellers' public key hash.
        ...rate, // The rate of exchange, charged by the Seller. (measured in <satoshis> per asset)
        ...encodeDataPush(providerPkh), // An optional 3rd-party (specified by the Seller) used to facilitate the tranaction.
        ...fee, // An optional amount charged by the Provider. (measured in <basis points> (bp), eg. 5.25% = 525bp)
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

    amountSeller = BigInt(_amount) * BigInt(_tradeArgs?.rate)
    console.log('AMOUNT SELLER', amountSeller)

    amountProvider = (amountSeller * BigInt(_tradeArgs?.fee)) / BigInt(10000)
    console.log('AMOUNT PROVIDER', amountProvider)

    receivers = []

    /* Validate (contract) change. */
    if (contractChange === BigInt(0)) {
        /* Add (Buyout) null data. */
        receivers.push({
            data: nullData
        })
    } else {
        /* Add contract change. */
        receivers.push({
            address: contractAddress,
            tokenid: STUDIO_ID_HEX,
            tokens: BigInt(contractChange),
        })
    }

    receivers.push({
        address: sellerAddress,
        satoshis: BigInt(amountSeller),
    })

    receivers.push({
        address: Wallet.address,
        tokenid: STUDIO_ID_HEX,
        tokens: BigInt(amountBuyer),
    })

    if (amountProvider > BigInt(546)) {
        receivers.push({
            address: providerAddress,
            satoshis: BigInt(amountProvider),
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
