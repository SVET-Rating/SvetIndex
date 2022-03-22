import { VtxContract } from 'ethvtx/lib/contracts/VtxContract';
import { loadContractSpec, loadContractInstance, addAccount } from 'ethvtx/lib/dispatchers';
import { contractInfo } from './contractSettingTool';

import OraclePrice from '../contracts/OraclePrice.json';
import OracleCircAmount from '../contracts/OracleCircAmount.json';
import OracleTotSupply from '../contracts/OracleTotSupply.json';
import Index2Swap from '../contracts/Index2SwapEthMarket.json';
import IndexFactory from '../contracts/IndexFactory.json';
import Lstorage from '../contracts/Lstorage.json';
import IndexStorage from '../contracts/IndexStorage.json';
import ERC20 from '../contracts/ERC20.json';
import IndexToken from '../contracts/IndexToken.json';
import Experts from '../contracts/Experts.json';
import Exchange from '../contracts/Exchange.json';
import SVTtst from '../contracts/MockERC20.json';


const addContractsVtxStore = (net_id, store) => {

    currentContracts = [OraclePrice,OracleCircAmount,
                        OracleTotSupply,Index2Swap,
                        IndexFactory,Lstorage,
                        IndexStorage,
                        ERC20,IndexToken,
                        Experts,Exchange,SVTtst]

    //initialize contract store
    VtxContract.init(store);

    //add contracts spec to store
    currentContracts.map((jsonFile,key) =>{
        const contractInfoObject = contractInfo(net_id, jsonFile);
        loadContractSpec(store.dispatch, contractInfoObject.name, contractInfoObject.address, {
            bin: contractInfoObject.bytecode,
            permanent: true
        });

    });

    currentContracts.map((jsonFile,key) => {
        loadContractInstance(store.dispatch, contractInfoObject.name, contractInfoObject.address, {
            permanent: true ,
            alias: contractInfoObject.name
        });
    });




}

export default addContractsVtxStore;
