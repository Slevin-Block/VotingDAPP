import { atom } from "recoil";

export const WORKFLOWSTATUS = [
        'RegisteringVoters',
        'ProposalsRegistrationStarted',
        'ProposalsRegistrationEnded',
        'VotingSessionStarted',
        'VotingSessionEnded',
        'VotesTallied'
    ]


export const Workflow  = atom({
    key: 'WorkflowStatus ',
    default : 3/* 0 */,
})
