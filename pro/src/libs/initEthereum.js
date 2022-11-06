const initEthereum = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum)

        try {
            // Request account access if needed
            // console.log('window.ethereum')

            ethereum.enable()
        } catch (error) {
            // User denied account access...
        }
    } else if (window.web3) { // Legacy dapp browsers...
        window.web3 = new Web3(web3.currentProvider)

        // console.log('window.currentProvider')
        // Acccounts always exposed
    } else { // Non-dapp browsers...
        alert('Non-Ethereum browser detected.\nYou should consider trying MetaMask!')
    }

    /* Validate web3. */
    if (window.web3) {
        /* Retrieve accounts. */
        const accounts = await window.web3.eth.getAccounts()

        if (typeof accounts !== 'undefined') {
            /* Set address. */
            const defaultAddress = accounts[0]

            // console.log('Default address', defaultAddress)

            this.profileAddress = defaultAddress
        }
    }
}

export default initEthereum
