import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from './schema'

import shortid from 'shortid'
import { useRecoilState } from 'recoil'
import { Voters } from '../../../../provider/Voters'
import { Workflow } from '../../../../provider/Workflow ';

export const useRegisteringVoters = () => {



    const [voters, setVoters] = useState([  {id : 0, address :'0xa6d5E0E997164e037dcb28ea9Ca0CD8AEd38db2D'},
                                            {id : 1, address :'0x196deDD781fDfcEcC29F14ad95BF45BC41B3e745'},
                                            {id : 2, address :'0x2363f5e9E6f8a89670B199DdaFD0e363baF843B5'} ])
    const [globalVoters, setGlobalVoters] = useRecoilState(Voters)
    const [workFlowStatus, setStatus] = useRecoilState(Workflow)

    const { register, handleSubmit, formState :{errors} } = useForm({
        defaultValues: {
            address: '',
        },
        resolver: yupResolver(getSchema(voters.length > 0 ? voters.map(voter => voter?.address) : []))
    })

    const onSubmit = (data) => handleSubmit(({address}) => {
        const newVoters = [...voters, { id: shortid.generate(), address : address.toLowerCase() }]
        setVoters(newVoters)
    })(data)

    const handleDelete = (id) => {
        setVoters(voters.filter(voter => voter.id !== id))
        delete errors?.address?.message
    }

    const onValidate = () => {
        setGlobalVoters(voters.map(voter => voter?.address))
    }


    return { register, errors, onSubmit,
            voters, globalVoters, workFlowStatus, setStatus,
            onValidate, handleDelete
          }
}