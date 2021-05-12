var contracts = require("../embark4Contracts.json");
var myArgs = process.argv.slice(2);
netKey = myArgs[0];
const fs = require('fs');
fs.copyFile('./embark4Contracts.json', './embark4Contracts_old.json', (err) => {
    if (err) throw err;
    console.log('embark4Contracts.json was copied to embark4Contracts_old.json');
  });
if (myArgs[1] == "all") {
    for (contractName of Object.keys(contracts[netKey]["deploy"])) {
        contracts[netKey]["deploy"][contractName].address = "";
    }
}
else {
    contracts[netKey]["deploy"][myArgs[1]].address = "";
}
fs.writeFileSync("embark4Contracts.json", JSON.stringify(contracts));
