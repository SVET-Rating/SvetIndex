import { CHECK_SVET_TOKENS, BUY_SVET_TOKENS } from '../actions/types';
import {SELECT_INDEX_TOKEN, 
        BUY_SVET_PAYMENT_METHOD, 
        BUY_SVET_PAYMENT_FORM,
        BUY_INDEX_TOKEN} from '../processStates/buyTokenProcessStates';


const initialStateBuySvetTokens = {
    'svetTokens': 0,
    'buyTokenProcessState': SELECT_INDEX_TOKEN
}


const buyTokensReducer = (state=initialStateBuySvetTokens, action) => {

    switch(action.type) {
        case CHECK_SVET_TOKENS:
            if (action.payload === 0) {
                return {...state, svetTokens: action.payload, buyTokenProcessState: BUY_SVET_PAYMENT_METHOD }
            } else {
                return {...state, svetTokens: action.payload, buyTokenProcessState: BUY_INDEX_TOKEN}
            }
            
        default:
            return state;
    }

}

export default buyTokensReducer;