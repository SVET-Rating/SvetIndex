import { START_INVEST } from './types';


const startBuyIndexTokens = (svetTokensAmount,svetTokensAddress) => {
    return {
        type: START_INVEST,
        payload: {amount:svetTokensAmount,address:svetTokensAddress}
    }
}

export default startBuyIndexTokens;