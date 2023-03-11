const Voting = artifacts.require("./Voting.sol");
 module.exports = async function (deployer) {
    deployer.deploy(Voting);
    await Voting.deployed();
};
