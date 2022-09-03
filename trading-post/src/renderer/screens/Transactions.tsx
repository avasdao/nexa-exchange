import Header from '../components/Header'

import icon from '../../../assets/logo.png'

import ListItemAssetPair from '../components/ListItemAssetPair'

const Transactions = () => {
    return (
        <main>
            <section className="m-3">
                <h1 className="tracking-widest text-2xl font-bold text-gray-500 text-center opacity-50 uppercase">
                    Transactions
                </h1>

                <h3 className="flex justify-center items-center text-gray-700 font-bold opacity-70">
                    Bridged assets are denoted with a <span className="mx-1 text-red-700 font-bold">".b"</span> suffix
                </h3>

            </section>

            <section className="mx-3">
                <ListItemAssetPair
                    base="SBCH"
                    trade="BCH"
                />

                <ListItemAssetPair
                    base="SBCH"
                    trade="BTC"
                />

                <ListItemAssetPair
                    base="SBCH"
                    trade="ETH"
                />

                <ListItemAssetPair
                    base="SBCH"
                    trade="BNB"
                />

                <ListItemAssetPair
                    base="SBCH"
                    trade="DAI"
                />

                <ListItemAssetPair
                    base="SBCH"
                    trade="USDC"
                />

            </section>

        </main>
    )
}

export default Transactions
