import React from 'react'



const ProposalsRegistration = ({ start }) => {
    return (
        start ? (
            <section>
                Les votants font des propositions
            </section>
        ) : (
            <section>
                <p>La session d'enregistrement des propositions est cloturée.</p>
            </section>
        )

    )
}

export default ProposalsRegistration