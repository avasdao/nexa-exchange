const initnexa = async () => {
    console.info('Starting nexa initialization..') // eslint-disable-line no-console

    /* Set data id. */
    // NOTE: keccak256(`aname.zerocache`)
    const dataId = '0x75341c765d2ccac618fa566b11618076575bdb7620692a552e9ac9ff23a5540c'

    /* Initialize endpoint. */
    let endpoint = null

    endpoint = `https://db-ropsten.nexa.exchange/v1/getAddress/${dataId}`

    /* Make API request. */
    const response = await fetch(endpoint)
        .catch(_error => {
            console.error('REQUEST ERROR:', _error)
        })

    /* Request aname. */
    const aname = await response.json()

    // console.log('nexa ANAME RESPONSE:', aname)

    /* Validate aname. */
    if (typeof aname !== 'undefined') {
        this.anamenexa = aname
    }
}

export default initnexa
