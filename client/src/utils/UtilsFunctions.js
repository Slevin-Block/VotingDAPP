import useEth from "../contexts/EthContext/useEth";

const { state: { contract, accounts,web3 } } = useEth()

export const useUtilsFunctions = {


    addVoter : async (address) => {
        if (!web3.utils.isAddress(address)) {
            return false
        }

        try{
            await contract.methods.addVoter(address).send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    addProposal : async (proposalDescription) => {
        if (proposalDescription==="") {
            return false
        }

        try{
            await contract.methods.addProposal(proposalDescription).send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    setVote : async (proposalId) => {
        if (proposalId<1) {
            return false
        }

        try{
            await contract.methods.setVote(proposalId).send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    startProposalsRegistering : async () => {
        try{
            await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    endProposalsRegistering : async () => {
        try{
            await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    startVotingSession : async () => {
        try{
            await contract.methods.startVotingSession().send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    endVotingSession : async () => {
        try{
            await contract.methods.endVotingSession().send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    tallyVotes : async () => {
        try{
            await contract.methods.tallyVotes().send({ from: accounts[0] });
            return true
        }catch(err){
            return false
        }
    },

    getWinner : async () => {
        try{
            return contract.methods.winningProposalID().call({ from: accounts[0] });
        }catch(err){
            return 0
        }
    },
}