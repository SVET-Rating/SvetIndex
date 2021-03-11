import {  SELL_INDEX_TOKENS, START_SELL_INDEX,SELL_INDEX_TOKENS_AMOUNT
          } from '../actions/types';
import { SELECT_INDEX_TOKEN_SELL, SELL_INDEX_TOKEN } from '../processStates/sellTokenProcessStates';
import { RESET_INVESTMENTS } from '../processStates/resetProcessStates';

const initialStateBuySvetTokens = {
    sellTokenProcessState:SELECT_INDEX_TOKEN_SELL,
    indexTokensForSell:0,
    indexTokensAmountForSell:0
}


const buyTokensReducer = (state=initialStateBuySvetTokens, action) => {

    switch(action.type) {
        case RESET_INVESTMENTS:
            return {...state, sellTokenProcessState: SELECT_INDEX_TOKEN_SELL }
        case START_SELL_INDEX:
            return {...state, sellTokenProcessState: action.payload }
        case SELL_INDEX_TOKENS:
            return {...state, sellTokenProcessState: SELECT_INDEX_TOKEN_SELL }
        case SELL_INDEX_TOKENS_AMOUNT:
            return {...state, indexTokensAmountForSell:action.payload}
        default:
            return state;
    }

}

export default buyTokensReducer;