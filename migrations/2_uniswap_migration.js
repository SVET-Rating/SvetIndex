const Factory = artifacts.require('UniswapV2Factory.sol');
const Router = artifacts.require('UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
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
    const tokenA = await MockERC20.new('Bytom','BTM',web3.utils.toWei('100000000000','ether'));
    const tokenB = await MockERC20.new('WaykiChain', 'WIC', web3.utils.toWei('10000000000','ether'));
    const tokenC = await MockERC20.new('Kyber','KNC',web3.utils.toWei('100000000000','ether'));
    const SvetToken = await MockERC20.new('SveT','SVT',web3.utils.toWei('21000000','ether'));;
    console.log ("tokenA, tokenB, tokenC, SveT: ", tokenA.address, tokenB.address, tokenC.address, SvetToken.address);


    
    const pairTokenA = await factory.createPair(weth.address, tokenA.address);
    const pairTokenB  = await factory.createPair(weth.address, tokenB.address);
    const pairTokenC = await factory.createPair(weth.address, tokenC.address);
   console.log('piar of tokenA:',pairTokenA.tx, 'piar of tokenB:',pairTokenB.tx, 'piar of tokenC:',pairTokenC.tx); 

  

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

    const index_token1 = await IndexToken.new('Svet index 1', 'SVI1');
    const index_token2 = await IndexToken.new('Svet index 2', 'SVI2');

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
    const tAprice = "0.070325";
    const tBprice = "0.241054";
    const tCprice = "0.941986";
    const tEthprice = "1000";
    console.log('addPrice to OraclePrice - tokenA');
    await oracle_price.addPrice(tokenA.address, web3.utils.toWei(tAprice, "ether"));
    console.log('addPrice to OraclePrice - tokenB');
    await oracle_price.addPrice(tokenB.address, web3.utils.toWei(tBprice, "ether"));
    console.log('addPrice to OraclePrice - tokenC');
    await oracle_price.addPrice(tokenC.address, web3.utils.toWei(tCprice, "ether"));
    console.log('addPrice to OraclePrice - SvetToken');
    await oracle_price.addPrice(SvetToken.address, web3.utils.toWei("0.5", "ether"));
    console.log('addPrice to OraclePrice - WETH token');
    await oracle_price.addPrice(weth.address, web3.utils.toWei(tEthprice, "ether"));
    console.log('add amount to oracle_circ');
/*
    await oracle_circ_amount.addamount(tokenA.address,  web3.utils.toBN(1374417194));
    await oracle_circ_amount.addamount(tokenB.address,  web3.utils.toBN(189000000));
    await oracle_circ_amount.addamount(tokenC.address,  web3.utils.toBN(198046404));
    console.log('add amount to oracle supply');
    await oracle_tot_supply.addamount(tokenA.address,  web3.utils.toBN(2100000000));
    await oracle_tot_supply.addamount(tokenB.address,  web3.utils.toBN(210404983));
    await oracle_tot_supply.addamount(tokenC.address,  web3.utils.toBN(210451990));
    */
    await exchanges.setBA(SvetToken.address);
    await exchanges.setPriceOracle(oracle_price.address);  

    await SvetToken.transfer(index2swap.address, web3.utils.toWei("2000", "ether"));
  //  await SvetToken.transfer(admin, "10000000000000000000000");
    
    await index2swap.setSwap(router.address, 99, 30 ),
    await index2swap.set(SvetToken.address, oracle_price.address, lstorage.address );
    await index_factory.setPriceOracle(oracle_price.address);
    await index_factory.setAmountOracle(oracle_circ_amount.address);
    await index_factory.setIndexStorage(index_storage.address);
    await index_factory.setTotSupply(oracle_tot_supply.address);
    // Lstorage
    await lstorage.setswap(index2swap.address);
    await index_storage.setFactory(index_factory.address);
    console.log('create index token1');
    const trIndex1 = await index_factory.makeIndex(index_token1.address,
              [tokenA.address,
              tokenB.address,
              tokenC.address], 
              [ 2624,
                3774,
                3601] ); //in shares 1/10000
    console.log(trIndex1.tx);              
    console.log('create index token2');
    const trIndex2 = await index_factory.makeIndex(index_token2.address,
              [tokenA.address,
              tokenC.address],
              [4216, 5784 ]); //in shares 1/10000
    console.log(trIndex2.tx);
/*
    await faucet.setToken(tokenA.address);
    await faucet.setToken(tokenB.address);
    await faucet.setToken(tokenC.address);

    await tokenA.transfer(faucet.address, "1000000000000000000000000");
    await tokenB.transfer(faucet.address, "1000000000000000000000000");
    await tokenC.transfer(faucet.address, "1000000000000000000000000");
*/
    console.log('tokenA',tokenA.address);
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
    console.log('Approve tokens for UniswapV2Router02');
    var tx
    var tx = await tokenA.approve(router.address, web3.utils.toWei('100000','ether'));
    console.log ("tokenA.approve tx.tx: ", tx.tx);
    tx =  await tokenB.approve(router.address, web3.utils.toWei('100000','ether'));
    console.log ("tokenb.approve tx.tx: ", tx.tx);
    tx =  await tokenC.approve(router.address, web3.utils.toWei('100000','ether'));
    console.log ("tokenc.approve tx.tx: ", tx.tx);
    console.log('Add liquidityETH');
    

    //console.log('min ether:',web3.utils.toWei('1','ether'));
    
    tx = await router.addLiquidityETH(tokenA.address,
                                 web3.utils.toWei("1421", "ether"),
                                 web3.utils.toWei("1421", "ether"),
                                 web3.utils.toWei("0.1", "ether"),
                                 admin,
                                 Math.round(Date.now()/1000)+100*60,
                            {from:admin, value: web3.utils.toWei('0.1','ether')});
  console.log ("addLiquidityETH tokenA. tx.tx: ", tx.tx);
  tx =  await router.addLiquidityETH(tokenB.address,
                                web3.utils.toWei("106", "ether"),
                                web3.utils.toWei("106", "ether"),
                                web3.utils.toWei("0.1", "ether"),
                                admin,
                                Math.round(Date.now()/1000)+100*60,
                            {from:admin, value: web3.utils.toWei('0.1','ether')});
    console.log ("addLiquidityETHtokenB tx.tx: ", tx.tx);
  tx =  await router.addLiquidityETH(tokenC.address,
                                web3.utils.toWei("414", "ether"),
                                web3.utils.toWei("414", "ether"),
                                web3.utils.toWei("0.1", "ether"),
                                admin,
                                Math.round(Date.now()/1000)+100*60,
                            {from:admin, value: web3.utils.toWei('0.1','ether')});
  console.log ("addLiquidityETH tokenC tx.tx: ", tx.tx);                        

if (_network != "ropsten") {
    await index2swap.buySvet4Eth({from:admin, value: web3.utils.toWei('0.01','ether')});
    await SvetToken.approve(index2swap.address, web3.utils.toWei('0.02','ether'), {from:admin});
    const buyIndexforSvetEth = await index2swap.buyIndexforSvetEth(web3.utils.toWei('0.01','ether'),index_token1.address , {from:admin});
    console.log("buyIndexforSvetEth", buyIndexforSvetEth.tx);
    //sell
    await index_token1.approve(index2swap.address, web3.utils.toWei('0.01','ether'), {from:admin});
    const sellIndexforSvet=await index2swap.sellIndexforSvet(web3.utils.toWei('0.005','ether'),index_token1.address, {from:admin});
    console.log("sellIndexforSvet", sellIndexforSvet.tx);

    await index2swap.withdrEth4Svet(web3.utils.toWei('0.004','ether'), {from:admin});
  }
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

            SVTtst: {
              address: SvetToken.address,
              abiDefinition: SvetToken.abi 
            }                
      
          }
          
        }
      
  };
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

              SVTtst: {
                address: SvetToken.address,
                abiDefinition: SvetToken.abi 
              }                
        
            }
            
          }
        
    };
  }

    

    fs = require('fs');

    fs.writeFileSync("embark4Contracts.json", JSON.stringify(embark4Contracts));

  //  console.log(resultAddLiquidity);
    //console.log(add2Uniswap.receipt.logs[0].args.price);
    //console.log(add2Uniswap.receipt.logs.price);
    
};
