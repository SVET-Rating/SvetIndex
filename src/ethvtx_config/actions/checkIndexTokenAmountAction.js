import {CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN} from './types'


const checkSvetTokensForBuyIndexTokensAction = (indexTokenAmount,indexTokenPrice,svetTokensAmount) => {
    var enoughSvetTokensForBuy;
    if (indexTokenAmount*indexTokenPrice <= svetTokensAmount) {
        enoughSvetTokensForBuy = true;
    } else {
        enoughSvetTokensForBuy = false;
    }
    return {
        type:CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN,
        payload: {
            indexTokenAmount,
            enoughSvetTokensForBuy
            
        }
    }
}


export default checkSvetTokensForBuyIndexTokensAction