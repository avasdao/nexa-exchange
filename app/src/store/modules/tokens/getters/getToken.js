/* Import modules. */
// import superagent from 'superagent'

/**
* Get Campaign
*/
// const getToken = (state, getters, rootState, rootGetters) => async (_tokenid) => {
const getToken = () => async (_tokenid) => {
    // console.log('Retrieving token...', _tokenid)

    /* Initialize campaign. */
    // let campaign = null

    /* Retrieve API provider. */
    // const API_PROVIDER = rootGetters.getApiProvider

    /* Set target. */
    // const target = `${API_PROVIDER}/campaigns/${_ownerSlug}/${_campaignSlug}`
    // console.log('TARGET', target)

    /* Request campaign. */
    // const result = await superagent.get(target)
    // console.log('RESULT', result)

    /* Validate result. */
    // if (!result || !result.body) {
    //     return null
    // }

    /* Return campaign. */
    return {
        tokenid: _tokenid,
        title: 'Nexa',
        symbol: 'NEX',
    }
}

/* Export module. */
export default getToken
