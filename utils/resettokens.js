var tokens = require("../tokens.json");
var myArgs = process.argv.slice(2);
netKey = myArgs[0];
const fs = require('fs');

for (tokenName of Object.keys(tokens[netKey])) {
    tokens[netKey][tokenName].address = "";
}

fs.writeFileSync("tokens.json", JSON.stringify(tokens));
