#SvetIndex

This repository contains SvetIndex smart contracts. SvetIndex is the main product of SvetRating. The main feature of SvetIndex is the possibility to create special indexes, based on fundamental analysis of projects by Svet’s community experts  with community governance and craft index design.

- Local Testing and Development
Use npm i to run the following npm tasks:
Install ganache, Embark globally:
`npm i -g ganache embark`
 Clone the repo https://github.com/SVET-rating/svet_token
Run to deploy system on your localnet:
```
ganache-cli -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -i 999 -u 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A --db ../ganache_local --allowUnlimitedContractSize -g 10 -e 1000

truffle migrate --reset --compile-all --network cloudflare

embark run --nodashboard cloudflare
```

Open http://localhost:8000
