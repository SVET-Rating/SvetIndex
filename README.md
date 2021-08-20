#SvetIndex

This repository contains SvetIndex smart contracts. SvetIndex is the main product of SvetRating. The main feature of SvetIndex is the possibility to create special indexes, based on fundamental analysis of projects by Svet’s community experts  with community governance and craft index design.

- Local Testing and Development
Use npm i to run the following npm tasks:
Install ganache, Embark globally:
`npm i -g ganache embark`
 Clone the repo https://github.com/SVET-rating/svet_token
Run to deploy system on your localnet:
```
node utils/resetcontracts.js cloudflare all && node utils/resettokens.js cloudflare all
node utils/resetcontracts.js ropsten all && node utils/resettokens.js ropsten all

ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -i 999 -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_local --allowUnlimitedContractSize -g 18000000000 -e 1000 -b 1

truffle migrate --reset --compile-all --network cloudflare
truffle test --network cloudflare
truffle migrate --reset --compile-all --network ropsten
truffle migrate --network ropsten

embark run --nodashboard cloudflare
```

Open http://localhost:8000

truffle debug --network cloudflare 0x2a144e4a8d89ea66e3647a87b2affcd2f202f06b7fd4ac76b36658c91438f9b4
