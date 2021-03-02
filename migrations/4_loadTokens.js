// loadTokens
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
const SvtT = artifacts.require('SVTtst.sol');

var tokens = require ("../tokens.json");
const contracts = require("../embark4Contracts.json");
const fs = require('fs');


module.exports = async function(deployer,_network, addresses) {

    const admin = addresses[0];

    const ethLiq = 0.05;
    const ethPrice = 1600; //USD
    const svtPrice = 1; //usd
    var netKey;
    if (_network == "ropsten" || _network == "mainnet" ) {
        netKey = _network;
    } else
    {
        netKey = "cloudflare"
    }

    const factory = await Factory.at(contracts[netKey]["deploy"]["UniswapV2Factory"]["address"]);
    const router = await Router.at(contracts[netKey]["deploy"]["UniswapV2Router02"]["address"]);
    const weth = await WETH.at(contracts[netKey]["deploy"] ["WETH"]["address"]);
    const svtT = await MockERC20.at(contracts[netKey]["deploy"] ["SVTtst"]["address"]);
    const oracle_price = await OraclePrice.at(contracts[netKey]["deploy"] ["OraclePrice"]["address"]);
    oracle_price.addPrice(weth.address, web3.utils.toWei(ethPrice.toString()));
    oracle_price.addPrice(svtT.address, web3.utils.toWei(svtPrice.toString()));


   // const contr = await MockERC20.new ('SvetToken', tokens['SvetToken']['symbol'], web3.utils.toWei(tokens['SvetToken']['totAmount'].toString()),  {from:admin});


//    await Object.keys(tokens).forEach (async (tokenName) => {
    for (tokenName of Object.keys(tokens)) {
        var token = tokens[netKey][tokenName];

        var  contract 
        
        if (token.address == '') {
                const totAm = web3.utils.toWei(token['totAmount']);
                console.log("couldn't find, deploy tokens as new:",  tokenName);
                contract  = await MockERC20.new (tokenName, token['symbol'], totAm, {from:admin});            
                await factory.createPair(weth.address, contract.address);

                } 
        else {
                console.log("try to find token",  tokenName, token.address);
                contract = await   MockERC20.at(token.address);
                }  
                          
        tokens[netKey][tokenName].address = contract.address;
            
        var tAmount = (ethLiq * ethPrice / token.priceUSD).toString().slice(0, 18) ;
        
        await   contract.approve (router.address, web3.utils.toWei(tAmount, "ether"));
        await router.addLiquidityETH(token.address,
                    web3.utils.toWei(tAmount),
                    web3.utils.toWei(tAmount),
                    web3.utils.toWei(ethLiq.toString()),
                    admin, 
                    Math.round(Date.now()/1000)+100*60,
                    {from:admin, value: web3.utils.toWei(ethLiq.toString(),'ether')});  
        await oracle_price.addPrice( tokens[netKey][tokenName].address,  web3.utils.toWei(token.priceUSD.toString(), "ether")) ;
                    //await oracle_circ_amount.addamount(token.address,  web3.utils.toBN(1374417194));
                //    await oracle_tot_supply.addamount(token.address,  web3.utils.toBN(2100000000));
        fs.writeFileSync("tokens.json", JSON.stringify (tokens));                
    }


    
    
    }

/**
 * const tokenA = await MockERC20.new('Bytom','BTM',web3.utils.toWei('100000000000','ether'));
    const tokenB = await MockERC20.new('WaykiChain', 'WIC', web3.utils.toWei('10000000000','ether'));
    const tokenC = await MockERC20.new('Kyber','KNC',web3.utils.toWei('100000000000','ether'));
    const SvetToken = await MockERC20.new('SveT','SVT',web3.utils.toWei('21000000','ether'));
    const wBTC = await MockERC20.new('WrappedBTC','wBTC',web3.utils.toWei('21000000','ether'));
    const cDAI = await MockERC20.new('CDai','CDai',web3.utils.toWei('100000000000','ether'));
    const cUSDC = await MockERC20.new('cUSDC','cUSDC',web3.utils.toWei('100000000000','ether'));

    const POLS = await MockERC20.new('Polkastarter','DOT',web3.utils.toWei('100000000000','ether'));
    const RARI = await MockERC20.new('Rarible','RARI',web3.utils.toWei('100000000000','ether'));
    const INCH = await MockERC20.new('1inch','1INCH',web3.utils.toWei('100000000000','ether'));
    const KEEP = await MockERC20.new('Keep Network','KEEP',web3.utils.toWei('100000000000','ether'));
    const Bondly = await MockERC20.new('Bondly','BONDLY',web3.utils.toWei('100000000000','ether'));
    const DDIM = await MockERC20.new('DuckDaoDime','DDIM',web3.utils.toWei('100000000000','ether'));
    const SOL = await MockERC20.new('Solana','SOL',web3.utils.toWei('100000000000','ether'));
    const CAKE = await MockERC20.new('PancakeSwap','CAKE',web3.utils.toWei('100000000000','ether'));
    const MANA = await MockERC20.new('Decentraland','MANA',web3.utils.toWei('100000000000','ether'));
    const SWAP = await MockERC20.new('Trustswap','SWAP',web3.utils.toWei('100000000000','ether'));

    console.log ("tokenA, tokenB, tokenC, SveT: ", tokenA.address, tokenB.address, tokenC.address, SvetToken.address);

    console.log ("wBTC, cDAIm cUSDC: ", wBTC.address,  cDAI.address, cUSDC.address);
 */