import {
    MemoryRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import './App.css'

import Footer from './components/Footer'
import Header from './components/Header'

import Accounts from './screens/Accounts'
import Assets from './screens/Assets'
import Dashboard from './screens/Dashboard'
import Federation from './screens/Federation'
import Messages from './screens/Messages'
import Network from './screens/Network'
import Nodes from './screens/Nodes'
import Settings from './screens/Settings'
import Stats from './screens/Stats'
import Transactions from './screens/Transactions'
import TVL from './screens/TVL'
import Validators from './screens/Validators'
import Volume from './screens/Volume'
import Voting from './screens/Voting'

import icon from '../../assets/icon.svg'

export default function App() {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/accounts" element={<Accounts />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/federation" element={<Federation />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/network" element={<Network />} />
                <Route path="/nodes" element={<Nodes />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/txs" element={<Transactions />} />
                <Route path="/tvl" element={<TVL />} />
                <Route path="/validators" element={<Validators />} />
                <Route path="/volume" element={<Volume />} />
                <Route path="/voting" element={<Voting />} />
            </Routes>

            <Footer className="m-0" />
        </Router>
    )
}
