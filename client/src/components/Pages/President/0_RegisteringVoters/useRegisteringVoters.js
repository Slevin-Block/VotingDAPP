import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from './schema'

import shortid from 'shortid'
import { useRecoilValue } from 'recoil'
import { Voters } from '../../../../provider/Voters'

import {useUtilsFunctions} from '../../../../utils/UtilsFunctions'

export const useRegisteringVoters = () => {

    const globalVoters = useRecoilValue(Voters)
    const [voters, setVoters] = useState([/*   {id : 0, address :'0xa6d5E0E997164e037dcb28ea9Ca0CD8AEd38db2D'.toLowerCase()},
                                            {id : 1, address :'0x196deDD781fDfcEcC29F14ad95BF45BC41B3e745'.toLowerCase()},
                                            {id : 2, address :'0x2363f5e9E6f8a89670B199DdaFD0e363baF843B5'.toLowerCase()}  */])
    const {addVoter, startProposalsRegistering} = useUtilsFunctions()

    const { register, handleSubmit, formState :{errors} } = useForm({
        defaultValues: {
            address: '',
        },
        resolver: yupResolver(getSchema(voters.length > 0 ? voters.map(voter => voter?.address) : []))
    })
    useEffect(() => {
        setVoters(globalVoters.map(voter => {return {id: shortid.generate(), address : voter.toLowerCase()}}))
    }, [globalVoters])

    const onSubmit = (data) => handleSubmit(({address}) => {
        const newVoters = [...voters, { id: shortid.generate(), address : address.toLowerCase() }]
        setVoters(newVoters)
    })(data)

    const handleDelete = (id) => {
        setVoters(voters.filter(voter => voter.id !== id))
        delete errors?.address?.message
    }

    const onValidate = (address) => {
        addVoter(address.toLowerCase())
    }

    return { register, errors, onSubmit,
            voters, globalVoters,
            onValidate, handleDelete, startProposalsRegistering
          }
}