const { assert } = require("console");

const Index2Swap = artifacts.require('Index2SwapEthMarket.sol');
const IndexStorage = artifacts.require('IndexStorage.sol');
const IndexToken = artifacts.require('IndexToken.sol');
const contracts = require("../embark4Contracts.json");
const OraclePrice = artifacts.require('OraclePrice.sol');
const Erc20 = artifacts.require('TokTst.sol')

var  netKey;
//"cloudflare"; //testing only on localchain


console.log("tests");

contract ("Index2SwapEthMarket", async accounts => {
  var amountEth =0;
  const indexAmount = 0.1;
  
  
    it ("1. Buy index 1", async () => { 
      await web3.eth.net.getNetworkType((netw) => {
      switch  (netw) {
        case 3:  
          netKey = 'ropsten';
          break;
        case 137:  
          netKey = 'pl';
          break;
        default:
          netKey = 'cloudflare';
      }})
      console.log('netKey:', netKey);
      
      const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2SwapEthMarket"]["address"]);
      const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);
      const indexList = await indexstorage.indexList();
   // console.log(indexList);
      const index_token1 = await IndexToken.at(indexList[0].addr);
      // const buyFee = await index2swap.buyFee();
      // if (buyFee.toNumber() > 0) {
      //   //TODO add test  to check approve when buyfee > 0    
      // }
      const oraclePriceAaddr = contracts[netKey]["deploy"]["OraclePrice"]["address"]
      const oraclePrice = await OraclePrice.at(oraclePriceAaddr);
      var priceIndexTot = 0;
      // calculation in ethers !!
       const actList = await index_token1.getActivesList();
      for (var i  in  actList) {
                   
            const act  = await index_token1.getActivesItem(i);
            
            const price = web3.utils.fromWei(await oraclePrice.getLastPrice(act.addr), 'ether')
            const amount = web3.utils.fromWei(act.amount, 'ether')
           // console.log ("amount:",amount , "price:", price ,  amount * price);
             // oracle in ether
            priceIndexTot = priceIndexTot + amount * price ;   
           // console.log ("priceIndexTot:", priceIndexTot);
   

      } 
      console.log ("priceIndexTot:", priceIndexTot);
       ;
      amountEth = indexAmount * priceIndexTot;
  //    console.log ("amountEth: ", amountEth)
      amountEth =  amountEth.toFixed(18)
  //    console.log ("amountEth: ", amountEth)
      amountEth = web3.utils.toWei(amountEth,'ether')
  //    console.log ("amountEth: ", amountEth)
      const buyIndexforSvetEth = await index2swap.buyIndexforSvetEth(web3.utils.toWei(indexAmount.toString(),'ether'),index_token1.address , "600", "90", {from:accounts[0], value: amountEth}); //

      console.log("buyIndexforSvetEth", buyIndexforSvetEth.tx);
//    assert (false); //TODO add checks

      for (var i  in  actList) {
                        
        const act  = await index_token1.getActivesItem(i);
        
        const amount = web3.utils.fromWei(act.amount, 'ether')
        
        const token = await Erc20.at(act.addr);
        const bougthAmount = await token.balanceOf(contracts[netKey]["deploy"] ["Index2SwapEthMarket"]["address"]);
       // console.log ("bougthAmount:", bougthAmount)
        assert (amount * indexAmount ==  web3.utils.fromWei(bougthAmount, 'ether'), "Not right amounts: " + amount * indexAmount +"<>" +  web3.utils.fromWei(bougthAmount, 'ether'));
        
        } 

        const indbougthAmount = await  index_token1.balanceOf(accounts[0]);
        assert (indexAmount == web3.utils.fromWei(indbougthAmount, 'ether'), "Not right index amounts: " +indexAmount + "<>" +  web3.utils.fromWei(indbougthAmount, 'ether'));

    }) ,
    
    it ("2. Sell index 1", async () => { 
      const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2SwapEthMarket"]["address"]);
      const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);
      const indexList = await indexstorage.indexList();
      const index_token1 = await IndexToken.at(indexList[0].addr);
      await index_token1.approve(index2swap.address,web3.utils.toWei('0.1','ether'),{from:accounts[0]});
      const sellIndexforSvet=await index2swap.sellIndexforEth(web3.utils.toWei('0.1','ether'),index_token1.address, "600", "90", {from:accounts[0]});
      console.log("sellIndexforSvet", sellIndexforSvet.tx);

      const actList = await index_token1.getActivesList();
      for (var i  in  actList) {
                        
        const act  = await index_token1.getActivesItem(i);
        
        const amount = web3.utils.fromWei(act.amount, 'ether')
        
        const token = await Erc20.at(act.addr);
        const bougthAmount = await token.balanceOf(contracts[netKey]["deploy"] ["Index2SwapEthMarket"]["address"]);
       // console.log ("bougthAmount:", bougthAmount)
        assert (0  ==  web3.utils.fromWei(bougthAmount, 'ether'), "Not right amounts: " + 0 +"<>" +  web3.utils.fromWei(bougthAmount, 'ether'));
        
        } 
        const indbougthAmount = await  index_token1.balanceOf(accounts[0]);
        assert (0 == web3.utils.fromWei(indbougthAmount, 'ether'), "Not right index amounts: " + 0  + "<>" +  web3.utils.fromWei(indbougthAmount, 'ether'));
      //   const buyFee = await index2swap.buyFee();
      // if (buyFee.toNumber() > 0) {
      //   //TODO add test  to check approve when buyfee > 0    
      // }

       
    }) , 
    it ("test price", async () => { 
      const oraclePriceAaddr = contracts[netKey]["deploy"]["OraclePrice"]["address"]
      const oraclePrice = await OraclePrice.at(oraclePriceAaddr);
      const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);

      const indexList = await indexstorage.indexList();
      const index_token1 = await IndexToken.at(indexList[0].addr);
      await oraclePrice.test(index_token1.address, "1000000000000000", true);
      await oraclePrice.test(index_token1.address, "1000000000000000", false);
      
     // await index2swap.withdrEth4Svet(web3.utils.toWei('0.004','ether'), {from:accounts[0]});
       
    })  
  })
 