import React from 'react'


const VotingSession = ({ start }) => {
    return (
        start ? (
            <section>
                Les votants votent pour les propositions
            </section>
        ) : (
            <section>
                <p>Les votants ont fini de voter.</p>
            </section>
        )

    )
}

export default VotingSession