
var contracts = require("../embark4Contracts.json");
var deplContract = {};

const fs = require('fs');

module.exports = async function(deployer,_network, addresses) {
  // console.log ("_network.network_id:", _network);
    const [admin,user1] = addresses;

var netKey;
if (_network == "ropsten" || _network == "mainnet" || _network == "ganache") {
    netKey = _network;
} else
{
    netKey = "cloudflare"
}

for (contractName of Object.keys(contracts[netKey]["deploy"])) {
  var contract = contracts[netKey]["deploy"][contractName];
  const curContract =  artifacts.require(contractName+'.sol');

  if (contract.address == '') {
     console.log("couldn't find, deploy contracts as new:",  contractName);
     if (contractName == "SVTtst") { 
        await deployer.deploy(curContract, "SvetToken", "SVT", web3.utils.toWei("21000000" ))}
     else if  (contractName == "UniswapV2Factory") { 
        await deployer.deploy(curContract, admin)}
      else if  (contractName == "UniswapV2Router02") { 
        if (deplContract["WETH"].address !=="" && deplContract["UniswapV2Factory"].address !== "") {
        await deployer.deploy(curContract, deplContract["UniswapV2Factory"].address, deplContract["WETH"].address )}}
      else {
        await deployer.deploy(curContract);
   }
   
    deplContract[contractName] = await curContract.deployed();
    contracts[netKey]["deploy"][contractName].address = deplContract[contractName].address;
    contracts[netKey]["deploy"][contractName].abi = deplContract[contractName].abi;
    fs.writeFileSync("embark4Contracts.json", JSON.stringify(contracts));

          } 
  else {
      console.log("try to find contract",  contractName);
      deplContract[contractName] = await curContract.at(contracts[netKey]["deploy"][contractName].address); 
          }  
            

  }



    
    await deplContract["Experts"].addExpert(admin);
    await deplContract["OraclePrice"].setExpertsContr(deplContract["Experts"].address);
    await deplContract["OracleTotSupply"].setExpertsContr(deplContract["Experts"].address);
    await deplContract["OracleCircAmount"].setExpertsContr(deplContract["Experts"].address);

    await  deplContract["Exchange"].setPriceOracle(deplContract["OraclePrice"].address);  

    
    await  deplContract["Index2Swap"].setSwap(deplContract["UniswapV2Router02"].address, 99, 30 ),
   // await index2swap.set(SvetToken.address, oracle_price.address, lstorage.address );
    await deplContract["IndexFactory"].setPriceOracle(deplContract["OraclePrice"].address);
    await deplContract["IndexFactory"].setAmountOracle(deplContract["OracleCircAmount"].address);
    await deplContract["IndexFactory"].setIndexStorage(deplContract["IndexStorage"].address);
    await deplContract["IndexFactory"].setTotSupply(deplContract["OracleTotSupply"].address);
    // Lstorage
    await deplContract["Lstorage"].setswap(deplContract["Index2Swap"].address);
    await deplContract["IndexStorage"].setFactory(deplContract["IndexFactory"].address);
    
    await deplContract["Exchange"].setBA(deplContract["SVTtst"].address);
    await deplContract["SVTtst"].transfer(deplContract["Index2Swap"].address, web3.utils.toWei("20000", "ether"));
    await deplContract["SVTtst"].approve(deplContract["Index2Swap"].address, web3.utils.toWei('0.02','ether'), {from:admin});
    await deplContract["Index2Swap"].set(deplContract["SVTtst"].address, deplContract["OraclePrice"].address, deplContract["Lstorage"].address);
    

  
};
