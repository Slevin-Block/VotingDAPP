import React from 'react'


const VotingSession = ({ start }) => {
    return (
        start ? (
            <section>
                Session d'enregistrement des votes
            </section>
        ) : (
            <section>
                <p>Le président finalise le dépouillement.</p>
                <p>Vous assisterez prochainement à l'annonce de la proposition gagnante</p>
            </section>
        )

    )
}

export default VotingSession