// makeIndex
const MockERC20 = artifacts.require('MockERC20.sol');
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
const tokens = require ("../tokens.json");
const contracts = require("../embark4Contracts.json");
const fs = require('fs');


module.exports = async function(deployer,_network, addresses) {

const admin = addresses[0];

var netkey ;
if (_network == "ropsten" || _network == "mainnet" ) {
     netKey = _network;
} else
{
     netKey = "cloudflare"
}



const index_factory = await IndexFactory.at(contracts[netKey]["deploy"]["IndexFactory"]["address"]);
const exchanges = await Exchange.at(contracts[netKey]["deploy"]["Exchange"]["address"]);
const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2Swap"]["address"]);

const SvetToken = await MockERC20.at(tokens.SvetToken.address);
await exchanges.setBA(tokens.SvetToken.address);
await SvetToken.transfer(index2swap.address, web3.utils.toWei("20000", "ether"));
await index2swap.set(tokens.SvetToken.address, contracts[netKey]["deploy"] ["OraclePrice"]["address"], contracts[netKey]["deploy"] ["Lstorage"]["address"]);

const index_token1 = await IndexToken.new('Svet index 1', 'SVI1');
const index_token2 = await IndexToken.new('Svet index 2', 'SVI2');
const index_token3 = await IndexToken.new('Svet index BTC-stable', 'SVI3');
const index_token4 = await IndexToken.new('SVET Saving Index', 'SVI4');
const index_token5 = await IndexToken.new('SVET Perspective Index', 'SVI5')

console.log('create index token1');
const trIndex1 = await index_factory.makeIndex(index_token1.address,
          [tokens.Bytom.address,
          tokens.WaykiChain.address,
          tokens.Kyber.address], 
          [ 2624,
            3774,
            3601] ); //in shares 1/10000
console.log(trIndex1.tx);              
console.log('create index token2');
/*
const trIndex3 = await index_factory.makeIndex(index_token3.address,
  [wBTC.address,
  cDAI.address,
  cUSDC.address,  ],
  [5000, 2500, 2500 ]); //in shares 1/10000
console.log(trIndex3.tx);

const trIndex4 = await index_factory.makeIndex(index_token4.address,
  [cDAI.address,
    cUSDC.address],
  [5000, 5000 ]); //in shares 1/10000
console.log(trIndex4.tx);

const trIndex5 = await index_factory.makeIndex(index_token5.address,
  [POLS.address,
    RARI.address,
    INCH.address,
    KEEP.address,
    Bondly.address,
    DDIM.address,
    SOL.address,
    CAKE.address,
    MANA.address, 
    SWAP.address],
  [1000, 1000, 1000, 1000,1000, 1000,1000, 1000,1000, 1000]); //in shares 1/10000
console.log(trIndex5.tx);
*/
if (_network != "ropsten") {
    await index2swap.buySvet4Eth({from:admin, value: web3.utils.toWei('0.01','ether')});
    await SvetToken.approve(index2swap.address, web3.utils.toWei('0.02','ether'), {from:admin});
    const buyIndexforSvetEth = await index2swap.buyIndexforSvetEth(web3.utils.toWei('0.01','ether'),index_token1.address , {from:admin});
    console.log("buyIndexforSvetEth", buyIndexforSvetEth.tx);
    //sell
    await index_token1.approve(index2swap.address, web3.utils.toWei('0.01','ether'), {from:admin});
  //  const sellIndexforSvet=await index2swap.sellIndexforSvet(web3.utils.toWei('0.005','ether'),index_token1.address, {from:admin});
 //   console.log("sellIndexforSvet", sellIndexforSvet.tx);

  //  await index2swap.withdrEth4Svet(web3.utils.toWei('0.004','ether'), {from:admin});
  }
}