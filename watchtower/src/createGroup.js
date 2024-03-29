/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

import { encodeAddress } from '@nexajs/address'

import {
    ripemd160,
    sha256,
} from '@nexajs/crypto'

import {
    encodePrivateKeyWif,
    parseWif,
} from '@nexajs/hdnode'

import { broadcast } from '@nexajs/provider'

import { getCoins } from '@nexajs/purse'

import {
    encodeDataPush,
    encodeNullData,
    OP,
} from '@nexajs/script'

import {
    binToHex,
    hexToBin,
    reverseHex,
} from '@nexajs/utils'

/* Libauth helpers. */
import {
    // encodeDataPush,
    // instantiateRipemd160,
    instantiateSecp256k1,
    // instantiateSha256,
} from '@bitauth/libauth'

import { Wallet } from '@nexajs/wallet'

/* Import class. */
import { Token } from '@nexajs/token'

/* Import library modules. */
import {
    getGroupDataScript,
    getGroupId,
    getTokens,
    getTopTokens,
    sendToken,
} from '@nexajs/token'

const TOKEN_ID = 'nexa:tzs4e8n7dqtsyk0axx7zvcgt2snzt3t7z07ued0nu89hlvp6ggqqqdrypc4ea' // NXL
const TOKEN_ID_HEX = 'a15c9e7e68170259fd31bc26610b542625c57e13fdccb5f3e1cb7fb03a420000' // NXL

export default async (isLive = false) => {
    let coins
    let groupData
    let groupid
    let nexaAddress
    let nullData
    let outpoint
    let params
    let publicKey
    let publicKeyHash
    let receivers
    let response
    let reversed
    let scriptData
    let scriptPubKey
    let tokens
    let txResult
    let userData
    let wif

    /* Instantiate Libauth crypto interfaces. */
    // const ripemd160 = await instantiateRipemd160()
    const secp256k1 = await instantiateSecp256k1()
    // const sha256 = await instantiateSha256()

    let wallet = await Wallet.init(process.env.MNEMONIC)

    /* Encode Private Key WIF. */
    wif = encodePrivateKeyWif({ hash: sha256 }, wallet.privateKey, 'mainnet')
    console.log('WIF', wif)

    /* Derive the corresponding public key. */
    publicKey = secp256k1.derivePublicKeyCompressed(wallet.privateKey)

    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    scriptData = encodeDataPush(publicKey)

    publicKeyHash = ripemd160(sha256(scriptData))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(publicKeyHash),
    ])

    /* Encode the public key hash into a P2PKH nexa address. */
    nexaAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    // console.log('ADDRESS', nexaAddress, wallet.address, nexaAddress === wallet.address)

    coins = await getCoins(wif)
        .catch(err => console.error(err))
    console.log('COINS', coins)

    outpoint = (coins.find(_coin => {
        return typeof _coin.outpoint !== 'undefined' && _coin.outpoint.length === 64
    })).outpoint
    console.log('OUTPOINT', outpoint)

    params = {
        ticker: 'NXL',
        name: `Nexa Exchange Loyalty`,
        uri: 'https://nexa.exchange/nxl.json',
        hash: reverseHex('6402194bb4706dad5902cc4a6dc22e621712743e1f98ba40634f268c7405c691'),
        decimals: 4,
    }

    groupData = await getGroupDataScript(params)
    console.log('GROUP DATA SCRIPT', binToHex(groupData))

    let { groupidBin, nonceBin } = await getGroupId(outpoint, groupData)
    console.log('GROUP ID (hex):', binToHex(groupidBin))
    console.log('NONCE', binToHex(nonceBin))

    reversed = '0x' + reverseHex(binToHex(nonceBin))
    console.log('REVERSED', reversed)

    console.log('NONCE (BI):', BigInt(reversed))
    // console.log('NONCE (BI):', BigInt(nonceDec))

    /* Encode the public key hash into a P2PKH nexa address. */
    groupid = encodeAddress(
        'nexa',
        'GROUP',
        groupidBin,
    )
    console.log('GROUP ID', groupid)

    tokens = await getTokens(wif)
        .catch(err => console.error(err))
    console.log('TOKENS', tokens)

    /* Filter tokens. */
    // NOTE: Currently limited to a "single" Id.
    tokens = tokens.filter(_token => {
        // return _token.tokenidHex === TOKEN_ID_HEX
        return _token.tokenidHex === groupid
    })
    console.log('TOKENS (filtered):', tokens)

    userData = [
        'NexaJS\tUnitTest',
        uuidv4(),
    ]

    receivers = [
        {
            data: groupData,
        },
        {
            address: wallet.address,
            tokenid: binToHex(groupidBin), // TODO Allow auto-format conversion.
            tokens: BigInt(reversed),
        },
    ]

    // FIXME: FOR DEV PURPOSES ONLY
    receivers.push({
        address: wallet.address,
    })
    console.log('\n  Receivers:', receivers)

    if (isLive) {
        /* Send UTXO request. */
        response = await sendToken(coins, tokens, receivers)
        console.log('Send UTXO (response):', response)

        try {
            txResult = JSON.parse(response)
            console.log('TX RESULT', txResult)
        } catch (err) {
            console.error(err)
        }
    }
}
