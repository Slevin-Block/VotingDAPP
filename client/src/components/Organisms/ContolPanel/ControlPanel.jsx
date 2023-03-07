import React from 'react'
import { Workflow, WORKFLOWSTATUS } from '../../../provider/Workflow ';

import { useRecoilState } from 'recoil'
import { User } from '../../../provider/User.js'
import Button from '../../Atoms/Button/Button';
import { Box, Group, ButtonsGroup, Title } from './ControlPanel.style'

const ControlPanel = () => {

    const [userType, setUserType] = useRecoilState(User)
    const [workFlowStatus, setStatus] = useRecoilState(Workflow)
    const nextStep = () => {
        WORKFLOWSTATUS[workFlowStatus] !== 'VotesTallied' && setStatus(workFlowStatus + 1)
    }

    return (
        <Box>
            <Title>CONTROL PANEL</Title>
            <Group>
                <p>{userType}</p>
                <ButtonsGroup>
                    <Button onClick={() => setUserType("voter")}>voter</Button>
                    <Button onClick={() => setUserType("president")}>president</Button>
                </ButtonsGroup>
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