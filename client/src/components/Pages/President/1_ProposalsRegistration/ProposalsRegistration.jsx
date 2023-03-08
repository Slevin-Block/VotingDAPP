import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Proposals } from '../../../../provider/Proposals'
import { Workflow } from '../../../../provider/Workflow '
import Button from '../../../Atoms/Button/Button'
import styles from './ProposalsRegistration.module.css'


const ProposalsRegistration = ({ start }) => {

    
    const proposals = useRecoilValue(Proposals)
    
    const [workFlowStatus, setStatus] = useRecoilState(Workflow)

    return (
        <div className={styles.part}>
                <div className={styles.list}>
                    {proposals.map((proposal, i) =>
                            <p key={i} className={styles.text}>{proposal}</p>
                    )}
                </div>
                {(proposals.length > 0 && workFlowStatus ===1) &&
                    <Button onClick={()=>setStatus(workFlowStatus + 1)} isDisabled={proposals.length === 0}>
                        Cloturer la session d'enregistrement des propositions
                    </Button>
                }
                {(workFlowStatus ===2) &&
                    <Button onClick={()=>setStatus(workFlowStatus + 1)} isDisabled={proposals.length === 0}>
                        Démarrer la session de vote
                    </Button>
                }


            </div>

    )
}

export default ProposalsRegistration