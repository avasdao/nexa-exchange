/* Import modules. */
import { Wallet } from '@nexajs/wallet'

import meltGroup from './src/meltGroup.js'
import mintGroup from './src/mintGroup.js'
import signMessage from './src/signMessage.js'

console.log('Starting Watchtower Daemon...')

const IS_LIVE_BROADCAST = false
const ACTIVE_ACCOUNT_IDX = 2
// 0 - nexa:nqtsq5g5kgwzjnpmg9mq8vdw0trzcrn63wccem5s2axpkst2 (signing)
// 1 - nexa:nqtsq5g5jv5fgqmz62dneqkcqe2vdq27h4nemq5gz2r4cc7c (minting)
// 2 - nexa:nqtsq5g5clp5gggsy3m72gyyaslchuyucf52pmr20dwvaf9e (melting)

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
