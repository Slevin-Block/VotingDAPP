

const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const { MNEMONIC,
    GOERLIRPC, INFURA_ID,
    MUMBAIRPC, ALCHEMY_ID,
} = process.env
module.exports = {


    contracts_build_directory: "../client/src/contracts",
    networks: {
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
        goerli: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: {
                        phrase: `${MNEMONIC}`
                    },
                    providerOrUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
                }),
            network_id: 5
        },
        mumbai: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: {
                        phrase: `${MNEMONIC}`
                    },
                    providerOrUrl: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}`
                }),
            network_id: 80001
        },

    },

    mocha: {

    },
    

    compilers: {
        solc: {
            version: "0.8.17",
        }
    },
};
