import { CHECK_SVET_TOKENS, 
    BUY_SVET_TOKENS, 
    SELECT_SVET_PAYMENT_METHOD, 
    CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN, 
    START_INVEST,
    START_TO_BUY_SVET_TOKENS, 
    BUY_SVET_TOKEN_ETHER_AMOUNT,
    BUY_SVET_TOKENS_BY_ETHER} from '../actions/types';
import {SELECT_INDEX_TOKEN, 
        BUY_SVET_PAYMENT_METHOD, 
        BUY_SVET_PAYMENT_FORM,
        BUY_INDEX_TOKEN } from '../processStates/buyTokenProcessStates';
import { DAI,ETHER,FIAT_MONEY,BITCOIN } from '../paymentMethod/paymentMethodType'


const initialStateBuySvetTokens = {
    'svetTokens':{},
    'buyTokenProcessState': SELECT_INDEX_TOKEN,
    'buySvetTokenMethod': ETHER,
    'enoughSvetTokensForBuy': undefined,
    'etherAmount':0

}


const buyTokensReducer = (state=initialStateBuySvetTokens, action) => {

    switch(action.type) {
        case START_INVEST:
            return {...state, svetTokens: action.payload, buyTokenProcessState: BUY_INDEX_TOKEN}
        case START_TO_BUY_SVET_TOKENS:
            return {...state, buyTokenProcessState: BUY_SVET_PAYMENT_METHOD }
        case SELECT_SVET_PAYMENT_METHOD:
            return {...state, buySvetTokenMethod: action.payload, buyTokenProcessState: BUY_SVET_PAYMENT_FORM}
        case CHECK_SVET_TOKENS_FOR_BUY_INDEX_TOKEN:
            return {...state, 
                enoughSvetTokensForBuy:action.payload.enoughSvetTokensForBuy}
        case BUY_SVET_TOKEN_ETHER_AMOUNT:
            console.log('PAYLOAD:',action.payload.etherAmount)
            return {...state,
                   etherAmount:action.payload.etherAmount}
            
        default:
            return state;
    }

}

export default buyTokensReducer;