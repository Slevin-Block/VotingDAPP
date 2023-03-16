import React from 'react'
import { useRecoilValue } from 'recoil'
import { Proposals } from '../../../../provider/Proposals'


const VotingSession = ({ start }) => {
    const proposals = useRecoilValue(Proposals)
    return (
        start ? (
            <section>
                {proposals.map((proposal, i) => 
                    <div key={i}>{proposal.label} {proposal.count}</div>
                )}
            </section>
        ) : (
            <section>
                <p>Les votants ont fini de voter.</p>
            </section>
        )

    )
}

export default VotingSession