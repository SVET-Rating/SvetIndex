require('dotenv').config();
const PRIVATE_KEY = process.env.REACT_APP_WALLET_PRIVATE_KEY;
// This file contains only the basic configuration you need to run Embark's node
// For additional configurations, see: https://framework.embarklabs.io/docs/blockchain_configuration.html
module.exports = {
  // default applies to all environments
  default: {
    enabled: true,
    client: "geth" // Can be ganache-cli, geth or parity (default: geth)
  },

  development: {
    client: 'ganache-cli',
    clientConfig: {
      miningMode: 'dev' // Mode in which the node mines. Options: dev, auto, always, off
    }
  },

  privatenet: {
    // Accounts to use as node accounts
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    // For more account configurations, see: https://framework.embarklabs.io/docs/blockchain_accounts_configuration.html
    accounts: [
      {
        nodeAccounts: true, // Accounts use for the node
        numAddresses: "1", // Number of addresses/accounts (defaults to 1)
        password: "config/development/password" // Password file for the accounts
      }
    ],
    clientConfig: {
      datadir: ".embark/privatenet/datadir", // Data directory for the databases and keystore
      miningMode: 'auto',
      genesisBlock: "config/privatenet/genesis.json" // Genesis block to initiate on first creation of a development node
    }
  },

  privateparitynet: {
    client: "parity",
    genesisBlock: "config/privatenet/genesis-parity.json",
    datadir: ".embark/privatenet/datadir",
    miningMode: 'off'
  },

  ropsten: {
  // endpoint: "http://127.0.0.1:7545/",
    endpoint: "https://ropsten.infura.io/v3/6e8c03180136466e82539db7eae2ae42", // Endpoint of an node to connect to. Can be on localhost or on the internet
    // 6e8c03180136466e82539db7eae2ae42
    //753a98a2eb6c4d64918829f47d069440
    accounts: [
      {
        //privateKeyFile: "./testnet/password",
        privateKey:`${PRIVATE_KEY}` ,// process.env.privKey,
        //mnemonic: "YOUR_MNEMONIC",
        //hdpath: "m/44'/60'/0'/0/",
        //numAddresses: "1"
      }
    ]
  },


  cloudflare: {
    // fork mainnet
   
    // do:
    // npm install -g ganache-cli
    // ganache-cli -f https://cloudflare-eth.com/  -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -i 999 -u 0x9759A6Ac90977b93B58547b4A71c78317f391A28
  // to start:
  // https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/
    // OR
    //  ganache-cli -f https://ropsten.infura.io/v3/753a98a2eb6c4d64918829f47d069440  -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -i 999 -u 0x9759A6Ac90977b93B58547b4A71c78317f391A28
    // embark run --nodashboard  cloudflare

    endpoint: "http://127.0.0.1:8545", // Endpoint of an node to connect to. Can be on localhost or on the internet
    accounts: [
      {
        //privateKeyFile: "./testnet/password",
       // privateKey: "",// process.env.privKey,
        mnemonic: "clutch captain shoe salt awake harvest setup primary inmate ugly among become",
        hdpath: "m/44'/60'/0'/0/",
                   //m/44'/60'/0'/0/
        //numAddresses: "1"
      }
    ]
  },

  testnet: {
    networkType: "testnet", // Can be: testnet(ropsten), rinkeby, livenet or custom, in which case, it will use the specified networkId
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/testnet/password"
      }
    ]
  },

  livenet: {
    networkType: "livenet",
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/livenet/password"
      }
    ]
  },

  pl: {
     endpoint: "http://127.0.0.1:8555",
     // endpoint: "https://ropsten.infura.io/v3/6e8c03180136466e82539db7eae2ae42", // Endpoint of an node to connect to. Can be on localhost or on the internet
      // 6e8c03180136466e82539db7eae2ae42
      //753a98a2eb6c4d64918829f47d069440
      accounts: [
        {
          privateKey:`${PRIVATE_KEY}` ,// process.env.privKey,
        }
      ]
    },
  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
