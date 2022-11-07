const initOrderBook = async  () => {
    /* Initialize window.web3 global. */
    // const HTTP_PROVIDER = 'https://mainnet.infura.io/v3/ed640de1d87b45819a7a05b80d5244c4'
    const HTTP_PROVIDER = 'https://ropsten.infura.io/v3/ed640de1d87b45819a7a05b80d5244c4'

    const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER))

    /* Set data id. */
    // NOTE: keccak256(`aname.zerodelta`)
    const dataId = '0xbd7239f4aaac15ef5b656f04994d54293ff22d4aac85bedfcb4b68e502db0497'

    /* Initialize endpoint. */
    const endpoint = `https://db-ropsten.nexa.exchange/v1/getAddress/${dataId}`

    const response = await fetch(endpoint)
        .catch(_error => {
            console.error('REQUEST ERROR:', _error)
        })

    // console.log('RESPONSE', response)

    /* Retrieve contract address. */
    const contractAddress = await response.json()

    // console.log('nexa ANAME:', contractAddress)

    /* Set from. */
    const from = this.address

    /* Initialize gas price. */
    // const gasPrice = '20000000000' // default gas price in wei, 20 gwei in this case
    const gasPrice = '5.5' * 1e9 // or get with web3.eth.gasPrice

    /* Initilize abi. */
    // const abi = require('../abi/zeroDelta')
    const abi = [{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newSuccessor","type":"address"}],"name":"setSuccessor","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRevision","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"bytes32"}],"name":"getOrder","outputs":[{"name":"maker","type":"address"},{"name":"makerSig","type":"bytes"},{"name":"tokenRequest","type":"address"},{"name":"amountRequest","type":"uint256"},{"name":"tokenOffer","type":"address"},{"name":"amountOffer","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"canPartialFill","type":"bool"},{"name":"amountFilled","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"bytes32"}],"name":"getAvailableVolume","outputs":[{"name":"availableVolume","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSuccessor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAddress","type":"address"},{"name":"_tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPredecessor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenRequest","type":"address"},{"name":"_amountRequest","type":"uint256"},{"name":"_tokenOffer","type":"address"},{"name":"_amountOffer","type":"uint256"},{"name":"_expires","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_makerSig","type":"bytes"},{"name":"_canPartialFill","type":"bool"}],"name":"createOrder","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"marketId","type":"bytes32"},{"indexed":false,"name":"orderId","type":"bytes32"}],"name":"OrderCancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"marketId","type":"bytes32"},{"indexed":false,"name":"orderId","type":"bytes32"}],"name":"OrderRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"marketId","type":"bytes32"},{"indexed":false,"name":"orderId","type":"bytes32"},{"indexed":false,"name":"taker","type":"address"},{"indexed":false,"name":"amountTaken","type":"uint256"}],"name":"TradeComplete","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}]

    /* Initialize (transaction) options. */
    const options = { from, gasPrice }

    /* Initialize contract. */
    const contract = new web3.eth.Contract(
        abi, contractAddress, options)

    /**
     * Supported Markets
     * -----------------
     *
     * 1. NEX / WETH      Wrapped Ethereum
     *                      0x00a021b22099e4cd759b5f5b73556ef143c9df7cac23530968e0f9130c47fb1f ROPSTEN
     * 2. NEX / DAI       MakerDAO DAI
     * 3. NEX / 0xBTC     0xBitcoin Token
     * 4. NEX / WBTC      Wrapped Bitcoin
     */

    contract.getPastEvents('OrderRequest', {
        fromBlock: 5138400,
        toBlock: 'latest'
    }).then(_events => {
        // console.log('EVENTS', _events)

        _events.forEach(_event => {
            /* Retrieve return values. */
            const returnValues = _event.returnValues

            // console.log('RETURN VALUES', returnValues)

            /* Retrieve market id. */
            const marketId = returnValues.marketId

            // console.log(`Market Id\n[ ${marketId} ]`)

            /* Retrieve order id. */
            const orderId = returnValues.orderId

            // console.log(`Order Id\n[ ${orderId} ]`)

            this.orders += `<br /><small>${orderId}</small>`
        })
    }).catch(_error => {
        console.error('ERROR', _error)
    })

}

export default initOrderBook
