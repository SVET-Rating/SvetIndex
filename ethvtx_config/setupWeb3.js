import { VtxContract } from 'ethvtx/lib/contracts/VtxContract';
import { loadContractSpec, loadContractInstance, addAccount } from 'ethvtx/lib/dispatchers';
import Web3 from 'web3';
import EmbarkJs from 'Embark/EmbarkJS';
import { start, setWeb3, authorizeAndSetWeb3 } from 'ethvtx/lib/dispatchers';
import { embark } from 'ethvtx/lib/utils';
import OraclePrice from 'Embark/contracts/OraclePrice';
import OracleCircAmount from 'Embark/contracts/OracleCircAmount';
import OracleTotSupply from 'Embark/contracts/OracleTotSupply';
import Index2Swap from 'Embark/contracts/Index2Swap';
import IndexFactory from 'Embark/contracts/IndexFactory';
import Lstorage from 'Embark/contracts/Lstorage';
import IndexStorage from 'Embark/contracts/IndexStorage';
import ERC20 from 'Embark/contracts/ERC20';
import IndexToken from 'Embark/contracts/IndexToken';

export const setupWeb3 = async (store) => {

    return new Promise((ok, ko) => {

        EmbarkJs.onReady(async () => {

            if (EmbarkJs.enableEthereum) {

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

            // Loading a spec si made easy with the embark.loadSpec helper
            loadContractSpec(store.dispatch, ...embark.loadSpec(Experts, 'Experts', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(Exchange, 'Exchange', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(OraclePrice, 'OraclePrice', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(OracleCircAmount, 'OracleCircAmount', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(OracleTotSupply, 'OracleTotSupply', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(Index2Swap, 'Index2Swap', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(IndexFactory, 'IndexFactory', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(Lstorage, 'Lstorage', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(IndexStorage, 'IndexStorage', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(ERC20, 'ERC20', true, true));
            loadContractSpec(store.dispatch, ...embark.loadSpec(IndexToken, 'IndexToken', true, true));
           

            // Loading an instance BEFORE starting the store will check on the chain if the correct bytecode is found, and if not, the WrongNet status is applied
            loadContractInstance(store.dispatch, 'Experts', Experts.address, {
                alias: '@Experts',
                permanent: true,
                balance: true
            });

            loadContractInstance(store.dispatch, 'Exchange', Exchange.address, {
                alias: '@Exchange',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'OraclePrice', OraclePrice.address, {
                alias: '@OraclePrice',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'OracleCircAmount', OracleCircAmount.address, {
                alias: '@OracleCircAmount',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'OracleTotSupply', OracleTotSupply.address, {
                alias: '@OracleTotSupply',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'Index2Swap', Index2Swap.address, {
                alias: '@Index2Swap',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'IndexFactory', IndexFactory.address, {
                alias: '@IndexFactory',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'Lstorage', Lstorage.address, {
                alias: '@Lstorage',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'IndexStorage', IndexStorage.address, {
                alias: '@IndexStorage',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'IndexToken', IndexToken.address, {
                alias: '@IndexToken',
                permanent: true,
                balance: true
            });
            loadContractInstance(store.dispatch, 'ERC20', ERC20.address, {
                alias: '@ERC20',
                permanent: true,
                balance: true
            });
            // Loading a permanent account before starting the store will keep it even after resets
            web3.eth.getAccounts().then(e => {    
                addAccount(store.dispatch, e[0], {
                    alias: '@mainAcc',
                    permanent: true
                });
            });
            // Starts the store, will update the vtxconfig.status depending on the environment. Will also call the enable callback if available
            start(store.dispatch, EmbarkJs.enableEthereum ? EmbarkJs.enableEthereum : undefined);

            window.DEBUG_STORE = store;

            ok();
        });

    })

};
