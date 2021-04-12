const embcontracts = require ('../embark4Contracts.json');
module.exports = embcontracts;
/*module.exports = {
  // default applies to all environments
  default: {
    // order of connections the dapp should connect to
    dappConnection: [
      "$EMBARK",
      "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8546",
      "http://localhost:8545"
    ],

    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    // dappAutoEnable: true,

    gas: "auto",

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
    //            contracts section.
    strategy: 'explicit',

    // minimalContractSize, when set to true, tells Embark to generate contract files without the heavy bytecodes
    // Using filteredFields lets you customize which field you want to filter out of the contract file (requires minimalContractSize: true)
     minimalContractSize: true,
    // filteredFields: [],

    deploy: {
      Experts: {
        fromIndex: 0,
        args: []
      },

      Exchange: {
        fromIndex: 0,
        args: [],

      },
   /*
      ExpertsRewards: {
        fromIndex: 0,
        args: [],
        onDeploy: async ({contracts, web3, logger}) => {
          await contracts.ExpertsRewards.methods.setExpertsContr(contracts.Experts.options.address).send({from: web3.eth.defaultAccount});

        }
      },


      OraclePrice: {
        fromIndex: 0,
        args: [], 
        
        },
      OracleCircAmount: {
          fromIndex: 0,
          args: [], 
          
          },
      OracleTotSupply: {
            fromIndex: 0,
            args: [], 
            
            },

      Index2Swap: {
            fromIndex: 0,
            args: [], 
            
            },
      IndexFactory: {
            fromIndex: 0,
            args: [], 
            },
      Lstorage: {
              fromIndex: 0,
              args: [], 
              },

      IndexStorage: {
              fromIndex: 0,
              args: [], 
              
              },
      MockERC20: { deploy: false,},
      
      SVTtst: {
              instanceOf: 'MockERC20',
              fromIndex: 0,
              args: ["SVTtst", "SVT", "210000000000000000000000"], 
                //address: '0x8736d5567DAF02CDcdB9890716bC28f363b8807a'
      }                

    },
      afterDeploy: async ({contracts, web3, logger}) => {

        await Promise.all ([ 

         contracts.Experts.methods.addExpert(web3.eth.defaultAccount).send({from: web3.eth.defaultAccount}),
         contracts.OraclePrice.methods.setExpertsContr(contracts.Experts.options.address).send({from: web3.eth.defaultAccount}),
    //     contracts.OraclePrice.methods.setExchange(contracts.Exchange.options.address).send({from: web3.eth.defaultAccount}),   
         contracts.OracleCircAmount.methods.setExpertsContr(contracts.Experts.options.address).send({from: web3.eth.defaultAccount}),
         contracts.OracleTotSupply.methods.setExpertsContr(contracts.Experts.options.address).send({from: web3.eth.defaultAccount}),
    //     contracts.OracleCircAmount.methods.setExchange(contracts.Exchange.options.address).send({from: web3.eth.defaultAccount}),   
          // TODO price scale x10000

         contracts.Exchange.methods.setBA(contracts.SVTtst.options.address).send({from: web3.eth.defaultAccount}),
         contracts.Exchange.methods.setPriceOracle(contracts.OraclePrice.options.address).send({from: web3.eth.defaultAccount}),

        // Index2Swap
         contracts.Index2Swap.setSwap ("0x7C7698593eb574535ef5F89e7541A9FC2CfF9B37", 99, 30 ),
         contracts.Index2Swap.set (contracts.SVTtst.options.address, contracts.OraclePrice.options.address, contracts.Lstorage.options.address ),

        // IndexFactory
         contracts.IndexFactory.methods.setPriceOracle(contracts.OraclePrice.options.address).send({from: web3.eth.defaultAccount}),
         contracts.IndexFactory.methods.setAmountOracle(contracts.OracleCircAmount.options.address).send({from: web3.eth.defaultAccount}),
         contracts.IndexFactory.methods.setIndexStorage(contracts.IndexStorage.options.address).send({from: web3.eth.defaultAccount}),
         contracts.IndexFactory.methods.setTotSupply(contracts.OracleTotSupply.options.address).send({from: web3.eth.defaultAccount}),

        // Lstorage
         contracts.Lstorage.methods.setswap(contracts.Index2Swap.options.address).send({from: web3.eth.defaultAccount}),
        //IndexStorage
         contracts.IndexStorage.methods.setFactory(contracts.IndexFactory.options.address).send({from: web3.eth.defaultAccount}),

        ]);

       

    }
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {},

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {},

  

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  // custom_name: {}
};
*/