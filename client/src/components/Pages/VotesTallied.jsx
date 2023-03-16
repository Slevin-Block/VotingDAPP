import React, { useEffect, useState } from 'react'
import { useRxWeb3 } from '../../contexts/RxWeb3'

const VotesTallied = () => {
    const [proposal, setProposal] = useState({})
    const {isReady, account, action} = useRxWeb3()

    useEffect(() => {
        if (isReady){
            action.winningProposalID().call({ from: account })
                .then(id => {
                    try{
                        action.getOneProposal(id).call({from : account})
                            .then(setProposal)
                    
                    }catch(err){
                        console.log(err)
                    }
                })
        }
    }, [isReady])

    console.log(proposal)
  return (
    <section>
        <p>{proposal?.description}</p>
    </section>
  )
}

export default VotesTallied