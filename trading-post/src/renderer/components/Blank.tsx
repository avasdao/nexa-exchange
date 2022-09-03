import { Link } from 'react-router-dom'

import icon from '../../../assets/logo.png'

const Blank = () => {
    return (
        <main className="">
            <Link to="/" className="">
                <img className="w-10 mx-1" alt="icon" src={icon} />
            </Link>

            <div className="flex flex-col items-end">
                <div className="flex mx-3 pt-1 text-right">
                    <h1 className="text-2xl text-gray-700 tracking-tighter font-bold">
                        Blank Component
                    </h1>
                </div>
            </div>
        </main>
    )
}

export default Blank
