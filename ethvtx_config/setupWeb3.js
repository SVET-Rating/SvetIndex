import { VtxContract } from 'ethvtx/lib/contracts/VtxContract';
import { loadContractSpec, loadContractInstance, addAccount } from 'ethvtx/lib/dispatchers';
import Web3 from 'web3';
import EmbarkJs from 'Embark/EmbarkJS';
import { start, setWeb3, authorizeAndSetWeb3 } from 'ethvtx/lib/dispatchers';
import { embark } from 'ethvtx/lib/utils';
import SimpleStorage from 'Embark/contracts/SimpleStorage';

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
            loadContractSpec(store.dispatch, ...embark.loadSpec(SimpleStorage, 'SimpleStorage', true, true));

            // Loading an instance BEFORE starting the store will check on the chain if the correct bytecode is found, and if not, the WrongNet status is applied
            loadContractInstance(store.dispatch, 'SimpleStorage', SimpleStorage.address, {
                alias: '@simplestorage',
                permanent: true,
                balance: true
            });

            // Loading a permanent account before starting the store will keep it even after resets
            addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {
                alias: '@testpermanent',
                permanent: true
            });

            // Starts the store, will update the vtxconfig.status depending on the environment. Will also call the enable callback if available
            start(store.dispatch, EmbarkJs.enableEthereum ? EmbarkJs.enableEthereum : undefined);

            window.DEBUG_STORE = store;

            ok();
        });

    })

};
