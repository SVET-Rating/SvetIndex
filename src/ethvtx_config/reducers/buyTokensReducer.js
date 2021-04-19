import { CHECK_SVET_TOKENS, 
    BUY_SVET_TOKENS, 
    SELECT_SVET_PAYMENT_METHOD, 
    CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN, 
    START_INVEST,
    START_TO_BUY_SVET_TOKENS, 
    BUY_SVET_TOKEN_ETHER_AMOUNT,
    BUY_INDEX_TOKENS,
    BUY_SVET_TOKENS_BY_ETHER,
    BUY_INDEX_START_APPROVE,
    BUY_INDEX_APPROVED,
    BUY_INDEX_TRX_START,
    BUY_INDEX_TRX_PROCESSED,
    BUY_INDEX_TRX_END
    } from '../actions/types';
import {SELECT_INDEX_TOKEN, 
        BUY_SVET_PAYMENT_METHOD, 
        BUY_SVET_PAYMENT_FORM,
        BUY_INDEX_TOKEN } from '../processStates/buyTokenProcessStates';
import { DAI,ETHER,FIAT_MONEY,BITCOIN } from '../paymentMethod/paymentMethodType'
import { RESET_INVESTMENTS } from '../processStates/resetProcessStates';


const initialStateBuySvetTokens = {
    'svetTokens':{},
    'buyTokenProcessState': SELECT_INDEX_TOKEN,
    'buySvetTokenMethod': ETHER,
    'enoughSvetTokensForBuy': undefined,
    'etherAmount':0,
    'indexTokensAmount':0,
    'start_aprove': false,
    'end_aprove': false,
    'start_buyindex':false,
    'end_buyindex':false,
    'aprove_hash': "",
    'buyindex_hash': "",
    'buyindex_end': false

}


const buyTokensReducer = (state=initialStateBuySvetTokens, action) => {

    switch(action.type) {
        case RESET_INVESTMENTS:
            return {...state, buyTokenProcessState: SELECT_INDEX_TOKEN }
        case START_INVEST:
            return {...state, svetTokens: action.payload, buyTokenProcessState: BUY_INDEX_TOKEN}
        case START_TO_BUY_SVET_TOKENS:
            return {...state, buyTokenProcessState: BUY_SVET_PAYMENT_METHOD }
        case SELECT_SVET_PAYMENT_METHOD:
            return {...state, buySvetTokenMethod: action.payload, buyTokenProcessState: BUY_SVET_PAYMENT_FORM}
        case CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN:
            return {...state, indexTokensAmount: action.payload.indexTokensAmount,
                enoughSvetTokensForBuy:action.payload.enoughSvetTokensForBuy}
        case BUY_SVET_TOKEN_ETHER_AMOUNT:
            console.log('PAYLOAD:',action.payload.etherAmount)
            return {...state,
                   etherAmount:action.payload.etherAmount}
        // case BUY_INDEX_TOKENS:
        //     return {
        //         //...state, buyTokenProcessState:SELECT_INDEX_TOKEN
        //         ...state, stepState: action.payload
        //     }
        case BUY_INDEX_START_APPROVE:
            return {
                ...state, start_aprove: true
            }
        case BUY_INDEX_APPROVED:
            return {
                ...state, end_aprove: true, aprove_hash: action.payload.aprove_hash
            }
        case BUY_INDEX_TRX_START:
             return {
                 ...state, start_buyindex: true, end_aprove: false
             }
        case BUY_INDEX_TRX_PROCESSED:
            return {
                ...state, buyindex_hash: action.payload.buyindex_hash, start_buyindex: false, aprove_hash:""
            }
        case BUY_INDEX_TRX_END:
            return {
                ...state, buyindex_end: true, buyindex_hash: "",buyTokenProcessState:SELECT_INDEX_TOKEN, start_aprove: false
            }
        default:
            return state;
    }

}

export default buyTokensReducer;