// makeIndex
const MockERC20 = artifacts.require('SVTtst.sol');
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
if (_network == "ropsten" || _network == "mainnet" || _network == "ganache" || _network == "bsctest") {
     netKey = _network;
} else
{
     netKey = "cloudflare"
}



const index_factory = await IndexFactory.at(contracts[netKey]["deploy"]["IndexFactory"]["address"]);
//const exchanges = await Exchange.at(contracts[netKey]["deploy"]["Exchange"]["address"]);
const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2Swap"]["address"]);

if (_network != "ropsten" || _network != "mainnet") {
  console.log('create index token1');
await deployer.deploy(IndexToken,'Svet index 1', 'SVI1');
 const index_token1 = await IndexToken.deployed();
 const trIndex1 = await index_factory.makeIndex(index_token1.address,
          [tokens[netKey].Bytom.address,
          tokens[netKey].WaykiChain.address,
          tokens[netKey].Kyber.address], 
          [ 2624,
            3774,
            3601] ); //in shares 1/10000
console.log(trIndex1.tx);       

 //const index_token2 = await deployer.deploy(IndexToken,'Svet index 2', 'SVI2');
await deployer.deploy(IndexToken,'Svet index BTC-stable', 'SVI3');
const index_token3 = await IndexToken.deployed();
console.log('create index token3');

const trIndex3 = await index_factory.makeIndex(index_token3.address,
  [tokens[netKey].WBTC.address,
    tokens[netKey].cDAI.address,
    tokens[netKey].cUSDC.address,  ],
  [5000, 2500, 2500 ]); //in shares 1/10000
console.log(trIndex3.tx);
await deployer.deploy(IndexToken,'SVET Saving Index', 'SVI4');
const index_token4 = await IndexToken.deployed();

console.log('create index token4');
const trIndex4 = await index_factory.makeIndex(index_token4.address,
  [tokens[netKey].cDAI.address,
    tokens[netKey].cUSDC.address],
  [5000, 5000 ]); //in shares 1/10000
console.log(trIndex4.tx);
await deployer.deploy(IndexToken,'SVET Perspective Index', 'SVI5');
const index_token5 = await IndexToken.deployed();
/* console.log( index_token1.address,
  index_token2.address,
  index_token3.address,
  index_token4.address,
  index_token5.address );
console.log('create index token1'); */



console.log('create index token5');
const trIndex5 = await index_factory.makeIndex(index_token5.address,
   [tokens[netKey]["Polkastarter"]["address"],
    tokens[netKey]["Rarible"]["address"],
    tokens[netKey]["1INCH"]["address"],
    tokens[netKey]["Keep Network"]["address"],
    tokens[netKey]["Bondly"]["address"],
    tokens[netKey]["DuckDaoDime"]["address"],
    tokens[netKey]["Solana"]["address"],
    tokens[netKey]["PancakeSwap"]["address"],
    tokens[netKey]["Decentraland"]["address"], 
    tokens[netKey]["Trustswap"]["address"]
  ],
  [1000, 1000, 1000, 1000,1000, 1000,1000, 1000,1000, 1000]); //in shares 1/10000
console.log(trIndex5.tx);

console.log("testing work");
    await index2swap.buySvet4Eth({from:admin, value: web3.utils.toWei('0.01','ether')});
    
    const buyIndexforSvetEth = await index2swap.buyIndexforSvetEth(web3.utils.toWei('0.01','ether'),index_token1.address , {from:admin});
    console.log("buyIndexforSvetEth", buyIndexforSvetEth.tx);
    //sell
    await index_token1.approve(index2swap.address, web3.utils.toWei('0.01','ether'), {from:admin});
    const sellIndexforSvet=await index2swap.sellIndexforSvet(web3.utils.toWei('0.005','ether'),index_token1.address, {from:admin});
    console.log("sellIndexforSvet", sellIndexforSvet.tx);

    await index2swap.withdrEth4Svet(web3.utils.toWei('0.004','ether'), {from:admin});
  }
}