import Button from '../../../Atoms/Button/Button'
import IconButton from '../../../Atoms/IconButton/IconButton';
import Input from '../../../Atoms/Input/Input';
import { useRegisteringVoters } from './useRegisteringVoters';



const RegisteringVoters = () => {

    const { register, errors, onSubmit,                           // HookForm
            voters, globalVoters, workFlowStatus, setStatus,    // States
            onValidate, handleDelete                            // Actions
          } = useRegisteringVoters()


    return (
        <section>
            <div>
                {globalVoters.length === 0
                    ? <>
                        <p>C'est le moment d'ajouter des votants !</p>
                        <form onSubmit={onSubmit}> 
                            <Input
                                register = {register}
                                field = 'address'
                                placeholder='adresse Ethereum'
                                defaultValue='0xf78dC6022fec2AFb788D55eaF78c347BA2bf821e'
                            />
                            {typeof errors.address?.message === "string" && <p>{errors.address?.message}</p>}
                            <Button type='submit'>Ajouter</Button>
                        </form>
                    </>
                    : <>
                        <p>{`Merci pour l'ajout des ${globalVoters.length} votant${globalVoters.length > 1 ?`s`:``}`}</p>
                    </>
                }
            </div>

            <div>
                {voters.map(voter =>
                    <div key={voter.id}>
                        <p >{voter.address}</p>
                        {globalVoters.length === 0 && <IconButton
                            onClick={() => handleDelete(voter.address)}
                        ></IconButton>}
                    </div>
                )}
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