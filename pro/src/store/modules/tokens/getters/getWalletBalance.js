/* Import modules. */
import { ethers } from 'ethers'

/**
* Get Campaign
*/
const getBalance = (state, getters, rootState, rootGetters) => async (_tokenid, _account) => {
    // console.log('Retrieving balance...', _tokenid, _account)

    /* Connect to MetaMask. */
    await window.ethereum.enable()

    /* Set Ethereum provider. */
    // const provider = new ethers.providers.EtherscanProvider('homestead', '')
    // const provider = new ethers.providers.InfuraProvider('kovan', 'f43ab3538291466b87cc8cab45bc3c61')
    // const provider = new ethers.providers.InfuraProvider('ropsten', 'f43ab3538291466b87cc8cab45bc3c61')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log('PROVIDER', provider)

    const signer = provider.getSigner()

    /* Set contract ABI (ERC-20) Token. */
    const abi = rootGetters.getAbiToken

    /* Initialize contract connection via Web3 Provider. */
    // const contract = new ethers.Contract(tokenAddress, abi, provider)
    const contract = new ethers.Contract(_tokenid, abi, signer)

    /* Retrieve decimals. */
    const decimals = await contract.decimals()
    // console.log('TOKEN DECIMALS', decimals)

    /* Retrieve name. */
    const balance = await contract.balanceOf(_account)
    // console.log('ACCOUNT BALANCE', balance)

    /* Return campaign. */
    return {
        decimals,
        units: balance,
    }
}

/* Export module. */
export default getBalance
