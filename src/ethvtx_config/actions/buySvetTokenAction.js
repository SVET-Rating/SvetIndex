import { BUY_SVET_TOKENS_BY_ETHER, BUY_SVET_TOKEN_ETHER_AMOUNT  } from './types';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';


export const etherToSvetTokens = (index2swap, etherForSvet) => {
    if (index2swap != undefined) {
        var svetTokenPrice = index2swap({value:etherForSvet});
    }
    

    return {
        type:BUY_SVET_TOKENS_BY_ETHER,
        payload:{'etherAmount':etherForSvet}
    }
}


export const changeEtherForBuyAmount = (etherForBuy) => {
    return {
        type: BUY_SVET_TOKEN_ETHER_AMOUNT,
        payload: {'etherAmount':etherForBuy}
    }
}



