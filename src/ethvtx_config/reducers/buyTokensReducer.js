import { CHECK_SVET_TOKENS, BUY_SVET_TOKENS, SELECT_SVET_PAYMENT_METHOD } from '../actions/types';
import {SELECT_INDEX_TOKEN, 
        BUY_SVET_PAYMENT_METHOD, 
        BUY_SVET_PAYMENT_FORM,
        BUY_INDEX_TOKEN} from '../processStates/buyTokenProcessStates';
import { DAI,ETHER,FIAT_MONEY,BITCOIN } from '../paymentMethod/paymentMethodType'


const initialStateBuySvetTokens = {
    'svetTokens': 0,
    'buyTokenProcessState': SELECT_INDEX_TOKEN,
    'buySvetTokenMethod': ETHER
}


const buyTokensReducer = (state=initialStateBuySvetTokens, action) => {

    switch(action.type) {
        case CHECK_SVET_TOKENS:
            if (action.payload === 0) {
                return {...state, svetTokens: action.payload, buyTokenProcessState: BUY_SVET_PAYMENT_METHOD }
            } else {
                return {...state, svetTokens: action.payload, buyTokenProcessState: BUY_INDEX_TOKEN}
            }
        case SELECT_SVET_PAYMENT_METHOD:
            return {...state, buySvetTokenMethod: action.payload, buyTokenProcessState: BUY_SVET_PAYMENT_FORM}
            
        default:
            return state;
    }

}

export default buyTokensReducer;