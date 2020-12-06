import { CHECK_SVET_TOKENS } from '../actions/types';


const buySvetTokenAction = (svetTokensAmount) => {
    return {
        type: CHECK_SVET_TOKENS,
        payload: svetTokensAmount
    }
}

export default buySvetTokenAction;