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
import { useState, useEffect } from "react";
import useEth from "./contexts/EthContext/useEth";
import Loading from './components/Pages/Loading';
import {useUtilsEvents} from './utils/UtilsEvents'
import { Voters } from './provider/Voters';

function App() {

    const { state: { contract, accounts } } = useEth()
    const [ownerAddress, setOwnerAddress] = useRecoilState(OwnerAddress)
    const [workflow, setWorkflow] = useRecoilState(Workflow)
    const [userAddress, setUserAddress] = useRecoilState(UserAddress)
    const [voters, setVoters] = useRecoilState(Voters)
    const rule = useRecoilValue(UserRule)
    const [newVoter, setNewVoter] = useState('')
    const {eventVoterRegistered} = useUtilsEvents();
    
    // Load Owner Address and Current Address
    useEffect(() => {
        if (contract?.methods && accounts[0]){
            // Load Current USer
            setUserAddress(accounts[0].toLowerCase())

            // Load contract owner 
            if (ownerAddress === null){
                (async()=>{
                    const owner = await contract.methods.owner().call({ from: accounts[0] })
                    setOwnerAddress(owner.toLowerCase())
                })()
            }
        }
    }, [contract, accounts])


    // Monitoring changes in status
    useEffect(() => {
        if (contract?.methods){
            (async()=>{
                const res = await contract.methods.workflowStatus().call({from : accounts[0]})
                setWorkflow(res)

                await contract.events.WorkflowStatusChange({fromBlock:"earliest"})
                    .on('data', data => {
                        console.log(data)
                        setWorkflow(data.returnValues.newStatus)} )          
                    .on('changed', changed => console.log('changed', changed))
                    .on('error', err => console.log('err', err))
                    .on('connected', str => console.log('connected', str))
                    
            })()
        }
    }, [contract, accounts])


    // Voters added
    useEffect(() => {
        if (contract?.methods){
            (async()=>{
                console.log(voters)
                if (voters.length === 0){
                    const res = await contract.getPastEvents('VoterRegistered', { fromBlock: 0, toBlock: 'latest' })
                    setVoters(res.map(voter => voter.returnValues.voterAddress.toLowerCase()))
                
                    await contract.events.VoterRegistered({fromBlock:"earliest"})
                        .on('data', data => setNewVoter(data.returnValues.voterAddress.toLowerCase()))          
                        .on('changed', changed => console.log('changed', changed))
                        .on('error', err => console.log('err', err))
                        .on('connected', str => console.log('connected', str))
                }

                if (newVoter !== '') setVoters([...voters, newVoter])

            })()
        }
    }, [contract, accounts, newVoter])




    let component;

    
    if (workflow === null) component = <Loading />
    else{
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
    }

    console.log("Every voter : ", voters)

    return (
        <>
            <header>
                <p>{`Etape : ${workflow}`}</p>
                <p>{`User : ${userAddress} | Rule : ${rule}`}</p>
            </header>
            <main>
                {/* <ControlPanel/> */}
                {component}
            </main>
        </>
    )
}

export default App
