import React, { useEffect, useState } from 'react'
import { useRxWeb3 } from '../../../contexts/RxWeb3'
import Button from '../../Atoms/Button/Button'
import styles from './VotesTallied.module.css'

const VotesTallied = () => {

    const [reveal, setReveal] = useState(false)
    const [proposal, setProposal] = useState({})
    const { isReady, account, action } = useRxWeb3()

    useEffect(() => {
        if (isReady) {
            action.winningProposalID().call({ from: account })
                .then(id => {
                    try {
                        action.getOneProposal(id).call({ from: account })
                            .then(setProposal)

                    } catch (err) {
                        console.log(err)
                    }
                })
        }
    }, [isReady])

    console.log(proposal.description)
    return (
        <section className={styles.part}>
            <p className='annonce'>Le choix retenu</p>
            <div className={`${styles.card} ${styles.loaderBG}`}>
                <p className={`${styles.question}  loader ${reveal ? styles.vanish : ''}`}>?</p>
                <p className={`${styles.winner} loader ${reveal ? styles.appear : ''}`}>{proposal.description}</p>

            </div>
            <Button onClick={() => {setReveal(true)}} disabled={reveal}>{reveal ? 'Merci de votre participation' : 'Découvrir le résultat'}</Button>
        </section>
    )
}

export default VotesTallied