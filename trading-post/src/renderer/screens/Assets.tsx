import Header from '../components/Header'

import icon from '../../../assets/logo.png'

import ListItemAsset from '../components/ListItemAsset'

const Assets = () => {
    return (
        <main>
            <section className="m-3">
                <h1 className="tracking-widest text-2xl font-bold text-gray-500 text-center opacity-50 uppercase">
                    Assets
                </h1>

                <h3 className="flex justify-center items-center text-gray-500 font-bold opacity-70">
                    Bridged assets are denoted with suffix <span className="ml-1 text-red-700 font-bold">".b"</span>
                </h3>

            </section>

            <section className="mx-3 grid grid-cols-2 gap-4">
                <ListItemAsset
                    id="ETH"
                />

                <ListItemAsset
                    id="DAI"
                />

                <ListItemAsset
                    id="BNB"
                />

            </section>

        </main>
    )
}

export default Assets
