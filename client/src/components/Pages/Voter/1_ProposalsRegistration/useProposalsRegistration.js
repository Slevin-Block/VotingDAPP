import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from './schema'

import shortid from 'shortid'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Workflow } from '../../../../provider/Workflow ';
import { Proposals } from '../../../../provider/Proposals';

export const useProposalsRegistration = () => {
    const [proposals, setProposals] = useState([])
    const [globalProposals, setGlobalProposals] = useRecoilState(Proposals)
    const workFlowStatus = useRecoilValue(Workflow)

    const { register, handleSubmit, formState :{errors} } = useForm({
        defaultValues: {
            proposal: '',
        },
        resolver: yupResolver(getSchema(proposals.length > 0 ? proposals.map(proposal => proposal?.label) : []))
    })

    const onSubmit = (data) => handleSubmit(({proposal}) => {
        console.log(proposal)
        const newProposals = [...proposals, { id: shortid.generate(), label : proposal}]
        setProposals(newProposals)
    })(data)

    const handleDelete = (id) => {
        setProposals(proposals.filter(proposal => proposal.id !== id))
        delete errors?.proposal?.message
    }

    const onValidate = () => {
        setGlobalProposals(proposals.map(proposal => proposal?.label))
    }


    return { register, errors, onSubmit,
            proposals, globalProposals, workFlowStatus,
            onValidate, handleDelete
          }
}