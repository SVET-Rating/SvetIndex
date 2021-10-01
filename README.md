#SvetIndex

This repository contains SvetIndex smart contracts. SvetIndex is the main product of SvetRating. The main feature of SvetIndex is the possibility to create special indexes, based on fundamental analysis of projects by Svet’s community experts  with community governance and craft index design.

- Local Testing and Development
Use npm i to run the following npm tasks:
Install ganache, Embark globally:
`npm i -g ganache embark`
 Clone the repo https://github.com/SVET-rating/svet_token
 git checkout  2Matic21


Run to deploy system on your poligon localnet:
```
0. git checkout 2Matic21 && git pull

1. node utils/resetcontracts.js pl mainnet

2. rm -r ../ganache_poly

3. ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -f 'https://polygon-mainnet.infura.io/v3/753a98a2eb6c4d64918829f47d069440' -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_poly  -p 8555 -e 100000

!!!!!!!!!!!!!!!!!!!!
4. In Metamask wallet  (or same)  add network:

Network Name: PoliLocal
endpoint: http://127.0.0.1:8555
network ID: 1337

5. Switch wallet  to this network
!!!!!!!!!!!!!!!!!!!!

6. truffle migrate --reset --compile-all --network pl

7. embark run --nodashboard pl

to test:
truffle test --network pl


to debug  tranzactions:
truffle debug --network pl <hash_of_tranzaction, like
"0x2a144e4a8d89ea66e3647a87b2affcd2f202f06b7fd4ac76b36658c91438f9b4">

```


Open http://localhost:8000
