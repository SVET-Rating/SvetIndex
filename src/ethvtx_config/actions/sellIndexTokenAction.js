import { SELL_INDEX_TOKENS,SELL_INDEX_TOKENS_AMOUNT } from './types';
import { SELL_INDEX_TOKEN } from '../processStates/sellTokenProcessStates';


export const sellIndexTokenAction = (sellIndexTokensContract,
    indexTokensAmountForSell,
    indexTokenAddress,
     currentAddress) => {

    let amount_in_wei = web3.utils.toWei(indexTokensAmountForSell);
    if (sellIndexTokensContract != undefined && indexTokensAmountForSell != 0) {
        const IndexToken = sellIndexTokensContract._contract.methods.sellIndexforSvet(amount_in_wei, indexTokenAddress)
                           .send({from: currentAddress});
    }
    
    
    return {
        type: SELL_INDEX_TOKENS,
        payload: SELL_INDEX_TOKEN
    }
}

export const sellIndexTokenAmount = (indexTokensAmountForSell) => {
    return {
        type: SELL_INDEX_TOKENS_AMOUNT,
        payload: indexTokensAmountForSell
    }
}

