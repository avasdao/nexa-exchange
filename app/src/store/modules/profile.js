/* Import modules (getters). */
// import getShuffledArray from './utils/getters/getShuffledArray'

/* Import modules (actions). */
// import toast from './utils/actions/toast'

import { Magic} from 'magic-sdk'

const magic = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

/* Import modules (mutations). */
// ...

/* Initialize state. */
const state = {
    // Identification
    id: null,
    parentid: null,
    address: null,
    email: null,

    // Magic
    user: null,
    authenticated: false, // FIXME: Should this be persisted??
    // NOTE: We should consider "when" to check this in "real-time" using:
    //       `this.magic.user.isLoggedIn()`

    // Messaging
    notifs: null,

    // Security
    didToken: null,
    privateKey: null,
    seedPhrase: null,

    // Time
    createdAt: null
}

/* Getters. */
const getters = {
    // getShuffledArray,
}

/* Actions. */
const actions = {
    async signin ({ commit }, _auth) {
        await magic.auth.loginWithMagicLink(_auth)

        const metadata = await magic.user.getMetadata()
        console.log('MAGIC (metadata):', metadata)
        const token = await magic.user.getIdToken()
        console.log('MAGIC (token):', token)

        commit('SET_USER_DATA', {
            metadata,
            token
        })
    },

    async signout ({ commit }) {
        await magic.user.logout()

        commit('CLEAR_USER_DATA')
    }
}

/* Mutations. */
const mutations = {
    SET_USER_DATA (state, _userData) {
        /* Set user (from metadata). */
        state.user = _userData.metadata

        /* Set DID token. */
        state.didToken = _userData.token

        /* Set authorization flag. */
        state.authenticated = true
    },

    CLEAR_USER_DATA (state) {
        state.user = null
        state.authenticated = false

        this.$router.push('/')
    }
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
