import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from './schema'

import shortid from 'shortid'
import { useRecoilState } from 'recoil'
import { Voters } from '../../../../provider/Voters'
import { Workflow } from '../../../../provider/Workflow ';

export const useRegisteringVoters = () => {
    const [voters, setVoters] = useState([])
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