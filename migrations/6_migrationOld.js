const MockERC20 = artifacts.require('SVTtst.sol');
const Index2Swap = artifacts.require('Index2SwapEthMarket.sol');
const OraclePrice = artifacts.require('OraclePrice.sol');
const contracts_old = require("../embark4Contracts_old.json");
const contracts = require("../embark4Contracts.json");
const  { forContractAt } = require ("@truffle/decoder"); 
const provider = web3.currentProvider;

module.exports = async function(deployer,_network, addresses) {


    const admin = addresses[0];
    var netkey ;
    if (_network == "ropsten" || _network == "mainnet" || _network == "ganache") {
         netKey = _network;
    } else
    {
         netKey = "cloudflare"
    } 

    const oraclePriceAaddr = contracts_old[netKey]["deploy"]["OraclePrice"]["address"]
    const oldIndexSwapaddr =  contracts_old[netKey]["deploy"]["Index2SwapEthMarket"]["address"]
    const newIndexSwapaddr = contracts[netKey]["deploy"]["Index2SwapEthMarket"]["address"]
    const oracleprice = await OraclePrice.at(oraclePriceAaddr);
    const tokens = await oracleprice.getallTokens ();
    const index2swapold = await Index2Swap.at(oldIndexSwapaddr);
    
    try {

        await index2swapold.upgrade(newIndexSwapaddr,  {from:admin});  //new version

        for (let t=0; t<tokens.length; t++){
            const tok = await MockERC20.at(tokens[t]);
            const bal = await tok.balanceOf(oldIndexSwapaddr);
            if (bal > 0) {
            //   await index2swapold.upgrade(newIndexSwapaddr,  bal, {from:admin}); // working on ropsten version
                let newBal = await tok.balanceOf(newIndexSwapaddr)
                console.log ("transferred to ", newIndexSwapaddr, tokens[t], newBal.toString())
            }
        }
        
        const index2swapnew = await Index2Swap.at(newIndexSwapaddr);
        let balEth = await index2swapold.balance;
        await index2swapnew.sendTransaction ({from:index2swapold, value:balEth});
        }
    catch (err) {
        console.log ("error when upgrade:", err);
    }

}