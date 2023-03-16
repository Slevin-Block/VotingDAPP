import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { getSchema } from './schema'

import shortid from 'shortid'
import { useRecoilValue } from 'recoil'
import { Workflow } from '../../../../provider/Workflow ';
import { Proposals } from '../../../../provider/Proposals';
import {useRxWeb3} from '../../../../contexts/RxWeb3'

export const useProposalsRegistration = () => {

    const {action, account} = useRxWeb3()
    const [proposals, setProposals] = useState([])
    const globalProposals = useRecoilValue(Proposals)
    const workFlowStatus = useRecoilValue(Workflow)

    const { register, handleSubmit, formState :{errors} } = useForm({
        defaultValues: {
            proposal: '',
        },
        resolver: yupResolver(getSchema([...globalProposals, ...proposals].map(proposal => proposal?.label.toLowerCase())))
    })

    const onSubmit = (data) => handleSubmit(({proposal}) => {
        const newProposals = [...proposals, { id: shortid.generate(), label : proposal}]
        setProposals(newProposals)
    })(data)

    const handleDelete = (id) => {
        setProposals(proposals.filter(proposal => proposal.id !== id))
        delete errors?.proposal?.message
    }

    const onValidate = async (proposal) => {
        await action.addProposal(proposal).send({from : account})
    }


    return { register, errors, onSubmit,
            proposals, globalProposals, workFlowStatus,
            onValidate, handleDelete
          }
}