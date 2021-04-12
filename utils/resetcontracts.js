var contracts = require("../embark4Contracts.json");
var myArgs = process.argv.slice(2);
netKey = myArgs[0];
const fs = require('fs');

for (contractName of Object.keys(contracts[netKey]["deploy"])) {
    contracts[netKey]["deploy"][contractName].address = "";
}

fs.writeFileSync("embark4Contracts.json", JSON.stringify(contracts));
