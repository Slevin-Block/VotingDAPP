import React from 'react'
import Button from '../../../Atoms/Button/Button'
import IconButton from '../../../Atoms/IconButton/IconButton';
import Input from '../../../Atoms/Input/Input';
import { useProposalsRegistration } from './useProposalsRegistration';
import styles from './ProposalsRegistration.module.css'


const ProposalsRegistration = () => {

    const { register, errors, onSubmit, // Hook Form
            proposals, globalProposals, workFlowStatus,  // State
            onValidate, handleDelete    // Actions
          } = useProposalsRegistration()

    const existingProposals = globalProposals.map(proposal => proposal.label.toLowerCase())

    console.log("Refresh")

    if (workFlowStatus === 2) return (
            <section>
                <p className={`annonce loader`}>
                    Le président finalise l'enregistrement des propositions.
                    <br/>
                    Il n'a pas encore démarré la session de vote
                </p>
            </section>
    )

    if (workFlowStatus === 1) return (
        <section className={styles.zone}>
            <div className={styles.leftPart}>
                <h2 className='title'>Faites des propositions</h2>
                <form onSubmit={onSubmit} className={styles.form}>
                        <div>
                            <label className='label'>Ajouter des propositions :</label>
                            <Input
                                register = {register}
                                field = 'proposal'
                                placeholder='votre proposition'
                                onChange={()=> console.log("Coucou")}
                            />
                            {typeof errors.proposal?.message === "string" && <p className='error'>{errors.proposal?.message}</p>}
                        </div>
                        <Button type='submit' className={styles.button}>Ajouter</Button>
                    </form>
            </div>

            <div className={styles.rightPart}>
                <div className={styles.list}>
                    {proposals.map(proposal =>
                        <div key={proposal.id} className={styles.item}>
                            <p className={styles.text}>{proposal.label}</p>
                                <>
                                    <IconButton
                                        icon = 'trash'
                                        className={styles.delete}
                                        onClick={() => handleDelete(proposal.id)}
                                        disabled={existingProposals.includes(proposal.label.toLowerCase())}
                                    ></IconButton>
                                    <IconButton
                                        icon = 'check'
                                        className={styles.check}
                                        onClick={() => onValidate(proposal.label)}
                                        disabled={existingProposals.includes(proposal.label.toLowerCase())}
                                    ></IconButton>
                                    <IconButton
                                        icon = 'checks'
                                        className={styles.validate}
                                        hidden={!existingProposals.includes(proposal.label.toLowerCase())}
                                        disabled={true}
                                    ></IconButton>
                                </>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ProposalsRegistration