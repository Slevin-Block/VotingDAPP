import useEth from "../contexts/EthContext/useEth";

const { state: { contract } } = useEth()

export const useUtilsEvents = {

  eventVoterRegistered : async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  },

  eventWorkflowStatusChange : async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  },

  eventProposalRegistered : async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  },

  eventVoted : async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  },
}