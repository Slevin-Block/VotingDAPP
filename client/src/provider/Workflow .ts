import { atom } from "recoil";
import { useRecoilState } from "recoil";

export enum  WORKFLOWSTATUS {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }


export const Workflow  = atom({
    key: 'WorkflowStatus ',
    default : WORKFLOWSTATUS.RegisteringVoters as WORKFLOWSTATUS,
})
