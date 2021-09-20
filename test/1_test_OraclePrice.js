const { assert } = require("console");

const Index2Swap = artifacts.require('Index2SwapEthMarket.sol');
const IndexStorage = artifacts.require('IndexStorage.sol');
const IndexToken = artifacts.require('IndexToken.sol');
const UniswapV2Router = artifacts.require('UniswapV2Router02.sol');
const contracts = require("../embark4Contracts.json");
const OraclePrice = artifacts.require('OraclePrice.sol');
const Erc20 = artifacts.require('TokTst.sol')

var  netKey = "pl";
//"cloudflare"; //testing only on localchain


console.log("tests");

contract ("OraclePrice", async accounts => {
  const indexAmount = "100000000000000000"; //0.1 eth 
                  //300000000000000000000
  
  

    it ("test price", async () => { 
      const oraclePriceAaddr = contracts[netKey]["deploy"]["OraclePrice"]["address"]
      const oraclePrice = await OraclePrice.at(oraclePriceAaddr);
      const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);

      const indexList = await indexstorage.indexList();
      const index_token1 = await IndexToken.at(indexList[0].addr);
      await oraclePrice.test(index_token1.address, indexAmount, true);
      await oraclePrice.test(index_token1.address, indexAmount, false);
      
     // await index2swap.withdrEth4Svet(web3.utils.toWei('0.004','ether'), {from:accounts[0]});
       
    })  
  })
 