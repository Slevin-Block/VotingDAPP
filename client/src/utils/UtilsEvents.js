import useEth from "../contexts/EthContext/useEth";


export const useUtilsEvents = () => {
  const { state: { contract } } = useEth()

  const eventVoterRegistered = async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  };

  const eventWorkflowStatusChange = async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  };

  const eventProposalRegistered = async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  };

  const eventVoted = async () => {
      await contract.getPastEvents('VoterRegistered',
        {
          fromBlock: 0,
        },
        (err, events) => {
          return events;
        });
  };
}