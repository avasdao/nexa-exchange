/* Import modules. */
import { Wallet } from '@nexajs/wallet'

import {
    encodePrivateKeyWif,
    parseWif,
} from '@nexajs/hdnode'

import {
    ripemd160,
    sha256,
} from '@nexajs/crypto'

import authGroup from './src/authGroup.js'
import createGroup from './src/createGroup.js'
import meltGroup from './src/meltGroup.js'
import mintGroup from './src/mintGroup.js'
import mintSubgroup from './src/mintSubgroup.js'
import signMessage from './src/signMessage.js'

const sleep = ms => new Promise(r => setTimeout(r, ms))

console.log('Starting Exchange Manager...')

const IS_LIVE_BROADCAST = false
const ACTIVE_ACCOUNT_IDX = 4
// 0 - nexa:nqtsq5g54ckrh9kdwq66ulfnm44mk9h838y9lc0j9pfu3lj0 (master)
// 1 - nexa:nqtsq5g5ku8at5c7uv8e56jahwf20vkn3t4zvp3yv667qs37 (minting)
// 2 - nexa:nqtsq5g5p52r529qhawqut0zua5t227kk5c07nay74fs2wux (melting)
// 3 - nexa:nqtsq5g5shvtv8820c2hrnadgjldjcldljrwethcl85scpxk (persona)
// 4 - nexa:nqtsq5g5gh6mn4qa6u33g8mjr3e8w9wxjrldhw7kvymc38lp (WiserSwap)

;(async () => {
    /* Initialize locals. */
    let wallet
    let wif

    /* Initialize wallet. */
    wallet = await Wallet.init({
        path: `m/44'/29223'/${ACTIVE_ACCOUNT_IDX}'/0/0`,
        mnemonic: process.env.MNEMONIC,
    }, false)

    console.log('\nWALLET ADDRESS', wallet.address, '\n')

    /* Wait for race condition. */
    await sleep(1000)

    if (ACTIVE_ACCOUNT_IDX === 0) {
        // createGroup(IS_LIVE_BROADCAST)
        // authGroup(
        //     wallet,
        //     'nexa:nqtsq5g5shvtv8820c2hrnadgjldjcldljrwethcl85scpxk',
        //     IS_LIVE_BROADCAST,
        // )
    }

    if (ACTIVE_ACCOUNT_IDX === 1) {
        mintGroup(
            wallet,
            'nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug', // Shomari (Robin Hood)
            10_000 * 1e4, // 4 decimals
            IS_LIVE_BROADCAST,
        )

        // mintSubgroup(
        //     wallet,
        //     'nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug', // Shomari (Robin Hood)
        //     100_000_000,
        //     IS_LIVE_BROADCAST,
        // )
    }

    if (ACTIVE_ACCOUNT_IDX === 2) {
        setTimeout(() => {
            meltGroup(wallet, IS_LIVE_BROADCAST)
        }, 3000)
    }

    if (ACTIVE_ACCOUNT_IDX === 3) {
        // signMessage()
    }
})()
