import { BUY_SVET_TOKENS_BY_ETHER, BUY_SVET_TOKEN_ETHER_AMOUNT  } from './types';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';


export const etherToSvetTokens = (index2swap, etherForSvet, currentAddress) => {
    if (index2swap != undefined) {
        var svetTokensTX = index2swap._contract.methods.buySvet4Eth().send({from:currentAddress, value: web3.utils.toWei(etherForSvet)});
        console.log(svetTokensTX)
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



