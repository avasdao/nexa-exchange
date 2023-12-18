/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

import { encodeAddress } from '@nexajs/address'

import {
    encodePrivateKeyWif,
    parseWif,
} from '@nexajs/hdnode'

import { broadcast } from '@nexajs/provider'

import { getCoins } from '@nexajs/purse'

import {
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
    encodeDataPush,
    instantiateRipemd160,
    instantiateSecp256k1,
    instantiateSha256,
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

export default async () => {
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
    const ripemd160 = await instantiateRipemd160()
    const secp256k1 = await instantiateSecp256k1()
    const sha256 = await instantiateSha256()

    let wallet = await Wallet.init(process.env.MNEMONIC)

    /* Encode Private Key WIF. */
    wif = encodePrivateKeyWif(sha256, wallet.privateKey, 'mainnet')
    console.log('WIF', wif)
}
