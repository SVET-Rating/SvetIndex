// makeIndex
const MockERC20 = artifacts.require('SVTtst.sol');
const Factory = artifacts.require('UniswapV2Factory.sol');
const Router = artifacts.require('UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const Experts = artifacts.require('Experts.sol');
// const Exchange = artifacts.require('Exchange.sol');
const Index2Swap = artifacts.require('Index2SwapEthMarket.sol');
const IndexFactory = artifacts.require('IndexFactory.sol');
const IndexStorage = artifacts.require('IndexStorage.sol');
const IndexToken = artifacts.require('IndexToken.sol');
const Lstorage = artifacts.require('Lstorage.sol');
const OraclePrice = artifacts.require('OraclePrice.sol');
// const OracleTotSupply = artifacts.require('OracleTotSupply.sol');
// const OracleCircAmount = artifacts.require('OracleCircAmount.sol');
const tokens = require ("../tokens.json");
const contracts = require("../embark4Contracts.json");
const fs = require('fs');


module.exports = async function(deployer,_network, addresses) {

const admin = addresses[0];

var netkey ;
if (_network == "ropsten" || _network == "mainnet" || _network == "ganache" || _network == "pl") {
     netKey = _network;
} else
{
     netKey = "cloudflare"
}



const index_factory = await IndexFactory.at(contracts[netKey]["deploy"]["IndexFactory"]["address"]);
const indexstorage = await IndexStorage.at(contracts[netKey]["deploy"] ["IndexStorage"]["address"]);

//const exchanges = await Exchange.at(contracts[netKey]["deploy"]["Exchange"]["address"]);
const index2swap = await Index2Swap.at(contracts[netKey]["deploy"] ["Index2SwapEthMarket"]["address"]);

if (_network != "ropsten" || _network != "mainnet") {
 /*  console.log('create index token1');
await deployer.deploy(IndexToken,'Svet index 1', 'SVI1');
 const index_token1 = await IndexToken.deployed();
 const trIndex1 = await index_factory.makeIndex(index_token1.address,
          [tokens[netKey].Bytom.address,
          tokens[netKey].WaykiChain.address,
          tokens[netKey].Kyber.address],
          [ 2624,
            3774,
            3601] ); //in WEI
console.log(trIndex1.tx);

 //const index_token2 = await deployer.deploy(IndexToken,'Svet index 2', 'SVI2');
await deployer.deploy(IndexToken,'Svet index BTC-stable', 'SVI3');
const index_token3 = await IndexToken.deployed();
console.log('create index token3');

const trIndex3 = await index_factory.makeIndex(index_token3.address,
  [tokens[netKey].WBTC.address,
    tokens[netKey].cDAI.address,
    tokens[netKey].cUSDC.address,  ],
  [5000, 2500, 2500 ]); //in WEI
console.log(trIndex3.tx);
await deployer.deploy(IndexToken,'SVET Saving Index', 'SVI4');
const index_token4 = await IndexToken.deployed();

console.log('create index token4');
const trIndex4 = await index_factory.makeIndex(index_token4.address,
  [tokens[netKey].cDAI.address,
    tokens[netKey].cUSDC.address],
  [5000, 5000 ]); //in WEI
console.log(trIndex4.tx);
await deployer.deploy(IndexToken,'SVET Perspective Index', 'SVI5');
const index_token5 = await IndexToken.deployed();


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
  [1000, 1000, 1000, 1000,1000, 1000,1000, 1000,1000, 1000]); //in WEI
console.log(trIndex5.tx);
 */

/**
 * Svyat Sv, [02.07.21 08:58]
Economic Class Index
33% Shiba Inu (SHIB), Price: 0.00000814: 0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce
33% Amp (AMP), Price: 0.055411: 0xff20817765cb7f73d4bde2e66e067e58d11095c2
33% Telcoin (TEL), Price: 0.02366776: 0x467bccd9d29f223bce8043b84e8c8b282827790f

 */
/* var isindexexist = await indexstorage.indexes('EconomicClassIndex', 'SECI' ) ;
console.log ("EconomicClassIndex ",  isindexexist);
if (isindexexist == "0x0000000000000000000000000000000000000000")
  {
  await deployer.deploy(IndexToken,'EconomicClassIndex', 'SECI', contracts[netKey]["deploy"]["Lstorage"]["address"]);
  const index_tokenSECI = await IndexToken.deployed();
  console.log('create index Economic Class Index');
  const trIndex5 = await index_factory.makeIndex(index_tokenSECI.address,
    [tokens[netKey]["WMATIC"]["address"],
      tokens[netKey]["AAVE"]["address"],
      tokens[netKey]["Kyber"]["address"],
    // contracts[netKey]["deploy"] ["SVTtst"]["address"],

    ],
    [web3.utils.toWei('0.3','ether'),
    web3.utils.toWei('0.4','ether'),
     web3.utils.toWei('0.3','ether')]); //in WEI web3.utils.toWei('0.1','ether')
console.log(trIndex5.tx);} */

/**
 * Svyat Sv, [02.07.21 08:59]
Mare Tranquillitatis (The Sea of Tranquillity) Index
33% Dai (DAI), Price: 1.00: 0x6b175474e89094c44da98b954eedeac495271d0f
33% cDAI (CDAI), Price: 0.02156891: 0x5d3a536e4d6dbd6114cc1ead35777bab948e3643
33% cUSDT (CUSDT), Price: 0.02127915: 0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9

var isindexexist = await indexstorage.indexes('The Sea of Tranquillity) Index', 'SSTI');
console.log ("The Sea of Tranquillity) Index: ",  isindexexist);
if ( isindexexist == "0x0000000000000000000000000000000000000000")
  {
  await deployer.deploy(IndexToken,'The Sea of Tranquillity) Index', 'SSTI', contracts[netKey]["deploy"]["Lstorage"]["address"]);
  const index_tokenSSTI = await IndexToken.deployed();
  console.log('create index Economic Class Index');
  const trIndex6 = await index_factory.makeIndex(index_tokenSSTI.address,
    [tokens[netKey]["DAI"]["address"],
      tokens[netKey]["WBTC"]["address"],
      tokens[netKey]["USDC"]["address"]
    ],
    ['3000000000000000000000', // 3000 DAI decimals = 18
     '40000000000000000', //0.04 wbtc decimals = 18
     '3000000000000000000000'
  ]);
  console.log(trIndex6.tx);
  } */
/**
 * Svyat Sv, [02.07.21 08:59]
50 Cents Index
50% Basic Attention Token (BAT), Price: 0.563579: 0x0d8775f648430679a709e98d2b0cb6250d2887ef
50% Decentraland (MANA), Price: 0.524011: 0x0f5d2fb29fb7d3cfee444a200298f468908cc942
 */
/* var isindexexist = await indexstorage.indexes('50CentsIndex', 'S50I');
console.log ("50CentsIndex ",  isindexexist);

if (isindexexist == "0x0000000000000000000000000000000000000000")
  {
await deployer.deploy(IndexToken,'50CentsIndex', 'S50I', contracts[netKey]["deploy"]["Lstorage"]["address"]);
const index_tokenS50I = await IndexToken.deployed();
console.log('50 Cents Index');
const trIndex7 = await index_factory.makeIndex(index_tokenS50I.address,
   [tokens[netKey]["Rarible"]["address"],
    tokens[netKey]["Decentraland"]["address"],
    tokens[netKey]["1INCH"]["address"],
   // contracts[netKey]["1INCH"] ["SVTtst"]["address"],

  ],
  [web3.utils.toWei('0.47','ether'),
  web3.utils.toWei('0.47','ether'),
   web3.utils.toWei('1','ether')]); //in WEI
console.log(trIndex7.tx);

  } */
/**
 * Play No Pey Index:

1) Decentraland (MANA): 20%
2) decentral.games ($DG): 20%
3) Decentr (DEC): 20% //not found on quickswap
4) OVR (OVR): 20% //zero liq
5) Aavegotchi GHST Token (GHST): 20%
 */
isindexexist = await indexstorage.indexes('Play No Pey Index', 'PNPI');
if ( isindexexist == "0x0000000000000000000000000000000000000000")
  {
  await deployer.deploy(IndexToken,'Play No Pey Index', 'PNPI', contracts[netKey]["deploy"]["Lstorage"]["address"]);
  const index_tokenSSTI = await IndexToken.deployed();
  console.log('create Play No Pey Index');
  const trIndex6 = await index_factory.makeIndex(index_tokenSSTI.address,
    [tokens[netKey]["DecentralandPOS"]["address"],
      tokens[netKey]["decentral.gamesPOS"]["address"],
      tokens[netKey]["AavegotchiPOS"]["address"]

    ],
    ['10000000000000000000', // 10 MANA decimals = 18
     '10000000000000000', // 0.01 $DC
     '10000000000000000000', // 10 GHST
    //  '2000000000000000000',
    //  '2000000000000000000',
     ]);
  console.log(trIndex6.tx);
  }
  /**
   * Svyat Sv, [30.09.21 11:46]
Port Royal Index:

1) SushiToken (SUSHI): 20%
2) 1INCH Token (1INCH): 20%
3) LoopringCoin V2 (LRC): 20% //no
4) Injective Token (INJ): 20% //
5) Quickswap (QUICK): 20%
   */
  isindexexist = await indexstorage.indexes('Port Royal Index', 'PRI');
  if ( isindexexist == "0x0000000000000000000000000000000000000000")
    {
    await deployer.deploy(IndexToken,'Port Royal Index', 'PRI', contracts[netKey]["deploy"]["Lstorage"]["address"]);
    const index_tokenSSTI = await IndexToken.deployed();
    console.log('create index Port Royal Index');
    const trIndex6 = await index_factory.makeIndex(index_tokenSSTI.address,
      [tokens[netKey]["SushiTokenPOS"]["address"],
        tokens[netKey]["1INCHPOS"]["address"],
        tokens[netKey]["Quickswap"]["address"]

      ],
      ['10000000000000000000', // 10 SushiTokenPOS decimals = 18
       '100000000000000000', // 0.1  1INCHPOS
       '1000000000000000000' // 1Quickswap
        // '2000000000000000000',
        // '2000000000000000000',
    ]);
    console.log(trIndex6.tx);
    }

    /**
     * The Hulk-Ohm Index:

1) Energy Web Token Bridged (EWTB): 25% //near zero liq
2) PowerLedger (POWR): 25%
3) DOVU (DOV): 25%
4) WePower (): 25%
     */

/* isindexexist = await indexstorage.indexes('The Hulk-Ohm Index', 'HOI');
if ( isindexexist == "0x0000000000000000000000000000000000000000")
  {
  await deployer.deploy(IndexToken,'The Hulk-Ohm Index', 'HOI', contracts[netKey]["deploy"]["Lstorage"]["address"]);
  const index_tokenSSTI = await IndexToken.deployed();
  console.log('create index The Hulk-Ohm Index');
  const trIndex6 = await index_factory.makeIndex(index_tokenSSTI.address,
    [tokens[netKey]["PowerLedger"]["address"],
//      tokens[netKey]["DOVUPOS"]["address"],
      tokens[netKey]["Quickswap"]["address"]

    ],
    ['1000000000000000000', // 1 power decimals = 18
  //   '1000000000000000000', //
     '1000000000000000000'
      // '2000000000000000000',
      // '2000000000000000000',
  ]);
  console.log(trIndex6.tx);
  } */

/**
 * Lighthouse of Alexandria Index:

1) Dai Stablecoin (DAI): 20%
2) Tether USD (USDT): 20%
3) PUSD (PUSD): 20%
4) USD Coin (USDC): 20%
5) Wrapped UST Token (UST): 20%
 */

isindexexist = await indexstorage.indexes('Lighthouse of Alexandria Index:', 'LAI');
if ( isindexexist == "0x0000000000000000000000000000000000000000")
  {
  await deployer.deploy(IndexToken,'Lighthouse of Alexandria Index:', 'LAI', contracts[netKey]["deploy"]["Lstorage"]["address"]);
  const index_tokenSSTI = await IndexToken.deployed();
  console.log('create index Lighthouse of Alexandria Index');
  const trIndex6 = await index_factory.makeIndex(index_tokenSSTI.address,
    [tokens[netKey]["DAI"]["address"],
      tokens[netKey]["PUSD"]["address"],
      tokens[netKey]["USDC"]["address"],
      tokens[netKey]["USDT"]["address"],
    ],
    ['1000000000000000000', // 1 DAI decimals = 18
     '10000000000000000', // 0.01 PUSD
     '1000000000000000000', // 1 USDC decimals = 18
     '1000000000000000000', // 1 USDT decimals = 18
  ]);
  console.log(trIndex6.tx);
  } else
  {
    console.log ("Lighthouse of Alexandria Index:: ",  isindexexist);

  }
}
}
