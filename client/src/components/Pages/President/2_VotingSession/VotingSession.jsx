import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useRxWeb3 } from '../../../../contexts/RxWeb3'
import { Proposals } from '../../../../provider/Proposals'
import { Workflow } from '../../../../provider/Workflow '
import Button from '../../../Atoms/Button/Button'
import styles from './VotingSession.module.css'

const VotingSession = () => {
    const { action, account } = useRxWeb3()
    const [proposals, setProposals] = useState([])
    const workflowStatus = useRecoilValue(Workflow)
    const globalProposals = useRecoilValue(Proposals)

    useEffect(() => setProposals([...globalProposals].sort((a, b) => b.count - a.count)), [globalProposals])
    const bestValue = proposals.at(0)?.count ?? 0


    const endVotingSession = () => {
        action.endVotingSession().send({ from: account })
    }
    const tallyVotes = () => {
        action.tallyVotes().send({ from: account })
    }

    if (workflowStatus === 3) return (
        <section className={styles.part}>
            <h2 className='annonce'>Les votes en direct</h2>
            {proposals.length > 0 &&
                <>
                    <div className={styles.proposals}>
                        {proposals.map((proposal, i) =>
                            <div key={i} className={styles.oneProposal}>
                                <p>{proposal.label}</p>
                                <p className={`${styles.count} ${proposal.count === bestValue ? styles.winner : ''}`}> {proposal.count}</p>
                            </div>
                        )}
                    </div>
                    <Button onClick={endVotingSession}>
                        Cloturer la session de vote
                    </Button>
                </>
            }
        </section>
    )
    if (workflowStatus === 4) return (
        <section className={styles.partEnd}>
            <h2 className='annonce loader'>Fin de la session de vote</h2>
            <Button onClick={tallyVotes} >
                Débloquer le résultat final
            </Button>
        </section>
    )
}

export default VotingSession