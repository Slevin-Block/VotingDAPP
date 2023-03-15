import { useState, useEffect } from "react";
import { useRxWeb3 } from './contexts/RxWeb3';
import { useRecoilState } from "recoil";

import { Workflow, WORKFLOWSTATUS } from './provider/Workflow ';
import { Voters } from "./provider/Voters";

import Waiting from './components/Pages/Voter/0_Waiting/Waiting';
import VoterProposalsRegistration from './components/Pages/Voter/1_ProposalsRegistration/ProposalsRegistration';
import VoterVotingSession from './components/Pages/Voter/2_VotingSession/VotingSession';
import PresidentProposalsRegistration from './components/Pages/President/1_ProposalsRegistration/ProposalsRegistration';
import PresidentrVotingSession from './components/Pages/President/2_VotingSession/VotingSession';
import VotesTallied from './components/Pages/VotesTallied';
import RegisteringVoters from './components/Pages/President/0_RegisteringVoters/RegisteringVoters';
import Identification from './components/Pages/Identification';
import { Proposals } from "./provider/Proposals";

function App() {

    const {isReady, watchingEvents, researchEvent,  action, account} = useRxWeb3()
    const [ownerAddress, setOwnerAddress] = useState(undefined)
    const [workflow, setWorkflow] = useRecoilState(Workflow)
    const [voters, setVoters] = useRecoilState(Voters)
    const [proposals, setProposals] = useRecoilState(Proposals)

    const [newVoter, setNewVoter] = useState(undefined)
    const [newProposal, setNewProposal] = useState(undefined)

    const [vote, setVote] = useState([])

    // Loading information when contract and account is ready
    useEffect(() => {
        if (isReady){
            // Grab the current workflowStatus level
            action.workflowStatus().call({ from: account })
                .then(value => setWorkflow(parseInt(value)))

            // Grab the owner of contract
            action.owner().call({ from: account })
                .then(setOwnerAddress)

            // Find all voters already registered
            researchEvent('VoterRegistered',
                (addresses)=>setVoters(addresses.map(voter => voter.voterAddress.toLowerCase())))
            
            // Find all proposals already registered
            researchEvent('ProposalRegistered',
                 (proposals)=>{
                    convertProposal(proposals.map(proposal => parseInt(proposal.proposalId)))
                    .then(prop => {
                    // Find all votes already registered, nesting mandatory because of asynchronous data fetching
                    researchEvent('Voted',
                        (event)=>{
                            const indexes =event.map(item => parseInt(parseInt(item.proposalId)))
                            const newProposals = [...prop]
                            for (let i of indexes) newProposals[i-1] = {...newProposals[i-1], count : newProposals[i-1].count + 1}
                            setProposals(newProposals)
                        })
                    })
                })
            // Subscription to change WorkflowStatus
            watchingEvents('WorkflowStatusChange', setWorkflow,
                (wfs) => parseInt(wfs.newStatus))

            // Subscription to add Voter
            watchingEvents('VoterRegistered', setNewVoter,
                (wfs) => wfs.voterAddress.toLowerCase())

            // Subscription to add Proposal
            watchingEvents('ProposalRegistered', setNewProposal,
                (id) => parseInt(id.proposalId))

            // Subscription to vote
            /* watchingEvents('Voted', setProposals,
                (event) => proposals.map((p, index) => event.proposalId === index+1 ? {...p, count : p.count +1} : p)) */
            watchingEvents('Voted', setVote,
                (event) => console.log(event))
        }
    }, [isReady])

    // Pour fusionner les voters quand un nouveau arrive
    useEffect(() =>{ newVoter && setVoters([...voters, newVoter]) }, [newVoter])
    // Pour fusionner les proposals quand un nouveau arrive
    useEffect(() =>{
        newProposal && action.getOneProposal(newProposal).call({from : account})
                        .then(data => setProposals([...proposals, {label : data.description, count : 0}]))
    }, [newProposal])

    async function convertProposal(arr){
        const proposalLabels = []
        for (let id of arr) proposalLabels.push({
            label : (await action.getOneProposal(id).call({from : account})).description,
            count : 0
        })
        setProposals(proposalLabels)
        return proposalLabels
    }

    const minifyStr = (str) => {
        let temporary = str
        if (str) {
            temporary = `${str.slice(0,6)}...${str.slice(-4)}`
            temporary = temporary.toLowerCase()
        }
        return temporary
    }

    console.log(proposals)


    // ROUTING AND RENDER
    if (isReady) {
        let rule, component
        if (account === ownerAddress) rule = 'president'
        else if (voters.includes(account.toLowerCase())) rule = 'voter'
        else rule = 'lost'

        if (rule === 'voter'){
            switch (WORKFLOWSTATUS[workflow]){
                case ('RegisteringVoters') : component = <Waiting />; break;
                case ('ProposalsRegistrationStarted') : component = <VoterProposalsRegistration start={true} />; break;
                case ('ProposalsRegistrationEnded') : component = <VoterProposalsRegistration start={false} />; break;
                case ('VotingSessionStarted') : component = <VoterVotingSession start={true} />; break;
                case ('VotingSessionEnded') : component = <VoterVotingSession start={false} />; break;
                case ('VotesTallied') : component = <VotesTallied />; break;
                default : component = <div>Erreur</div>
            }
        }else if (rule === 'president'){
            switch (WORKFLOWSTATUS[workflow]){
                case ('RegisteringVoters') : component = <RegisteringVoters />; break;
                case ('ProposalsRegistrationStarted') : component = <PresidentProposalsRegistration start={true} />; break;
                case ('ProposalsRegistrationEnded') : component = <PresidentProposalsRegistration start={false} />; break;
                case ('VotingSessionStarted') : component = <PresidentrVotingSession start={true} />; break;
                case ('VotingSessionEnded') : component = <PresidentrVotingSession start={false} />; break;
                case ('VotesTallied') : component = <VotesTallied />; break;
                default : component = <div>Erreur</div>
            }
        }else {
            component = <Identification />
        }

        return (
            <>
                <header>
                    <p>{`Etape : ${workflow}`}</p>
                    <p>{`User : ${minifyStr(account)} | Rule : ${rule}`}</p>
                    <p>{`Owner : ${minifyStr(ownerAddress)}`}</p>
                </header>
                <main>
                    {component}
                </main>
            </>
        )
    }else{
        return (
            <main>
                <Identification />
            </main>
        )
    }
}

export default App
