import React from 'react'
import { useRecoilValue } from 'recoil'
import { useRxWeb3 } from '../../../../contexts/RxWeb3'
import { Proposals } from '../../../../provider/Proposals'
import { Workflow } from '../../../../provider/Workflow '
import Button from '../../../Atoms/Button/Button'
import styles from './ProposalsRegistration.module.css'


const ProposalsRegistration = () => {

    const {action, account} = useRxWeb3()
    const proposals = useRecoilValue(Proposals)
    const workFlowStatus = useRecoilValue(Workflow)
    
    const closeRegistering = () => action.endProposalsRegistering().send({from : account})
    const startVoting = () => action.startVotingSession().send({from : account})

    console.log(proposals)
    return (
        <div className={styles.part}>
                <p className='annonce'>Liste des propositions</p>
                <div className={styles.list}>
                    {proposals.length > 0 ? proposals.map((proposal, i) =>
                            <p key={i} className={styles.text}>{`> ${proposal.label}`}</p>
                        )
                    :
                        <p className={`${styles.loader} label`}>en attente des propositions...</p>
                    }
                </div>
                {(proposals.length > 0 && workFlowStatus ===1) &&
                    <Button onClick={closeRegistering} disabled={proposals.length === 0}>
                        Cloturer la session d'enregistrement des propositions
                    </Button>
                }
                {(workFlowStatus ===2) &&
                    <Button onClick={startVoting}>
                        Démarrer la session de vote
                    </Button>
                }


            </div>

    )
}

export default ProposalsRegistration