const contracts = require("../embark4Contracts.json");
const { copyFile, writeFileSync } = require('fs');

const myArgs = process.argv.slice(2);
const netKey = myArgs[0];

copyFile(
  'embark4Contracts.json',
  'embark4Contracts_old.json',
  (err) => {
    if (err) throw err;
    console.log('embark4Contracts.json was copied to embark4Contracts_old.json');
    if (myArgs[1] === "all") {
      for (const contractName of Object.keys(contracts[netKey]["deploy"])) {
        contracts[netKey]["deploy"][contractName].address = "";
      }
    } else if (myArgs[1] === "mainnet") {
      const contList = ["Experts", "Exchange", "OraclePrice", "OracleCircAmount",  "OracleTotSupply", "Index2SwapEthMarket", "IndexFactory", "Lstorage",  "IndexStorage"/* , "SVTtst" */];
      for (const contractName of contList) {
        contracts[netKey]["deploy"][contractName].address = "";
      }
    }
    
    else {
      contracts[netKey]["deploy"][myArgs[1]].address = "";
    }
    writeFileSync("embark4Contracts.json", JSON.stringify(contracts));
  },
);
