import {  SELL_INDEX_TOKENS, START_SELL_INDEX,SELL_INDEX_TOKENS_AMOUNT,
            SELL_INDEX_START_APPROVE,
            SELL_INDEX_APPROVED,
            SELL_INDEX_TRX_START,
            SELL_INDEX_TRX_PROCESSED,SELL_INDEX_TRX_END, START_SELL_INDEX_PROCESS,
            SELL_INDEX_TRX_FAILED,
          } from '../actions/types';
import { SELECT_INDEX_TOKEN_SELL, SELL_INDEX_TOKEN } from '../processStates/sellTokenProcessStates';
import { RESET_INVESTMENTS } from '../processStates/resetProcessStates';

const initialStateBuySvetTokens = {
    sellTokenProcessState:SELECT_INDEX_TOKEN_SELL,
    indexTokensForSell:0,
    indexTokensAmountForSell:0,
    sell_index_steps: 0,
    start_aprove_sell: false,
    hasError: false,
}


const sellTokensReducer = (state=initialStateBuySvetTokens, action) => {

    switch(action.type) {
        case RESET_INVESTMENTS:
            // return {...state, sellTokenProcessState: SELECT_INDEX_TOKEN_SELL, start_aprove_sell: false }
            return {
              ...state,
              sellTokenProcessState: SELECT_INDEX_TOKEN_SELL,
              start_aprove_sell: false,
              hasError: false,
            }
        case START_SELL_INDEX_PROCESS:
            return {...state, sellTokenProcessState: SELL_INDEX_TOKEN}
        // case SELL_INDEX_TOKENS_PROCESS:
        //     return {...state, sellTokenProcessState: SELECT_INDEX_TOKEN_SELL }
        case SELL_INDEX_TOKENS_AMOUNT:
            return {...state, indexTokensAmountForSell:action.payload}
        case SELL_INDEX_START_APPROVE:
            return {
                ...state, sell_index_steps: 0, start_aprove_sell: true
            }
        case SELL_INDEX_APPROVED:
            return {
                ...state, sell_index_steps: 1, aprove_hash: action.payload.aprove_hash
            }
        case SELL_INDEX_TRX_START:
                return {
                    ...state, sell_index_steps: 2
                }
        case SELL_INDEX_TRX_PROCESSED:
            return {
                ...state, buyindex_hash: action.payload.buyindex_hash, sell_index_steps: 3
            }
        case SELL_INDEX_TRX_END:
            return {
                ...state, sell_index_steps: 4, buyindex_hash: ""
            }
        case SELL_INDEX_TRX_FAILED:
            return {
                ...state, sell_index_steps: 4, buyindex_hash: "", hasError: action.payload.hasError,
            }
        default:
            return state;
    }

}

export default sellTokensReducer;
