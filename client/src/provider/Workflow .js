import { atom } from "recoil";

export const WORKFLOWSTATUS = [
        'RegisteringVoters',
        'ProposalsRegistrationStarted',
        'ProposalsRegistrationEnded',
        'VotingSessionStarted',
        'VotingSessionEnded',
        'VotesTallied'
    ]


export const Workflow = atom({
    key: 'Workflow ',
    default : 0,
})
