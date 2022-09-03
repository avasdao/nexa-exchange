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

    const id = params.id

    let icon
    let title
    let symbol
    let className

    switch(id) {
    case 'SBCH':
        icon = bchIcon
        title = `Smart Bitcoin`
        symbol = `sBCH`
        className = 'cf cf-bch'
        break
    case 'BCH':
        icon = bchIcon
        title = `Bitcoin Cash`
        symbol = `BCH`
        className = 'cf cf-bch'
        break
    case 'BNB':
        icon = bnbIcon
        title = `Binance Coin`
        symbol = `BNB`
        className = 'cf cf-bnb'
        break
    case 'BTC':
        icon = btcIcon
        title = `Legacy Bitcoin`
        symbol = `BTC.b`
        className = 'cf cf-btc'
        break
    case 'DAI':
        icon = daiIcon
        title = `Dai`
        symbol = `DAI.b`
        className = 'cf cf-dai'
        break
    case 'ETH':
        icon = ethIcon
        title = `Ethereum`
        symbol = `ETH.b`
        className = 'cf cf-eth'
        break
    case 'USDC':
        icon = usdcIcon
        title = `USD Coin`
        symbol = `USDC.b`
        className = 'cf cf-usdc'
        break
    }

    return (
        <main className="mt-3 px-3 py-2 flex items-center justify-between bg-yellow-100 border-4 border-yellow-300 rounded-xl">
            <img src={icon} className="w-8" />

            <div className="flex flex-col items-center">
                <h3 className="font-bold text-gray-700">{title}</h3>
                <small className="-mt-1 text-gray-700">{symbol}</small>
            </div>

            <FontAwesomeIcon className="mx-3 text-yellow-700 text-xl" icon={["fas", "right-left"]} />

            <i class={className}></i>
        </main>
    )
}

export default ListItemAssetPair
