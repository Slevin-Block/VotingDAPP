import { useRecoilState,useRecoilValue } from 'recoil';
import { OwnerAddress, UserAddress,UserRule } from './provider/User';
import { Workflow, WORKFLOWSTATUS } from './provider/Workflow ';
import Waiting from './components/Pages/Voter/0_Waiting/Waiting';
import VoterProposalsRegistration from './components/Pages/Voter/1_ProposalsRegistration/ProposalsRegistration';
import VoterVotingSession from './components/Pages/Voter/2_VotingSession/VotingSession';
import PresidentProposalsRegistration from './components/Pages/President/1_ProposalsRegistration/ProposalsRegistration';
import PresidentrVotingSession from './components/Pages/President/2_VotingSession/VotingSession';
import VotesTallied from './components/Pages/VotesTallied';
import RegisteringVoters from './components/Pages/President/0_RegisteringVoters/RegisteringVoters';
import Identification from './components/Pages/Identification';
import ControlPanel from './components/Blocs/ContolPanel/ControlPanel';
import { useEffect } from "react";
import useEth from "./contexts/EthContext/useEth";

function App() {

    const { state: { contract, accounts } } = useEth()
    const [ownerAddress, setOwnerAddress] = useRecoilState(OwnerAddress)
    const [address, setAddress] = useRecoilState(UserAddress)
    const LoadAddress = async () => {
        let owner = await contract.methods.owner().call({ from: accounts[0] })
        setOwnerAddress(owner)
        setAddress(accounts[0])
    }
  
    useEffect(() => {
        if (contract?.methods) {
            LoadAddress();
        }
    });

    const rule = useRecoilValue(UserRule)
    const workFlowStatus = useRecoilValue(Workflow)
    let component;
    if (rule === 'voter'){
        switch (WORKFLOWSTATUS[workFlowStatus]){
            case ('RegisteringVoters') : component = <Waiting />; break;
            case ('ProposalsRegistrationStarted') : component = <VoterProposalsRegistration start={true} />; break;
            case ('ProposalsRegistrationEnded') : component = <VoterProposalsRegistration start={false} />; break;
            case ('VotingSessionStarted') : component = <VoterVotingSession start={true} />; break;
            case ('VotingSessionEnded') : component = <VoterVotingSession start={false} />; break;
            case ('VotesTallied') : component = <VotesTallied />; break;
            default : component = <div>Erreur</div>
        }
    }else if (rule === 'president'){
        switch (WORKFLOWSTATUS[workFlowStatus]){
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
        <main>
            <ControlPanel/>
            {component}
        </main>
    )
}

export default App
