import {CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN} from './types'


const checkSvetTokensForBuyIndexTokensAction = (indexTokensAmount,indexTokenPrice,svetTokensAmount) => {
    var enoughSvetTokensForBuy;
    if (indexTokensAmount*indexTokenPrice <= svetTokensAmount) {
        enoughSvetTokensForBuy = true;
    } else {
        enoughSvetTokensForBuy = false;
    }
    return {
        type:CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN,
        payload: {
            indexTokensAmount,
            enoughSvetTokensForBuy
            
        }
    }
}


export default checkSvetTokensForBuyIndexTokensAction