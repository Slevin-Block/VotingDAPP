import React from 'react'
import { Workflow, WORKFLOWSTATUS } from '../../../provider/Workflow ';

import { useRecoilState, useRecoilValue } from 'recoil'
import { OwnerAddress, UserAddress, UserRule } from '../../../provider/User.js'
import Button from '../../Atoms/Button/Button';
import styles from './ControlPanel.module.css'
//import Input from '../../Atoms/Input/Input';


import { useEffect } from "react";

const ControlPanel = (props) => {

    
    const [ownerAddress, setOwnerAddress] = useRecoilState(OwnerAddress)
    const [address, setAddress] = useRecoilState(UserAddress)
    const rule = useRecoilValue(UserRule)
    const [workFlowStatus, setStatus] = useRecoilState(Workflow)
    const nextStep = () => {
        WORKFLOWSTATUS[workFlowStatus] !== 'VotesTallied' && setStatus(workFlowStatus + 1)
    }
    
    const LoadAddress = async () => {
        const ownerAddress = await props.contract.methods.owner().call({ from: props.accounts[0] })
        setOwnerAddress(ownerAddress)
        setAddress(props.accounts[0])
    }
  
    useEffect(() => {
        if (props.contract?.methods) {
            LoadAddress();
        }
    });
    
    return (
        <div className={styles.box}>
            <p className={styles.title}>CONTROL PANEL</p>
            <div className={styles.group}>
                <p>Owner: {ownerAddress}</p>
                <p>Address from metamask: {address}</p>
                <p>{rule}</p>
                {/*<Input onChange={(e)  => setAddress(e.target.value)}/>*/}
            </div>
            <div className={styles.group}>
                <p>{WORKFLOWSTATUS[workFlowStatus]}</p>
                <div className={styles.buttonsGroup}>
                    <Button onClick={nextStep}>NextStep</Button>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel