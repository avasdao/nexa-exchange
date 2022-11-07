/* Import modules (getters). */
import getExchangeBalance from './tokens/getters/getExchangeBalance'
import getWalletBalance from './tokens/getters/getWalletBalance'
import getToken from './tokens/getters/getToken'

/* Import modules (actions). */
import deposit from './tokens/actions/deposit'

/* Import modules (mutations). */
// import setOutbox from './tokens/mutations/setOutbox'

/* Initialize state. */
const state = {
    //
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
