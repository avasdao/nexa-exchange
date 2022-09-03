import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import bchIcon from 'cryptocurrency-icons/svg/icon/bch.svg'
import bnbIcon from 'cryptocurrency-icons/svg/icon/bnb.svg'
import btcIcon from 'cryptocurrency-icons/svg/icon/btc.svg'
import daiIcon from 'cryptocurrency-icons/svg/icon/dai.svg'
import ethIcon from 'cryptocurrency-icons/svg/icon/eth.svg'
import usdcIcon from 'cryptocurrency-icons/svg/icon/usdc.svg'

/**
 * List Item Asset Pair
 *
 * This component displays a single list item for a pair of assets.
 */
const ListItemAssetPair = (params) => {
    console.log('PARAMS', params)

    const base = params.base
    const trade = params.trade

    let baseIcon
    let baseTitle
    let baseSymbol

    switch(base) {
    case 'SBCH':
        baseIcon = bchIcon
        baseTitle = `Smart Bitcoin`
        baseSymbol = `sBCH`
        break
    case 'BCH':
        baseIcon = bchIcon
        baseTitle = `Bitcoin Cash`
        baseSymbol = `BCH`
        break
    case 'BNB':
        baseIcon = bnbIcon
        baseTitle = `Binance Coin`
        baseSymbol = `BNB`
        break
    case 'BTC':
        baseIcon = btcIcon
        baseTitle = `Legacy Bitcoin`
        baseSymbol = `BTC.b`
        break
    case 'DAI':
        baseIcon = daiIcon
        baseTitle = `Dai`
        baseSymbol = `DAI.b`
        break
    case 'ETH':
        baseIcon = ethIcon
        baseTitle = `Ethereum`
        baseSymbol = `ETH.b`
        break
    case 'USDC':
        baseIcon = usdcIcon
        baseTitle = `USD Coin`
        baseSymbol = `USDC.b`
        break
    }

    let tradeIcon
    let tradeTitle
    let tradeSymbol

    switch(trade) {
    case 'SBCH':
        tradeIcon = bchIcon
        tradeTitle = `Smart Bitcoin`
        tradeSymbol = `sBCH`
        break
    case 'BCH':
        tradeIcon = bchIcon
        tradeTitle = `Bitcoin Cash`
        tradeSymbol = `BCH`
        break
    case 'BNB':
        tradeIcon = bnbIcon
        tradeTitle = `Binance Coin`
        tradeSymbol = `BNB`
        break
    case 'BTC':
        tradeIcon = btcIcon
        tradeTitle = `Legacy Bitcoin`
        tradeSymbol = `BTC.b`
        break
    case 'DAI':
        tradeIcon = daiIcon
        tradeTitle = `Dai`
        tradeSymbol = `DAI.b`
        break
    case 'ETH':
        tradeIcon = ethIcon
        tradeTitle = `Ethereum`
        tradeSymbol = `ETH.b`
        break
    case 'USDC':
        tradeIcon = usdcIcon
        tradeTitle = `USD Coin`
        tradeSymbol = `USDC.b`
        break
    }

    return (
        <main className="mt-3 px-3 py-2 flex items-center justify-between bg-yellow-100 border-4 border-yellow-300 rounded-xl">
            <img src={baseIcon} className="w-8" />

            <div className="flex flex-col items-center">
                <h3 className="font-bold text-gray-700">{baseTitle}</h3>
                <small className="-mt-1 text-gray-700">{baseSymbol}</small>
            </div>

            <FontAwesomeIcon className="mx-3 text-yellow-700 text-xl" icon={["fas", "right-left"]} />

            <div className="flex flex-col items-center">
                <h3 className="font-bold text-gray-700">{tradeTitle}</h3>
                <small className="-mt-1 text-gray-700">{tradeSymbol}</small>
            </div>

            <img src={tradeIcon} className="w-8" />
        </main>
    )
}

export default ListItemAssetPair
