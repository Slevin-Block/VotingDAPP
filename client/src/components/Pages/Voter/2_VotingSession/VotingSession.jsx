import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Proposals } from '../../../../provider/Proposals'
import Button from '../../../Atoms/Button/Button'
import GroupRadio from '../../../Blocs/GroupRadio/GroupRadio'
import styles from './VotingSession.module.css'


const VotingSession = () => {
    const proposals = useRecoilValue(Proposals)
    const [myVote, setMyVote] = useState(null)
    const onChange = (choice) => setMyVote(choice)
    const valideChoice = () => {console.log(myVote)}
    
    return (
        <section className={styles.zone} >
            <GroupRadio
                className={styles.box}
                handleChange={onChange}
                data={proposals}
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