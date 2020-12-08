import CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN from './types'


const checkSvetTokensForBuyIndexTokensAction = (indexTokenAmount) => {
    return {
        type:CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN,
        payload: {
            indexTokenAmount: indexTokenAmount
            
        }
    }
}


export default checkSvetTokensForBuyIndexTokensAction