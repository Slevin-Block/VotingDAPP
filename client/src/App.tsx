import { useState } from 'react'
import { EthProvider } from "./contexts/EthContext/EthProvider";

import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <EthProvider>
                Coucou
            </EthProvider>
        </>
    )
}

export default App
