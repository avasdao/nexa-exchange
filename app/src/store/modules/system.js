/* Import modules (getters). */
import getAbiExchange from './system/getters/getAbiExchange'
import getAbiToken from './system/getters/getAbiToken'
import getProfileAddress from './system/getters/getProfileAddress'

/* Import modules (actions). */
import createEthOrder from './system/actions/createEthOrder'

/* Import modules (mutations). */
// import setOutbox from './system/mutations/setOutbox'

/* Initialize state. */
const state = {
    /**
     * Application Starts
     */
    appStarts: 0,

    /**
     * Application Version
     */
    appVersion: null,

    /**
     * Assets (Sources)
     *
     * An object, used to retrieve the address / location of
     * our latest assets from our IPFS storage.
     */
    assets: null,

    /**
     * Authorization Hashes
     *
     * During sign in, we compute a SHA1 hash from the provided credentials.
     * In the case of a first-time use of supplied credentials, we will notify
     * the user and request confirmation.
     */
    authHashes: null,

    /**
     * Flags
     *
     * 1. Dark mode
     * 2. Unconfirmed transactions
     */
    flags: null,

    /**
     * Locale
     *
     * Controls the localization language.
     * (default is english)
     */
    locale: null,

    /**
     * Notices
     *
     * System notices that nag/remind the user of some important action or
     * information; which can be permanently disabled ("Do Not Show Again")
     * via checkbox and confirmation.
     *
     * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
     *       of this storage field.
     */
    notices: null,

    /**
     * Schema Version
     *
     * v1: Alpha (Preview) Edition
     */
    schemaVersion: 1,
}

/* Getters. */
const getters = {
    getAbiExchange,
    getAbiToken,
    getProfileAddress,
}

/* Actions. */
const actions = {
    createEthOrder,
}

/* Mutations. */
const mutations = {
    // setOutbox,
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
