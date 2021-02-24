const Factory = artifacts.require('UniswapV2Factory.sol');
const Router = artifacts.require('UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const Experts = artifacts.require('Experts.sol');
const Exchange = artifacts.require('Exchange.sol');
const Index2Swap = artifacts.require('Index2Swap.sol');
const IndexFactory = artifacts.require('IndexFactory.sol');
const IndexStorage = artifacts.require('IndexStorage.sol');
const IndexToken = artifacts.require('IndexToken.sol');
const Lstorage = artifacts.require('Lstorage.sol');
const OraclePrice = artifacts.require('OraclePrice.sol');
const OracleTotSupply = artifacts.require('OracleTotSupply.sol');
const OracleCircAmount = artifacts.require('OracleCircAmount.sol');
//const Faucet = artifacts.require('Faucet.sol');
//const UniswapV2Library = artifacts.require('./libraries/UniswapV2Library.sol');
const TransferHelper = artifacts.require('./libraries/TransferHelper.sol');

const tokens = require("../tokens.json");
const fs = require('fs');

module.exports = async function(deployer,_network, addresses) {
  console.log ("_network.network_id:", _network);
    const [admin,user1] = addresses;
//test of that is not tmux problem at all 
var weth, factory, router ;
  if (_network == "ropsten") {
     weth = await WETH.at('0xc778417e063141139fce010982780140aa0cd5ab');
     factory = await Factory.at ('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f');
     router = await Router.at('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');

  } else {

    await deployer.deploy(WETH);
     weth = await WETH.deployed();
    await deployer.deploy(Factory, user1);
     factory = await Factory.deployed();

    //  await deployer.deploy(UniswapV2Library);
    await deployer.deploy(TransferHelper);
   // deployer.link (UniswapV2Library, Router);
    deployer.link (TransferHelper, Router);
    await deployer.deploy(Router, factory.address, weth.address);
    console.log ("deploy router");
     router = await Router.deployed();
  }
  console.log("factory.address:", factory.address, "weth.address:", weth.address, "weth.address:", "router.address:", router.address );
    
  

   // 
    



   //console.log('piar of tokenA:',pairTokenA.tx, 'piar of tokenB:',pairTokenB.tx, 'piar of tokenC:',pairTokenC.tx, 'piar of tokenWBTC:',pairTokenD.tx, 'piar of cDAi:',pairTokenE.tx, 'piar of CUSDC:',pairTokenF.tx, ); 


  

    //await deployer.deploy(Faucet);
    //const faucet = await Faucet.deployed();
    await deployer.deploy(OraclePrice);
    const oracle_price = await OraclePrice.deployed();

    await deployer.deploy(OracleTotSupply);
    const oracle_tot_supply = await OracleTotSupply.deployed();

    await deployer.deploy(OracleCircAmount);
    const oracle_circ_amount = await OracleCircAmount.deployed();

    await deployer.deploy(Experts);
    const experts = await Experts.deployed();

    await deployer.deploy(Exchange);
    const exchanges = await Exchange.deployed();

//    await deployer.deploy(SvetToken, 'SVET token', 'SVET', 18);
  //  const SvetToken = await SvetToken.deployed();
    
    await deployer.deploy(Index2Swap);
    const index2swap = await Index2Swap.deployed();

    await deployer.deploy(IndexFactory);
    const index_factory = await IndexFactory.deployed();

    await deployer.deploy(IndexStorage);
    const index_storage = await IndexStorage.deployed();
;

    await deployer.deploy(Lstorage);
    const lstorage = await Lstorage.deployed(); 
    
    console.log('Add expert:',admin,' expert contract:',experts.address);
    await experts.addExpert(admin);
    console.log('OraclePrice setExpertsContr');
    await oracle_price.setExpertsContr(experts.address);
    console.log('OracleTotSupply setExpertsContr');
    await oracle_tot_supply.setExpertsContr(experts.address);
    console.log('OracleCircAmount setExpertsContr');
    await oracle_circ_amount.setExpertsContr(experts.address);
   
/*    console.log('add amount to oracle_circ');

    await oracle_circ_amount.addamount(tokenA.address,  web3.utils.toBN(1374417194));
    await oracle_circ_amount.addamount(tokenB.address,  web3.utils.toBN(189000000));
    await oracle_circ_amount.addamount(tokenC.address,  web3.utils.toBN(198046404));
    console.log('add amount to oracle supply');
    await oracle_tot_supply.addamount(tokenA.address,  web3.utils.toBN(2100000000));
    await oracle_tot_supply.addamount(tokenB.address,  web3.utils.toBN(210404983));
    await oracle_tot_supply.addamount(tokenC.address,  web3.utils.toBN(210451990));
    */
    await exchanges.setPriceOracle(oracle_price.address);  

  //  await SvetToken.transfer(admin, "10000000000000000000000");
    
    await index2swap.setSwap(router.address, 99, 30 ),
   // await index2swap.set(SvetToken.address, oracle_price.address, lstorage.address );
    await index_factory.setPriceOracle(oracle_price.address);
    await index_factory.setAmountOracle(oracle_circ_amount.address);
    await index_factory.setIndexStorage(index_storage.address);
    await index_factory.setTotSupply(oracle_tot_supply.address);
    // Lstorage
    await lstorage.setswap(index2swap.address);
    await index_storage.setFactory(index_factory.address);


/*
    await faucet.setToken(tokenA.address);
    await faucet.setToken(tokenB.address);
    await faucet.setToken(tokenC.address);

    await tokenA.transfer(faucet.address, "1000000000000000000000000");
    await tokenB.transfer(faucet.address, "1000000000000000000000000");
    await tokenC.transfer(faucet.address, "1000000000000000000000000");
*/
  //  console.log('tokenA',tokenA.address);
    console.log('add2Uniswap');
    //console.log('Faucet address:',faucet.address);
    console.log('Router address:',router.address);
    console.log('OraclePrice address:',oracle_price.address);
    console.log('WETH address:',weth.address);
    console.log('Factory address:',factory.address);

    /*
    const estimateGasAdd2Uniswap = await faucet.add2Uniswap.estimateGas(
        router.address,
        oracle_price.address,
        weth.address,
        factory.address,
        {from: admin, value: 100000000000}
    );
    console.log('estimateGas:',estimateGasAdd2Uniswap);
    */
    /*   const add2Uniswap = await faucet.add2Uniswap(
            router.address,
            oracle_price.address,
            weth.address,
            factory.address,
            {from: admin, value: 100000000000}
    );
    */
   



   if (_network == "ropsten") { 
    var embark4Contracts ={
      ropsten: {
          // order of connections the dapp should connect to
          dappConnection: [
        //    "$EMBARK",
        //    "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
       //     "ws://localhost:8546",
            "https://ropsten.infura.io/v3/753a98a2eb6c4d64918829f47d069440"
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
           //minimalContractSize: true,
          // filteredFields: [],
      
          deploy: {
            Experts: {
              address: experts.address,
              abiDefinition: experts.abi
            },
      
            Exchange: {
              address: exchanges.address,
              abiDefinition: exchanges.abi
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
              address: oracle_price.address,
              abiDefinition: oracle_price.abi
              
              },
            OracleCircAmount: {
              address: oracle_circ_amount.address,
              abiDefinition: oracle_circ_amount.abi
                
                },
            OracleTotSupply: {
              address: oracle_tot_supply.address,
              abiDefinition: oracle_tot_supply.abi
                  
                  },
      
            Index2Swap: {
              address: index2swap.address,
              abiDefinition: index2swap.abi 
                  
                  },
            IndexFactory: {
              address: index_factory.address,
              abiDefinition: index_factory.abi 
                  },
            Lstorage: {
              address: lstorage.address,
              abiDefinition: lstorage.abi 
                    },
      
            IndexStorage: {
              address: index_storage.address,
              abiDefinition: index_storage.abi  
          },
/*
            SVTtst: {
              address: SvetToken.address,
              abiDefinition: SvetToken.abi 
            },
            */
            Factory: {
              address: factory.address,
              abiDefinition: factory.abi 
            },
            Router: {
              address: router.address,
              abiDefinition: router.abi 

          },

          WETH: {
              address: weth.address,
              abiDefinition: weth.abi   
        }
    }
      }
    }

   }
      else {
    var embark4Contracts ={
        cloudflare: {
            // order of connections the dapp should connect to
            dappConnection: [
              "$EMBARK",
              "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
         //     "ws://localhost:8546",
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
             //minimalContractSize: true,
            // filteredFields: [],
        
            deploy: {
              Experts: {
                address: experts.address,
                abiDefinition: experts.abi
              },
        
              Exchange: {
                address: exchanges.address,
                abiDefinition: exchanges.abi
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
                address: oracle_price.address,
                abiDefinition: oracle_price.abi
                
                },
              OracleCircAmount: {
                address: oracle_circ_amount.address,
                abiDefinition: oracle_circ_amount.abi
                  
                  },
              OracleTotSupply: {
                address: oracle_tot_supply.address,
                abiDefinition: oracle_tot_supply.abi
                    
                    },
        
              Index2Swap: {
                address: index2swap.address,
                abiDefinition: index2swap.abi 
                    
                    },
              IndexFactory: {
                address: index_factory.address,
                abiDefinition: index_factory.abi 
                    },
              Lstorage: {
                address: lstorage.address,
                abiDefinition: lstorage.abi 
                      },
        
              IndexStorage: {
                address: index_storage.address,
                abiDefinition: index_storage.abi  
            },
/*
              SVTtst: {
                address: SvetToken.address,
                abiDefinition: SvetToken.abi 
              }, */
              Factory: {
                address: factory.address,
                abiDefinition: factory.abi 
              },
              Router: {
                address: router.address,
                abiDefinition: router.abi 

            },

            WETH: {
                address: weth.address,
                abiDefinition: weth.abi 

            }
          }
        
    }
  }
      }
    

    

    fs.writeFileSync("embark4Contracts.json", JSON.stringify(embark4Contracts));

  //  console.log(resultAddLiquidity);
    //console.log(add2Uniswap.receipt.logs[0].args.price);
    //console.log(add2Uniswap.receipt.logs.price);
    
};
