import Vue from 'vue'
import Vuex from 'vuex'

/* Import persisted state (for vuex). */
import createPersistedState from 'vuex-persistedstate'

/* Import (local) modules. */
import assets from './modules/assets'
import profile from './modules/profile'
import system from './modules/system'
import utils from './modules/utils'
import wallet from './modules/wallet'

Vue.use(Vuex)

/* Set modules. */
const modules = {
    assets,
    profile,
    system,
    utils,
    wallet,
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
