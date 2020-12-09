module.exports = {
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
*/

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

      Faucet: {
          fromIndex: 0,
          args: [], 
          
          },
       
      TokTst: { deploy: false,}, //todo add totalsupply
      Bytomtest: {
        instanceOf: 'TokTst',
          fromIndex: 0,
          args: ["Bytom", "BTM", 18], 

      },
        
      Waytst: {
        instanceOf: 'TokTst',
        fromIndex: 0,
        args: ["WaykiChain", "WIC", 18], 

        },
      Kybertst: {
        instanceOf: 'TokTst',
        fromIndex: 0,
        args: ["KNC", "QUB", 18], 

        },
      SVTtst: {
          instanceOf: 'TokTst',
          fromIndex: 0,
          args: ["SVTtst", "SVT", 18], 
  
          },
      IndexToken: {
            fromIndex: 0,
            args: ["SvetIndex1", "SVI1"], 
            
          },
      IndexToken2: {
          instanceOf: 'IndexToken',

            fromIndex: 0,
            args: ["SvetIndex2", "SVI2"], 
            
          }
                
                       
    },
      afterDeploy: async ({contracts, web3, logger}) => {

        await Promise.all ([ 
         contracts.Faucet.methods.setToken(contracts.Bytomtest.options.address).send({from: web3.eth.defaultAccount}),
         contracts.Faucet.methods.setToken(contracts.Waytst.options.address).send({from: web3.eth.defaultAccount}),
         contracts.Faucet.methods.setToken(contracts.Kybertst.options.address).send({from: web3.eth.defaultAccount}),  
         contracts.Faucet.methods.setToken(contracts.SVTtst.options.address).send({from: web3.eth.defaultAccount}),        

         contracts.Experts.methods.addExpert(web3.eth.defaultAccount).send({from: web3.eth.defaultAccount}),
         contracts.OraclePrice.methods.setExpertsContr(contracts.Experts.options.address).send({from: web3.eth.defaultAccount}),
    //     contracts.OraclePrice.methods.setExchange(contracts.Exchange.options.address).send({from: web3.eth.defaultAccount}),   
         contracts.OracleCircAmount.methods.setExpertsContr(contracts.Experts.options.address).send({from: web3.eth.defaultAccount}),
         contracts.OracleTotSupply.methods.setExpertsContr(contracts.Experts.options.address).send({from: web3.eth.defaultAccount}),
    //     contracts.OracleCircAmount.methods.setExchange(contracts.Exchange.options.address).send({from: web3.eth.defaultAccount}),   
          // TODO price scale x10000
         contracts.OraclePrice.methods.addPrice(contracts.Bytomtest.options.address, web3.utils.toBN(0.070325 * 10**18)).send({from: web3.eth.defaultAccount}),   
         contracts.OraclePrice.methods.addPrice(contracts.Waytst.options.address, web3.utils.toBN(0.241054 *10**18)).send({from: web3.eth.defaultAccount}),        
         contracts.OraclePrice.methods.addPrice(contracts.Kybertst.options.address,  web3.utils.toBN(0.941986 * 10**18)).send({from: web3.eth.defaultAccount}),
         contracts.OraclePrice.methods.addPrice(contracts.SVTtst.options.address,  web3.utils.toBN(0.5 * 10**18)).send({from: web3.eth.defaultAccount}),
      // circulation amount
         contracts.OracleCircAmount.methods.addamount(contracts.Bytomtest.options.address,  web3.utils.toBN(1374417194)).send({from: web3.eth.defaultAccount}),   
         contracts.OracleCircAmount.methods.addamount(contracts.Waytst.options.address,  web3.utils.toBN(189000000)).send({from: web3.eth.defaultAccount}),        
         contracts.OracleCircAmount.methods.addamount(contracts.Kybertst.options.address,  web3.utils.toBN(198046404)).send({from: web3.eth.defaultAccount}),
         // OracleTotSupply
         contracts.OracleTotSupply.methods.addamount(contracts.Bytomtest.options.address,  web3.utils.toBN(21000000)).send({from: web3.eth.defaultAccount}),   
         contracts.OracleTotSupply.methods.addamount(contracts.Waytst.options.address,  web3.utils.toBN(210451990)).send({from: web3.eth.defaultAccount}),        
         contracts.OracleTotSupply.methods.addamount(contracts.Kybertst.options.address,  web3.utils.toBN(210404983)).send({from: web3.eth.defaultAccount}),


         contracts.Exchange.methods.setBA(contracts.SVTtst.options.address).send({from: web3.eth.defaultAccount}),
         contracts.Exchange.methods.setPriceOracle(contracts.OraclePrice.options.address).send({from: web3.eth.defaultAccount}),

         contracts.SVTtst.methods.transfer(contracts.Exchange.options.address, "10000000000000000000000").send({from: web3.eth.defaultAccount}),
         contracts.SVTtst.methods.transfer(web3.eth.defaultAccount, "10000000000000000000000").send({from: web3.eth.defaultAccount}),

        // Index2Swap
         contracts.Index2Swap.setSwap ("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", 99, 30 ),
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

         // init index SVET1
         
         await contracts.IndexFactory.methods.makeIndex(contracts.IndexToken.options.address,
                  [contracts.Bytomtest.options.address,
                  contracts.Waytst.options.address,  
                  contracts.Kybertst.options.address]
          ).send({from: web3.eth.defaultAccount});
          await contracts.IndexFactory.methods.makeIndex(contracts.IndexToken2.options.address,
            [contracts.Waytst.options.address,  
              contracts.Kybertst.options.address]
            
    ).send({from: web3.eth.defaultAccount});
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
