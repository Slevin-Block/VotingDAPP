import Button from '../../../Atoms/Button/Button'
import IconButton from '../../../Atoms/IconButton/IconButton';
import Input from '../../../Atoms/Input/Input';
import styles from './RegisteringVoters.module.css'
import { useRegisteringVoters } from './useRegisteringVoters'
const RegisteringVoters = () => {

    const { register, errors, onSubmit,                         // HookForm
            voters, globalVoters,                               // States
            onValidate, handleDelete, startProposalsRegistering // Actions
          } = useRegisteringVoters()

    return (
        <section className={styles.zone}>
            <div className={styles.leftPart}>
                <form onSubmit={onSubmit} className={styles.form}>
                    <div>
                        <label className='label'>Ajouter des votants :</label>
                        <Input
                            register = {register}
                            field = 'address'
                            placeholder='adresse Ethereum'
                        />
                        {typeof errors.address?.message === "string" && <p className='error'>{errors.address?.message}</p>}
                    </div>
                    <Button type='submit' className={styles.button}>Ajouter</Button>
                </form>
            </div>

            <div className={styles.rightPart}>
                <div className={styles.list}>
                    {voters.length === 0 && <p>Veuillez renseigner des adresses de votant</p>}
                    {voters.map(voter =>
                        <div key={voter.id} className={styles.item}>
                            <p className={styles.text}>{voter.address}</p>
                            <>
                                <IconButton
                                    icon = 'trash'
                                    className={styles.delete}
                                    onClick={() => handleDelete(voter.id)}
                                    disabled={globalVoters.includes(voter.address)}
                                ></IconButton>
                                <IconButton
                                    icon = 'check'
                                    className={styles.check}
                                    onClick={() => onValidate(voter.address)}
                                    disabled={globalVoters.includes(voter.address)}
                                ></IconButton>
                                <IconButton
                                    icon = 'checks'
                                    className={styles.validate}
                                    hidden={!globalVoters.includes(voter.address)}
                                    disabled={true}
                                ></IconButton>
                            </>
                        </div>
                    )}
                </div>
                <Button onClick={startProposalsRegistering} disabled={globalVoters.length === 0}>
                    Démarrer la session d'enregistrement des propositions
                </Button>
            </div>
        </section>
    )
}

export default RegisteringVoters