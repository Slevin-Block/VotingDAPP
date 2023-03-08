const Voting = artifacts.require("./Voting.sol");
 module.exports = async function (deployer) {
    deployer.deploy(Voting);
    let instance = await Voting.deployed();
};
