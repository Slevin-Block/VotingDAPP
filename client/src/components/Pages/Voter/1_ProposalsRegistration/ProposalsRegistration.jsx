import React from 'react'
import Button from '../../../Atoms/Button/Button'
import IconButton from '../../../Atoms/IconButton/IconButton';
import Input from '../../../Atoms/Input/Input';
import { useProposalsRegistration } from './useProposalsRegistration';
import styles from './ProposalsRegistration.module.css'


const ProposalsRegistration = ({ start = true }) => {

    const { register, errors, onSubmit, // Hook Form
            proposals, globalProposals, workFlowStatus,  // State
            onValidate, handleDelete    // Actions
          } = useProposalsRegistration()

    if (workFlowStatus === 2) return (
            <section>
                <p>Le président finalise l'enregistrement des propositions.</p>
                <p>Il n'a pas encore démarré la session de vote</p>
            </section>
    )

    if (workFlowStatus === 1) return (
        <section className={styles.zone}>
            <div className={styles.leftPart}>
                {globalProposals.length === 0
                    ? <form onSubmit={onSubmit} className={styles.form}>
                            <div>
                                <label className='label'>Ajouter des propositions :</label>
                                <Input
                                    register = {register}
                                    field = 'proposal'
                                    placeholder='votre proposition'
                                />
                                {typeof errors.proposal?.message === "string" && <p className='error'>{errors.proposal?.message}</p>}
                            </div>
                            <Button type='submit' className={styles.button}>Ajouter</Button>
                        </form>
                    : <p className='lightAnnonce'>{`Merci pour l'ajout des ${globalProposals.length} proposition${globalProposals.length > 1 ?`s`:``}`}</p>
                    
                }
            </div>

            <div className={styles.rightPart}>
                <div className={styles.list}>
                    {proposals.map(proposal =>
                        <div key={proposal.id} className={styles.item}>
                            <p className={styles.text}>{proposal.label}</p>
                                {globalProposals.length === 0 &&
                                    <IconButton
                                        className={styles.delete}
                                        onClick={() => handleDelete(proposal.id)}
                                    ></IconButton>
                                }
                        </div>
                    )}
                </div>
                {globalProposals.length === 0 &&
                    <Button onClick={onValidate} isDisabled={proposals.length === 0}>
                        Enregister
                    </Button>
                }
            </div>
        </section>
    )
}

export default ProposalsRegistration