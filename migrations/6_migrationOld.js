const MockERC20 = artifacts.require('SVTtst.sol');
//const Index2Swap = artifacts.require('Index2Swap.sol');
const OraclePrice = artifacts.require('OraclePrice.sol');
const contracts_old = require("../embark4Contracts_old.json");
const contracts = require("../embark4Contracts.json");

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
    const oldIndexSwapaddr =  contracts_old[netKey]["deploy"]["Index2Swap"]["address"]
    const newIndexSwapaddr = contracts[netKey]["deploy"]["Index2Swap"]["address"]


    const oracleprice = await OraclePrice.at(oraclePriceAaddr);
    //const index2swapold = Index2Swap.at(oldIndexSwapaddr);
   // const index2swapnew = Index2Swap.at(newIndexSwapaddr);
    const tokens = await oracleprice.getallTokens ();
    for (let t=0; t<tokens.length; t++){
        const tok = MockERC20.at(tokens[t]);
        const bal = await tok.balanceOf(oldIndexSwapaddr);
        if (bal > 0) {
            await tok.transfer(newIndexSwapaddr, tok.balanceOf(address(this)), {from:admin});
            console.log (tokens[t], bal)
        }
    }
}