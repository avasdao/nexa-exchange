import Vue from 'vue'
import Vuex from 'vuex'

/* Import persisted state (for vuex). */
import createPersistedState from 'vuex-persistedstate'

/* Import (local) modules. */
import system from './modules/system'
import tokens from './modules/tokens'
import utils from './modules/utils'

Vue.use(Vuex)

/* Set modules. */
const modules = {
    // profile,
    // storage,
    system,
    tokens,
    utils,
    // wallet,
}

/* Set plugins. */
const plugins = [
    createPersistedState()
    // createPersistedState({
    //     paths: [
    //         'profile',
    //         'system.appStarts',
    //         'system.authHashes',
    //         'system.flags',
    //         'system.locale',
    //         'system.notices',
    //         'wallet',
    //     ]
    // })
]

/* Set strict. */
const strict = process.env.NODE_ENV !== 'production'

/* Export store. */
export default new Vuex.Store({
    modules,
    plugins,
    strict,
})
