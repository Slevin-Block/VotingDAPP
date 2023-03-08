import React from 'react'
import { Workflow, WORKFLOWSTATUS } from '../../../provider/Workflow ';

import { useRecoilState, useRecoilValue } from 'recoil'
import { UserAddress, UserRule } from '../../../provider/User.js'
/* import Button from '../../Atoms/Button/Button'; */
import styles from './ControlPanel.module.css'
import Input from '../../Atoms/Input/Input';

const ControlPanel = () => {

    const [/* address*/,  setAddress] = useRecoilState(UserAddress)
    const rule = useRecoilValue(UserRule)
    const [workFlowStatus/* , setStatus */] = useRecoilState(Workflow)
    /* const nextStep = () => {
        WORKFLOWSTATUS[workFlowStatus] !== 'VotesTallied' && setStatus(workFlowStatus + 1)
    } */

    return (
        <div className={styles.box}>
            <p className={styles.title}>CONTROL PANEL</p>
            <div className={styles.group}>
                <p>{rule}</p>
                {/* <p>{address}</p> */}
                <Input
                    defaultValue='0xf78dc6022fec2afb788d55eaf78c347ba2bf821a'
                    placeholder='entrer votre adresse de connection Metamask'
                    className={styles.input} onChange={(e)  => setAddress(e.target.value)}/>
            </div>
            <div className={styles.group}>
                <p>{WORKFLOWSTATUS[workFlowStatus]}</p>
                {/* <div className={styles.buttonsGroup}>
                    <Button onClick={nextStep}>NextStep</Button>
                </div> */}
            </div>
        </div>
    )
}

export default ControlPanel