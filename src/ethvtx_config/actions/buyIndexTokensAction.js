import {BUY_INDEX_TOKENS} from './types';

const formBuyIndexTokens = (indexTokensAmount) => {
    return {
        type:BUY_INDEX_TOKENS,
        payload: indexTokensAmount
    }
}

export default formBuyIndexTokens;