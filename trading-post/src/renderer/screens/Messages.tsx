import Header from '../components/Header'

import icon from '../../../assets/logo.png'

const Nodes = () => {
    return (
        <main>
            <section className="m-3">
                <h1 className="tracking-widest text-2xl font-bold text-gray-500 text-center opacity-50 uppercase">
                    Message Dashboard
                </h1>

                <h3 className="flex justify-center items-center text-gray-500 font-bold opacity-70">
                    3
                    <small className="ml-1 uppercase">unread message(s)</small>
                </h3>
            </section>

            <section className="px-3 flex justify-around">
                <button className="px-3 py-1 bg-pink-600 border-4 border-pink-700 rounded-xl">
                    <span className="text-sm text-pink-200 font-bold">
                        (+) Inbox
                    </span>
                </button>

                <button className="px-3 py-1 bg-pink-600 border-4 border-pink-700 rounded-xl">
                    <span className="text-sm text-pink-200 font-bold">
                        (+) Sent
                    </span>
                </button>

                <button className="px-3 py-1 bg-pink-600 border-4 border-pink-700 rounded-xl">
                    <span className="text-sm text-pink-200 font-bold">
                        (+) Saved
                    </span>
                </button>
            </section>

        </main>
    )
}

export default Nodes
