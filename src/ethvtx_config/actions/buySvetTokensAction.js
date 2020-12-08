import { CHECK_SVET_TOKENS } from '../actions/types';


const buySvetTokenAction = (svetTokensAmount,svetTokensAddress) => {
    return {
        type: CHECK_SVET_TOKENS,
        payload: {amount:svetTokensAmount,address:svetTokensAddress}
    }
}

export default buySvetTokenAction;