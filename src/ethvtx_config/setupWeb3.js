import { VtxContract } from 'ethvtx/lib/contracts/VtxContract';
import { loadContractSpec, loadContractInstance, addAccount } from 'ethvtx/lib/dispatchers';
import Web3 from 'web3';
import  EmbarkJs  from 'embarkjs';
import { start, setWeb3, authorizeAndSetWeb3 } from 'ethvtx/lib/dispatchers';
import { embark } from 'ethvtx/lib/utils';

import {OraclePrice, OracleCircAmount,  OracleTotSupply,  Index2Swap, IndexFactory, Lstorage, IndexStorage, ERC20,  IndexToken, Experts, Exchange, SVTtst } from "../embarkArtifacts/contracts"

export const setupWeb3 = async (store) => {
    try {
      await EmbarkJs.enableEthereum ();
  
      return new Promise((ok, ko) => {

        EmbarkJs.onReady(async () => {
            
          
            if (EmbarkJs.enableEthereum ) {
              
                const web3_getter = () => {

                    const web3 = new Web3(EmbarkJs.Blockchain.Providers.web3.getCurrentProvider());

                    return web3;

                };

                await authorizeAndSetWeb3(store.dispatch, {
                    enable: EmbarkJs.enableEthereum,
                    web3: web3_getter
                });

            } else {
                // Recover the Web3 instance created by Embark
                const embark_web3 = EmbarkJs.Blockchain.Providers.web3.web3;

                // Extract the provider to build a very specific version of web3 (in our case web3@1.0.0-beta.32 is the best working version)
                const provider = embark_web3.currentProvider;
                const web3 = new Web3(provider);
                // Set the web3 instance in the store
                setWeb3(store.dispatch, web3);
            }

            // Initialize the Store's contract manager
            VtxContract.init(store);
            try {
            // Loading a spec si made easy with the embark.loadSpec helper
            loadContractSpec(store.dispatch, ...embark.loadSpec(Experts, 'Experts', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(Exchange, 'Exchange', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(OraclePrice, 'OraclePrice', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(OracleCircAmount, 'OracleCircAmount', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(OracleTotSupply, 'OracleTotSupply', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(Index2Swap, 'IndexSwap', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(IndexFactory, 'IndexFactory', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(Lstorage, 'Lstorage', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(IndexStorage, 'IndexStorage', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(ERC20, 'ERC20', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(IndexToken, 'IndexToken', true, true));
           

            // Loading an instance BEFORE starting the store will check on the chain if the correct bytecode is found, and if not, the WrongNet status is applied
            loadContractInstance(store.dispatch, 'ERC20', SVTtst.address, {
                alias: '@svettoken',
                permanent: true,
                balance: true
            });

            loadContractInstance(store.dispatch, 'Experts', Experts.address, {
                alias: '@experts',
                permanent: true,
                balance: true
            });

            loadContractInstance(store.dispatch, 'Exchange', Exchange.address, {
                alias: '@exchange',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'OraclePrice', OraclePrice.address, {
                alias: '@oracleprice',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'OracleCircAmount', OracleCircAmount.address, {
                alias: '@oraclecircamount',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'OracleTotSupply', OracleTotSupply.address, {
                alias: '@oracletotsupply',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'IndexSwap', Index2Swap.address, {
                alias: '@indexswap',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'IndexFactory', IndexFactory.address, {
                alias: '@indexfactory',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'Lstorage', Lstorage.address, {
                alias: '@lstorage',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'IndexStorage', IndexStorage.address, {
                alias: '@indexstorage',
                permanent: true,
                balance: true
            });
            
            await IndexStorage.methods.indexList().call().then(_value => 
                _value.map((item, key) => {
                  const curIndex =  EmbarkJs.Blockchain.Contract({
                      abi: IndexToken.options.jsonInterface,
                      address:  item.addr});
                  
                      curIndex.methods.name().call().then(name => {
  
                          loadContractInstance(store.dispatch, 'IndexToken', item.addr, {
                        //      address: item.addr,
                              permanent: true,
                              balance: true
                          });
                      
                          curIndex.methods.getActivesList ().call().then(_value => 
                              _value.map((itemT, key) => {
                                const curToken =  EmbarkJs.Blockchain.Contract({
                                    abi: ERC20.options.jsonInterface,
                                    address:  itemT.addrActive});
                                
                                    curToken.methods.name().call().then(nameT => {
                
                                        loadContractInstance(store.dispatch, 'ERC20', itemT.addrActive, {
                                   //         alias: "@" + nameT.toLowerCase(),
                                            permanent: true,
                                            balance: true
                                        });
                                    
                                    
                                    
                                });
                            }));
                      
                  });
              }));
            }
            catch {
                alert ("Can't connect to smart contract. Check type of Ethereum  network you connected and reload dApp.")
            }
            /* Loading a permanent account before starting the store will keep it even after resets
            web3.eth.getAccounts().then(e => {    
                addAccount(store.dispatch, e[0], {
                    alias: '@mainacc',
                    permanent: true
                });
            }); */
            // Starts the store, will update the vtxconfig.status depending on the environment. Will also call the enable callback if available
            start(store.dispatch, EmbarkJs.enableEthereum ? EmbarkJs.enableEthereum : undefined);

            window.DEBUG_STORE = store;

            ok();
        });

    });

    }  catch (e) {
        const text = 'Something went wrong connecting to Ethereum. Please make sure you have a node running, installed ethereum wallet (like Metamask or StatusIM or same)  and  connect to the Ethereum network';
        alert (text);
    
    };
}