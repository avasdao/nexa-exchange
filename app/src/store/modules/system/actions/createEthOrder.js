/* Import modules. */
import { ethers } from 'ethers'

/**
 * Create Ethereum (ETH) Order
 *
 * Pulls the latest asset source from our Eternal Db.
 */
// const createEthOrder = async ({ commit, getters }) => {
const createEthOrder = async ({ getters }) => {
    // console.log('Creating new order...')

    /* Set Ethereum provider. */
    // const provider = new ethers.providers.EtherscanProvider('homestead', '')
    // const provider = new ethers.providers.InfuraProvider('kovan', 'f43ab3538291466b87cc8cab45bc3c61')
    const provider = new ethers.providers.InfuraProvider('ropsten', 'f43ab3538291466b87cc8cab45bc3c61')
    // console.log('PROVIDER', provider)

    /* Set contract address. */
    // const contractAddress = '0xda1fF69a39937bc2DcC072e4767FdB36D821e08f' // kovan
    const contractAddress = '0xeF54AE01D55ADeCac852cBe3e6F16b0D1bf38dE0' // ropsten
    // console.log('CONTRACT ADDRESS', contractAddress)

    /* Set contract ABI (nexa) Exchange. */
    const abi = getters.getAbiExchange

    /* Initialize contract connection via Web3 Provider. */
    const contract = new ethers.Contract(contractAddress, abi, provider)

    /* Set key. */
    // FIXME: Calulate this value `causes.assets.md`.
    // const key = '0xbc3ff924269ad0b21b98ec6cfb735f77b55475c8e099357a5858e1f1efc5b397'

    /* Retrieve owner. */
    // const owner = await contract.owner()
    // console.log('OWNER', owner)

    /* Generate secret hash. */
    const secretHash = await contract.generateSecretHash(Buffer.from('de5738e6eca81c4e9a0dfeb39c75a29c6751e78c3a7d49175eeef742bf7c8615', 'hex'))
    // let hash = ethers.utils.arrayify('0xde5738e6eca81c4e9a0dfeb39c75a29c6751e78c3a7d49175eeef742bf7c8615')
    // console.log('HASH', hash, Buffer.from(hash).toString('hex'));
    // const secretHash = await contract.generateSecretHash(hash)
    console.info('Secret hash', secretHash) // eslint-disable-line no-console

    let maker = '0x830ad555fCe0547782E14d67d22002082916e660'
    let token = '0xef54ae01d55adecac852cbe3e6f16b0d1bf38de0'
    let secret = Buffer.from('de5738e6eca81c4e9a0dfeb39c75a29c6751e78c3a7d49175eeef742bf7c8615', 'hex')
    const orderid = await contract.generateOrderid(maker, token, secret)
    console.info('Order id', orderid) // eslint-disable-line no-console

    /* Set asset source. */
    // const assetSource = {
    //     md: source.toHexString()
    // }

    /* Commit wallet's master seed. */
    // commit('setAssetSource', assetSource)
}

/* Export module. */
export default createEthOrder
