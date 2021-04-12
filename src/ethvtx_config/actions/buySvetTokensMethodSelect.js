import { SELECT_SVET_PAYMENT_METHOD } from '../actions/types';


const buySvetTokenMethodSelectAction = (svetTokenBuyMethod) => {
    return {
        type: SELECT_SVET_PAYMENT_METHOD,
        payload: svetTokenBuyMethod
    }
}

export default buySvetTokenMethodSelectAction;
