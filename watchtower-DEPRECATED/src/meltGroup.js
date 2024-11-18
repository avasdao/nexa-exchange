/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

import { encodeAddress } from '@nexajs/address'

import { sha256 } from '@nexajs/crypto'

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

// nexa:tzs4e8n7dqtsyk0axx7zvcgt2snzt3t7z07ued0nu89hlvp6ggqqqdrypc4ea
const NXL_ID_HEX = 'a15c9e7e68170259fd31bc26610b542625c57e13fdccb5f3e1cb7fb03a420000' // NXL

export default async (_wallet, isLive = false) => {
    let coins
    let nullData
    let receivers
    let response
    let tokens
    let txResult
    let userData
    let wif

    /* Encode Private Key WIF. */
    wif = encodePrivateKeyWif({ hash: sha256 }, _wallet.privateKey, 'mainnet')
    // console.log('WIF', wif)

    coins = await getCoins(wif)
        .catch(err => console.error(err))
    // console.log('COINS', coins)

    tokens = await getTokens(wif)
        .catch(err => console.error(err))
    // console.log('TOKENS', tokens)

    /* Filter tokens. */
    // NOTE: Currently limited to a "single" Id.
    tokens = tokens.filter(_token => {
        return _token.tokenidHex === NXL_ID_HEX
    })
    // console.log('\n  Tokens (filtered):', tokens)

    if (tokens.length === 1) {
        throw new Error('Oops! There are NO $NXL tokens to melt..')
    }

    userData = [
        'MELT',
        'NXL',
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)
    // console.log('HEX DATA', nullData)

    receivers = [
        {
            data: nullData,
        },
    ]

    // NOTE: Return the authority baton.
    receivers.push({
        address: _wallet.address,
        tokenid: NXL_ID_HEX, // TODO Allow auto-format conversion.
        tokens: BigInt(0xfc00000000000000), // All permissions enabled
    })

    // FIXME: FOR DEV PURPOSES ONLY
    receivers.push({
        address: _wallet.address,
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
