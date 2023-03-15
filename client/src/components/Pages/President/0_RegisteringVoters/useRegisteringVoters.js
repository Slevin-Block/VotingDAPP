import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from './schema'

import shortid from 'shortid'
import { useRecoilValue } from 'recoil'
import { Voters } from '../../../../provider/Voters'

import {useRxWeb3} from '../../../../contexts/RxWeb3'
export const useRegisteringVoters = () => {

    const {action, account} = useRxWeb3()
    const globalVoters = useRecoilValue(Voters)
    const [voters, setVoters] = useState([])

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
        action.addVoter(address.toLowerCase()).send({from : account})
    }

    const startProposalsRegistering = () => {
        action.startProposalsRegistering().send({from : account})
    }

    return { register, errors, onSubmit,
            voters, globalVoters,
            onValidate, handleDelete, startProposalsRegistering
          }
}