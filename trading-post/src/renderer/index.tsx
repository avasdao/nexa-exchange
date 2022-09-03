import { createRoot } from 'react-dom/client'

import 'tailwindcss/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import {
//     faCheckSquare,
//     faCoffee
// } from '@fortawesome/free-solid-svg-icons'

import App from './App'

library.add(fab, fas)
// library.add(fab, faCheckSquare, faCoffee)

const container = document.getElementById('root')!

const root = createRoot(container)

root.render(<App />)

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
    // eslint-disable-next-line no-console
    console.log(arg)
})

window.electron.ipcRenderer.sendMessage('ipc-example', ['ping'])
