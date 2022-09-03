import { Link } from 'react-router-dom'

import { version } from '../../../package.json'

import icon from '../../../assets/logo.png'

const Header = () => {
    return (
        <main className="flex items-center py-0 bg-gradient-to-r from-indigo-100 to-indigo-300 border-b-2 border-indigo-500 shadow-md justify-between">
            <Link to="/" className="">
                <img className="w-10 mx-1" alt="icon" src={icon} />
            </Link>

            <div className="flex flex-col items-end">
                <div className="flex mx-3 pt-1 text-right">
                    <h1 className="hidden text-2xl text-gray-700 tracking-tighter font-bold">
                        Nexa Exchange
                    </h1>

                    <h1 className="ml-1 text-2xl text-purple-700 tracking-tighter font-bold uppercase">
                        Trading Post
                    </h1>
                </div>

                <h3 className="-mt-1 mx-5 text-xs text-gray-700 font-medium">
                    v{version}
                </h3>
            </div>
        </main>
    )
}

export default Header
