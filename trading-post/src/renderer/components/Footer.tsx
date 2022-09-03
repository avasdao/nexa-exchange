import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <main className="absolute bottom-0 px-3 py-1 w-full flex justify-between items-center bg-gray-800 border-t-2 border-pink-500">
            <Link to="/network" className="m-0 text-green-300 text-xs font-bold uppercase">
                Connected
            </Link>

            <Link to="/network" className="m-0 text-gray-500 text-xs">
                <FontAwesomeIcon className="text-green-300 text-sm" icon={["fas", "signal"]} />
            </Link>
        </main>
    )
}

export default Footer
