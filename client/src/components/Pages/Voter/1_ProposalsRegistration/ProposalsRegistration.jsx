import React from 'react'



const ProposalsRegistration = ({ start }) => {
    return (
        start ? (
            <section>
                Session d'enregistrement des propositions
            </section>
        ) : (
            <section>
                <p>Le président finalise l'enregistrement des propositions.</p>
                <p>Il n'a pas encore démarré la session de vote</p>
            </section>
        )

    )
}

export default ProposalsRegistration