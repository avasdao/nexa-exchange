import Header from '../components/Header'

import icon from '../../../assets/logo.png'

const Dashboard = () => {
    return (
        <main>
            <section className="m-3">
                <h1 className="tracking-widest text-2xl font-bold text-gray-500 text-center opacity-50 uppercase">
                    Settings
                </h1>

                <h3 className="hidden flex justify-center items-center text-gray-500 font-bold opacity-70">
                    12
                    <small className="ml-1 uppercase">nodes connected</small>
                </h3>

            </section>

            <section className="m-3 p-3 border-4 bg-pink-200 border-pink-700 rounded-xl">
                <h5 className="text-pink-700 text-xs font-bold opacity-50 uppercase">
                    Your Public Key
                </h5>

                <h3 className="text-pink-700 text-xs font-bold">
                    04 2c07044e 7ea51a48 9c02854d b5e09f01 91690dc5 9db0afd9 5328c9db 614a2976 e088cab7 c86d7e48 18319125 8fc59dc6 99653508 ce25bf03 69d67f33 d5d77839
                </h3>

                <div className="my-2 border border-pink-900 opacity-30" />

                <h5 className="text-pink-700 text-xs font-bold opacity-50 uppercase">
                    Your SSH Key
                </h5>

                <h3 className="text-pink-700 font-bold">
                    08b6cd04-fb42-4b1c-9850-86de2aa0162f
                </h3>
            </section>

            <div className="">
                <a
                    href="https://electron-react-boilerplate.js.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button type="button">
                    <span role="img" aria-label="books">
                    📚
                    </span>
                    Read our docs
                    </button>
                </a>

                <a
                    href="https://github.com/sponsors/electron-react-boilerplate"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button type="button">
                    <span role="img" aria-label="books">
                    🙏
                    </span>
                    Donate
                    </button>
                </a>

            </div>
        </main>
    )
}

export default Dashboard
