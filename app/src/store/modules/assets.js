/* Import modules (getters). */
import getExchangeBalance from './assets/getters/getExchangeBalance'
import getWalletBalance from './assets/getters/getWalletBalance'
import getToken from './assets/getters/getToken'

/* Import modules (actions). */
import deposit from './assets/actions/deposit'

/* Import modules (mutations). */
// import setOutbox from './assets/mutations/setOutbox'

/* Initialize state. */
const state = {
    hotWalletAddr: 'nexa:nqtsq5g5frspydkdjykr5nn9h6gg5wh9hfvfg9cqksurjh8v',
    coldWalletAddr: 'nexa:nqtsq...',
}

/* Getters. */
const getters = {
    getExchangeBalance,
    getWalletBalance,
    getToken,
}

/* Actions. */
const actions = {
    deposit,
}

/* Mutations. */
const mutations = {
    // setOutbox,
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
