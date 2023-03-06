import { useState } from 'react'
import { EthProvider } from "./contexts/EthContext/EthProvider";

import './App.css'
import { useRecoilState, useRecoilValue } from 'recoil';
import { User } from './provider/User';
import { Workflow, WORKFLOWSTATUS} from './provider/Workflow ';

function App() {

    const userType = useRecoilValue(User)
    const [workFlowStatus, setStatus] = useRecoilState(Workflow)

    const nextStep = () => {
        WORKFLOWSTATUS[workFlowStatus] != 'VotesTallied' && setStatus(workFlowStatus + 1)
    }

    return (
        <>
            <EthProvider>
                <p>{userType}</p>
                <p>{WORKFLOWSTATUS[workFlowStatus]}</p>
                <button onClick={nextStep}>NextStep</button>
            </EthProvider>
        </>
    )
}

export default App
