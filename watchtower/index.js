/* Import modules. */
import { Wallet } from '@nexajs/wallet'

import meltGroup from './src/meltGroup.js'
import mintGroup from './src/mintGroup.js'
import signMessage from './src/signMessage.js'

console.log('Starting Watchtower Daemon...')

const IS_LIVE_BROADCAST = false
const ACTIVE_ACCOUNT_IDX = 0
// 0 - nexa:nqtsq5g5ezqpr27c78uyf08260xq4xh35faa4yk64aycgega (signing)
// 1 - nexa:nqtsq5g55ykpcwwvr0x54358lx7skesefgj9anf07drdv52v (minting)
// 2 - nexa:nqtsq5g56gvyyaf57seml8zdxu8ur7x5wsevh49mj5f7q6s0 (melting)

;(async () => {
    let wallet

    // return createGroup()
    // return signMessage()

    wallet = await Wallet.init({
        path: `m/44'/29223'/${ACTIVE_ACCOUNT_IDX}'/0/0`,
        mnemonic: process.env.MNEMONIC,
    }, false)

    return console.log('\nWALLET ADDRESS', wallet.address, '\n')

    // meltGroup(
    mintGroup(
        wallet,
        // 'nexa:nprqq9x0e0dzeshwa3mkhu62578d6k7qch0mr0qqzjefztzvcc03hr97t3m7h40wagnyzezlzqqjs9phktx2f4lypqtemkak3jlpgcxww409nlqz9sqs0xpkt57y',
        // 100000000,
        IS_LIVE_BROADCAST,
    )
})()
