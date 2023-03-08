import React from 'react'
import { Workflow, WORKFLOWSTATUS } from '../../../provider/Workflow ';

import { useRecoilState } from 'recoil'
import { User } from '../../../provider/User.js'
import Button from '../../Atoms/Button/Button';
import { Box, Group, ButtonsGroup, Title } from './ControlPanel.style'
import Input from '../../Atoms/Input/Input';

const ControlPanel = () => {

    const [user, setUser] = useRecoilState(User)
    const [workFlowStatus, setStatus] = useRecoilState(Workflow)
    const nextStep = () => {
        WORKFLOWSTATUS[workFlowStatus] !== 'VotesTallied' && setStatus(workFlowStatus + 1)
    }

    const handleChange = () => {
    
    }

    return (
        <Box>
            <Title>CONTROL PANEL</Title>
            <Group>
                <p>{user.rule}</p>
                <ButtonsGroup>
                    <Button onClick={()  => setUser({...user, rule : "voter"})}>voter</Button>
                    <Button onClick={()  => setUser({...user, rule : "president"})}>president</Button>
                </ButtonsGroup>
                <p>{user.address}</p>
                <Input onChange={(e)  => setUser({...user, address : e.target.value})}/>
            </Group>
            <Group>
                <p>{WORKFLOWSTATUS[workFlowStatus]}</p>
                <ButtonsGroup>
                    <Button onClick={nextStep}>NextStep</Button>
                </ButtonsGroup>
            </Group>
        </Box>
    )
}

export default ControlPanel