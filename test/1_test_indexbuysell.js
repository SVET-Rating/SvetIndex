const { assert } = require("console");

const Index2Swap = artifacts.require('Index2SwapEth.sol');
const IndexStorage = artifacts.require('IndexStorage.sol');
const IndexToken = artifacts.require('IndexToken.sol');
const contracts = require("../embark4Contracts.json");

netKey = "cloudflare"; //testing only on localchain


console.log("tests");

contract ("Index2swapEth", async accounts => {

    it ("1. Buy index 1", async () => { 
      const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2SwapEth"]["address"]);
      const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);
      const indexList = await indexstorage.indexList();
   // console.log(indexList);
      const index_token1 = await IndexToken.at(indexList[0].addr);
/*       const buyFee = await index2swap.buyFee();
      if (buyFee.toNumber() > 0) {
        //TODO add test  to check approve when buyfee > 0    
      } */
      
      const buyIndexforSvetEth = await index2swap.buyIndexforSvetEth(web3.utils.toWei('0.1','ether'),index_token1.address , "600", "90", {from:accounts[0], value: web3.utils.toWei('0.1','ether')});

    console.log("buyIndexforSvetEth", buyIndexforSvetEth.tx);
//    assert (false); //TODO add checks
    }) ,
    
    it ("2. Sell index 1", async () => { 
      const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2SwapEth"]["address"]);
      const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);
      const indexList = await indexstorage.indexList();
      const index_token1 = await IndexToken.at(indexList[0].addr);
      await index_token1.approve(index2swap.address,web3.utils.toWei('0.1','ether'));
      const sellIndexforSvet=await index2swap.sellIndexforEth(web3.utils.toWei('0.1','ether'),index_token1.address, "600", "90", {from:accounts[0]});
      console.log("sellIndexforSvet", sellIndexforSvet.tx);
  /*       const buyFee = await index2swap.buyFee();
      if (buyFee.toNumber() > 0) {
        //TODO add test  to check approve when buyfee > 0    
      } */

       
    })/* , 
    it ("3. Withdraw ether", async () => { 
      const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2SwapEth"]["address"]);
      const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);
      const indexList = await indexstorage.indexList();
      const index_token1 = await IndexToken.at(indexList[0].addr);

      
     // await index2swap.withdrEth4Svet(web3.utils.toWei('0.004','ether'), {from:accounts[0]});
       
    })  */
  })
 