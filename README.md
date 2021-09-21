#SvetIndex

This repository contains SvetIndex smart contracts. SvetIndex is the main product of SvetRating. The main feature of SvetIndex is the possibility to create special indexes, based on fundamental analysis of projects by Svet’s community experts  with community governance and craft index design.

- Local Testing and Development
Use npm i to run the following npm tasks:
Install ganache, Embark globally:
`npm i -g ganache embark`
 Clone the repo https://github.com/SVET-rating/svet_token
Run to deploy system on your poligon localnet:
```
node utils/resetcontracts.js pl mainnet 

 ganacheli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -f 'https://polygon-mainnet.infura.io/v3/753a98a2eb6c4d64918829f47d069440' -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_poly  -p 8545 -e 1000

truffle migrate --reset --compile-all --network pl

truffle test --network pl 

embark run --nodashboard pl 
```

Open http://localhost:8000

debugging tranzactions: 
truffle debug --network pl 
0x2a144e4a8d89ea66e3647a87b2affcd2f202f06b7fd4ac76b36658c91438f9b4
