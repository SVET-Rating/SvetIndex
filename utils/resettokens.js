var tokens = require("../tokens.json");
var myArgs = process.argv.slice(2);
netKey = myArgs[0];
const fs = require('fs');
fs.copyFile('./tokens.json', './tokens_old.json', (err) => {
    if (err) throw err;
    console.log('tokens.json was copied to tokens_old.json');
  });
if (myArgs[1] == "all") {

    for (tokenName of Object.keys(tokens[netKey])) {
        tokens[netKey][tokenName].address = "";
    }
}
else {
    tokens[netKey][myArgs[1]].address = "";

}

fs.writeFileSync("tokens.json", JSON.stringify(tokens));
