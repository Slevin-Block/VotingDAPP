import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useRxWeb3 } from '../../../../contexts/RxWeb3'
import { Proposals } from '../../../../provider/Proposals'
import Button from '../../../Atoms/Button/Button'
import GroupRadio from '../../../Blocs/GroupRadio/GroupRadio'
import styles from './VotingSession.module.css'


const VotingSession = () => {
    const {action, account} = useRxWeb3()
    const proposals = useRecoilValue(Proposals)
    const [myVote, setMyVote] = useState(null)
    const onChange = (choice) => setMyVote(choice)
    const valideChoice = () => {
        const index = (proposals.findIndex(proposal => proposal.label === myVote) +1)
        action.setVote(index).send({from : account})
    }

    return (
        <section className={styles.zone} >
            <GroupRadio
                className={styles.box}
                handleChange={onChange}
                data={proposals.map(p => p.label)}
            />
            <div className={styles.control}>
                <Button
                    disabled={myVote === null}
                    onClick={valideChoice}
                >
                    Valider mon choix
                </Button>
            </div>
        </section>
    )
}

export default VotingSession