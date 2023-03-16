import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useRxWeb3 } from '../../../../contexts/RxWeb3'
import { Proposals } from '../../../../provider/Proposals'
import { Workflow } from '../../../../provider/Workflow '
import Button from '../../../Atoms/Button/Button'
import GroupRadio from '../../../Blocs/GroupRadio/GroupRadio'
import styles from './VotingSession.module.css'


const VotingSession = () => {
    const {isReady, action, account, researchEvent} = useRxWeb3()
    const workFlowStatus = useRecoilValue(Workflow)
    const proposals = useRecoilValue(Proposals)
    const [myVote, setMyVote] = useState(null)
    const [voted, setVoted] = useState(false)

    const onChange = (choice) => setMyVote(choice)
    const valideChoice = () => {
        const index = (proposals.findIndex(proposal => proposal.label === myVote) +1)
        action.setVote(index).send({from : account})
            .then(() => setVoted(true))
    }

    useEffect(() => {
        if (isReady){
            researchEvent('Voted',votes => {
                const arr = votes.map(vote => vote.voter.toLowerCase())
                arr.includes(account.toLowerCase()) ? setVoted(true) : setVoted(false)
            })
        }
    }, [isReady, account])




    if (!voted && workFlowStatus ===3) return (
        <section className={styles.zone}>
            <h2 className='annonce'>Voter pour une proposition</h2>
            <GroupRadio
                className={styles.box}
                handleChange={onChange}
                data={proposals.map(p => p.label)}
            />
            <div className={styles.control}>
                <Button
                    disabled={myVote === null || voted}
                    onClick={valideChoice}
                >
                    Valider mon choix
                </Button>
            </div>
        </section>
    )
    if (voted || workFlowStatus === 4) return (
        <div className={styles.zoneAlone}>
            {voted && <><p className={`annonce loader`}> Merci pour votre vote !</p><br/></>}
            <p className={`annonce loader`}>En attente de la cloture de la session par le président ...</p>
        </div>
    )
}

export default VotingSession