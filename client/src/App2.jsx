import React, { useEffect, useState } from 'react'
import { useRxWeb3 } from './contexts/RxWeb3'

const App2 = () => {
    const [data, setData] = useState({})

    const {isReady, researchEvent} = useRxWeb3()

    useEffect(() => {
        if (isReady){
            researchEvent('VoterRegistered', setData)
        }
    }, [isReady])

    const myAction = () => researchEvent('VoterRegistered', setData)

    console.log(data)
    return (
        <main>
            App2
            <button onClick={myAction}>Action</button>
        </main>
    )
}

export default App2