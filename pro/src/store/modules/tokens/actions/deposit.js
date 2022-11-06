/* Import modules. */
import { ethers } from 'ethers'

/**
 * Deposit (ERC-20) Token
 *
 * Pulls the latest asset source from our Eternal Db.
 */
const deposit = async ({ rootGetters }, _token) => {
    console.info('Depositing token...', _token) // eslint-disable-line no-console

    /* Connect to MetaMask. */
    await window.ethereum.enable()

    /* Set Ethereum provider. */
    // const provider = new ethers.providers.EtherscanProvider('homestead', '')
    // const provider = new ethers.providers.InfuraProvider('kovan', 'f43ab3538291466b87cc8cab45bc3c61')
    // const provider = new ethers.providers.InfuraProvider('ropsten', 'f43ab3538291466b87cc8cab45bc3c61')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log('PROVIDER', provider)

    const signer = provider.getSigner()

    // console.log('CHAINID', await signer.getChainId())

    // await signer.connect(window.ethereum)
    // signer.connect(window.ethereum)
    // const wallet = new ethers.Wallet(provider)
    // console.log('WALLET', wallet)

    /* Set token address. */
    const tokenAddress = _token.address
    console.info('Token address:', tokenAddress) // eslint-disable-line no-console

    /* Set contract ABI (ERC-20) Token. */
    const abi = rootGetters.getAbiToken

    /* Initialize contract connection via Web3 Provider. */
    // const contract = new ethers.Contract(tokenAddress, abi, provider)
    const contract = new ethers.Contract(tokenAddress, abi, signer)

    /* Retrieve name. */
    const name = await contract.name()

    /* Retrieve symbol. */
    const symbol = await contract.symbol()

    /* Retrieve decimals. */
    const decimals = await contract.decimals()

    /* Retrieve total supply. */
    const totalSupply = await contract.totalSupply()

    console.info('Token details:', { // eslint-disable-line no-console
        name,
        symbol,
        decimals,
        totalSupply: totalSupply.toString(),
    })

    const exchangeContract = '0xeF54AE01D55ADeCac852cBe3e6F16b0D1bf38dE0' // ropsten

    const tokenAmount = Number(_token.amount) * 10**8

    const response = await contract.approveAndCall(exchangeContract, tokenAmount, '0x00')
    console.log('DEPOSIT RESPONSE', response) // eslint-disable-line

    /* Set asset source. */
    // const assetSource = {
    //     md: source.toHexString()
    // }

    /* Commit wallet's master seed. */
    // commit('setAssetSource', assetSource)
}

/* Export module. */
export default deposit
