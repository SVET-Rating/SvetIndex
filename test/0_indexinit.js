import EmbarkJS from "../src/embarkArtifacts/embarkjs";
import {OraclePrice, OracleCircAmount, OracleTotSupply, Index2Swap, IndexFactory, Lstorage, IndexStorage}  from '../src/embarkArtifacts/contracts';
/*
const EmbarkJS = require('../src/embarkArtifacts/embarkjs');
const Faucet = require('EmbarkJS/contracts/Faucet');
const MockERC20 = require('EmbarkJS/contracts/MockERC20');
const IndexToken = require('EmbarkJS/contracts/IndexToken');
const OraclePrice = require('../src/embarkArtifacts/contracts/OraclePrice');
const OracleCircAmount = require('../src/embarkArtifacts/contracts/OracleCircAmount');
const OracleTotSupply = require('../src/embarkArtifacts/contracts/OracleTotSupply');
const IndexFactory = require('../src/embarkArtifacts/contracts/IndexFactory');
const Index2Swap = require('../src/embarkArtifacts/contracts/Index2Swap');
//const OraclePrice = require('EmbarkJS/contracts/OraclePrice');
//const OracleCircAmount = require('EmbarkJS/contracts/OracleCircAmount');
//const OracleTotSupply = require('EmbarkJS/contracts/OracleTotSupply');
//const IndexFactory = require('EmbarkJS/contracts/IndexFactory');
*/
EmbarkJS.onReady((error) => {
    if (error) {
      console.error('Error while connecting to web3', error);
      return;
    }

config({
    contractsTest: {
      deploy: {
        Faucet: {
            fromIndex: 0,
            args: [], 
            
            },
         
        MockERC20: { deploy: false,}, 
        Bytomtest: {
          instanceOf: 'MockERC20',
            fromIndex: 0,
            address: '0x8dF3b210283F08eC30da4e8fF8bf62981FbBef34'
        },
          
        Waytst: {
          instanceOf: 'MockERC20',
          fromIndex: 0,
          address: '0xb9e750aE9fD8B2f47e3523941C26669E4F67f84E'
  
          },
        Kybertst: {
          instanceOf: 'MockERC20',
          fromIndex: 0,
          address: '0x8736d5567DAF02CDcdB9890716bC28f363b8807a'
          },
        SVTtst: {
            instanceOf: 'MockERC20',
            fromIndex: 0,
            address: '0xa9e41acc99c837eA2eB7aE436C6B3Db95Db7bd48'
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
      
      afterDeploy: async ({contracts, web3, contractsTest, logger}) => {
        await Promise.all ([ 
            contractsTest.Faucet.methods.setToken(contractsTest.Bytomtest.options.address).send({from: web3.eth.defaultAccount}),
            contractsTest.Faucet.methods.setToken(contractsTest.Waytst.options.address).send({from: web3.eth.defaultAccount}),
            contractsTest.Faucet.methods.setToken(contractsTest.Kybertst.options.address).send({from: web3.eth.defaultAccount}),  
        //   contracts.Faucet.methods.setToken(contracts.SVTtst.options.address).send({from: web3.eth.defaultAccount}),        
         
            contractsTest.Bytomtest.methods.transfer(contractsTest.Faucet.options.address, "1000000000000000000000").send({from: web3.eth.defaultAccount}),
            contractsTest.Waytst.methods.transfer(contractsTest.Faucet.options.address, "1000000000000000000000").send({from: web3.eth.defaultAccount}),
            contractsTest.Kybertst.methods.transfer(contractsTest.Faucet.options.address, "1000000000000000000000").send({from: web3.eth.defaultAccount}),
            SVTtst.methods.transfer(Exchange.options.address, "10000000000000000000000").send({from: web3.eth.defaultAccount}),
            SVTtst.methods.transfer(web3.eth.defaultAccount, "10000000000000000000000").send({from: web3.eth.defaultAccount}),
            
            //price oracle 
            OraclePrice.methods.addPrice(contractsTest.Bytomtest.options.address, web3.utils.toBN(0.070325 * 10**18)).send({from: web3.eth.defaultAccount}),   
            OraclePrice.methods.addPrice(contractsTest.Waytst.options.address, web3.utils.toBN(0.241054 *10**18)).send({from: web3.eth.defaultAccount}),        
            OraclePrice.methods.addPrice(contractsTest.Kybertst.options.address,  web3.utils.toBN(0.941986 * 10**18)).send({from: web3.eth.defaultAccount}),
            OraclePrice.methods.addPrice(contractsTest.SVTtst.options.address,  web3.utils.toBN(0.5 * 10**18)).send({from: web3.eth.defaultAccount}),
         // circulation amount
            OracleCircAmount.methods.addamount(contractsTest.Bytomtest.options.address,  web3.utils.toBN(1374417194)).send({from: web3.eth.defaultAccount}),   
            OracleCircAmount.methods.addamount(contractsTest.Waytst.options.address,  web3.utils.toBN(189000000)).send({from: web3.eth.defaultAccount}),        
            OracleCircAmount.methods.addamount(contractsTest.Kybertst.options.address,  web3.utils.toBN(198046404)).send({from: web3.eth.defaultAccount}),
            // OracleTotSupply
            OracleTotSupply.methods.addamount(contractsTest.Bytomtest.options.address,  web3.utils.toBN(21000000)).send({from: web3.eth.defaultAccount}),   
            OracleTotSupply.methods.addamount(contractsTest.Waytst.options.address,  web3.utils.toBN(210451990)).send({from: web3.eth.defaultAccount}),        
            OracleTotSupply.methods.addamount(contractsTest.Kybertst.options.address,  web3.utils.toBN(210404983)).send({from: web3.eth.defaultAccount}),
        
          ]);
      }
    }
  });

   //inital for test

contract('IndexFactory', () => {
  
        it('should do something', async () => {
                   // init index SVET1
         
    await IndexFactory.methods.makeIndex(contractsTest.IndexToken.options.address,
        [contractsTest.Bytomtest.options.address,
            contractsTest.Waytst.options.address,  
            contractsTest.Kybertst.options.address]
        ).send({from: web3.eth.defaultAccount});
    await IndexFactory.methods.makeIndex(contractsTest.IndexToken2.options.address,
        [contractsTest.Waytst.options.address,  
            contractsTest.Kybertst.options.address]
        ).send({from: web3.eth.defaultAccount});
        
        });
      });

  
contract('Faucet', () => {
  
    it('should do something', async () => {
// 0x7C7698593eb574535ef5F89e7541A9FC2CfF9B37 router
// 0x4a81cff73f1b8c6d94f50EDC08A4DEe7fbC109C6 WETH
        await contractsTest.Faucet.methods.add2Uniswap(
        "0x7C7698593eb574535ef5F89e7541A9FC2CfF9B37", //router02
        contracts.OraclePrice.options.address,
        "0x4a81cff73f1b8c6d94f50EDC08A4DEe7fbC109C6", //weth addr
        "" //factory
        ).send({from: web3.eth.defaultAccount, value: "4000000000000000000"});


    });
  }); 


});