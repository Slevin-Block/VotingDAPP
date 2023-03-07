import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from './schema'

import shortid from 'shortid'
import { useRecoilState } from 'recoil'
import { Voters } from '../../../../provider/Voters'

import Button from '../../../Atoms/Button/Button'
import IconButton from '../../../Atoms/IconButton/IconButton';
import Input from '../../../Atoms/Input/Input';



const RegisteringVoters = () => {
    const [voters, setVoters] = useState([])
    const [globalVoters, setGlobalVoters] = useRecoilState(Voters)
    const { register, handleSubmit, formState :{errors} } = useForm({
        defaultValues: {
            address: '0xf78dC6022fec2AFb788D55eaF78c347BA2bf821e',
        },
        resolver: yupResolver(getSchema(voters.length > 0 ? voters.map(voter => voter?.address) : []))
    })

    const onSubmit = ({address}) => {
        const newVoters = [...voters, { id: shortid.generate(), address : address.toLowerCase() }]
        setVoters(newVoters)
    }

    const handleDelete = (address) => {
        setVoters(voters.filter(voter => voter.address !== address))
        delete errors?.address?.message
    }

    const onValidate = () => {
        setGlobalVoters(voters.map(voter => voter?.address))
    }

    return (
        <section>
            <div>
                <p>C'est le moment d'ajouter des votants !</p>
                <form onSubmit={handleSubmit(onSubmit)} disabled={true}> 
                    <Input
                        register = {register}
                        field = 'address'
                        placeholder='adresse Ethereum'
                        defaultValue='0xf78dC6022fec2AFb788D55eaF78c347BA2bf821e'
                    />
                    {typeof errors.address?.message === "string" && <p>{errors.address?.message}</p>}
                    <Button type='submit'>Ajouter</Button>
                </form>
            </div>

            <div>
                {voters.map(voter =>
                    <div key={voter.id}>
                        <p >{voter.address}</p>
                        <IconButton
                            onClick={() => handleDelete(voter.address)}
                        ></IconButton>
                    </div>
                )}
                    <Button onClick={onValidate} disabled={voters.length === 0}>Enregister</Button>

            </div>
        </section>
    )
}

export default RegisteringVoters