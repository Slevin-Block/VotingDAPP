import Button from '../../../Atoms/Button/Button'
import IconButton from '../../../Atoms/IconButton/IconButton';
import Input from '../../../Atoms/Input/Input';
import { useRegisteringVoters } from './useRegisteringVoters';
import styles from './RegisteringVoters.module.css'


const RegisteringVoters = () => {

    const { register, errors, onSubmit,                         // HookForm
            voters, globalVoters, workFlowStatus, setStatus,    // States
            onValidate, handleDelete                            // Actions
          } = useRegisteringVoters()

    console.log(globalVoters)
    return (
        <section className={styles.zone}>
            <div className={styles.leftPart}>
                {globalVoters.length === 0
                    ? <>
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
                    </>
                    : <>
                        <p className='lightAnnonce'>{`Merci pour l'ajout des ${globalVoters.length} votant${globalVoters.length > 1 ?`s`:``}`}</p>
                    </>
                }
            </div>

            <div className={styles.rightPart}>
                <div className={styles.list}>
                    {voters.map(voter =>
                        <div key={voter.id} className={styles.item}>
                            <p className={styles.text}>{voter.address}</p>
                            {globalVoters.length === 0 &&
                                <IconButton
                                    className={styles.delete}
                                    onClick={() => handleDelete(voter.id)}
                                ></IconButton>
                            }
                        </div>
                    )}
                </div>
                {globalVoters.length === 0
                ?   <Button onClick={onValidate} isDisabled={voters.length === 0}>
                        Enregister
                    </Button>
                :   <Button onClick={()=>setStatus(workFlowStatus + 1)} >
                        Démarrer la session d'enregistrement des propositions
                    </Button>
                }
            </div>
        </section>
    )
}

export default RegisteringVoters