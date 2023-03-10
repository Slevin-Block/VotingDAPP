import useEth from "./contexts/EthContext/useEth";
const { state: { contract, accounts } } = useEth()

const addVoter = async (address) => {
    if (!web3.utils.isAddress(address)) {
        return false
    }

    try{
        await contract.methods.addVoter(address).send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const addProposal = async (proposalDescription) => {
    if (proposalDescription=="") {
        return false
    }

    try{
        await contract.methods.addProposal(proposalDescription).send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const setVote = async (proposalId) => {
    if (proposalId<1) {
        return false
    }

    try{
        await contract.methods.setVote(proposalId).send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const startProposalsRegistering = async () => {
    try{
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const endProposalsRegistering = async () => {
    try{
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const startVotingSession = async () => {
    try{
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const endVotingSession = async () => {
    try{
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const tallyVotes = async () => {
    try{
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        return true
    }catch(err){
        return false
    }
};

const getWinner = async () => {
    try{
        return contract.methods.winningProposalID().call({ from: accounts[0] });
    }catch(err){
        return 0
    }
};