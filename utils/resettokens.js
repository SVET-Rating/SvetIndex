const tokens = require('../tokens.json');
const { copyFile, writeFileSync } = require('fs');

const myArgs = process.argv.slice(2);
const netKey = myArgs[0];

copyFile(
  'tokens.json',
  'tokens_old.json',
  (err) => {
    if (err) throw err;
    console.log('tokens.json was copied to tokens_old.json');
    if (myArgs[1] === "all") {
      for (const tokenName of Object.keys(tokens[netKey])) {
        tokens[netKey][tokenName].address = "";
      }
    } else {
      tokens[netKey][myArgs[1]].address = "";
    }
    writeFileSync("tokens.json", JSON.stringify(tokens));
  },
);
