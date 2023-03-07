import { useRecoilValue } from 'recoil';
import { User } from './provider/User';
import { Workflow, WORKFLOWSTATUS } from './provider/Workflow ';
import Waiting from './components/Pages/Voter/0_Waiting/Waiting';
import VoterProposalsRegistration from './components/Pages/Voter/1_ProposalsRegistration/ProposalsRegistration';
import VoterVotingSession from './components/Pages/Voter/2_VotingSession/VotingSession';
import PresidentProposalsRegistration from './components/Pages/President/1_ProposalsRegistration/ProposalsRegistration';
import PresidentrVotingSession from './components/Pages/President/2_VotingSession/VotingSession';
import VotesTallied from './components/Pages/VotesTallied';
import RegisteringVoters from './components/Pages/President/0_RegisteringVoters/RegisteringVoters';
import Identification from './components/Pages/Identification';
import ControlPanel from './components/Organisms/ContolPanel/ControlPanel';


function App() {

    const userType = useRecoilValue(User)
    const workFlowStatus = useRecoilValue(Workflow)
    let component;
    if (userType === "voter"){
        switch (WORKFLOWSTATUS[workFlowStatus]){
            case ('RegisteringVoters') : component = <Waiting />; break;
            case ('ProposalsRegistrationStarted') : component = <VoterProposalsRegistration start={true} />; break;
            case ('ProposalsRegistrationEnded') : component = <VoterProposalsRegistration start={false} />; break;
            case ('VotingSessionStarted') : component = <VoterVotingSession start={true} />; break;
            case ('VotingSessionEnded') : component = <VoterVotingSession start={false} />; break;
            case ('VotesTallied') : component = <VotesTallied />; break;
            default : component = <div>Erreur</div>
        }
    }else if (userType === "president"){
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
