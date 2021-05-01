import { START_INVEST } from './types';


const startBuyIndexTokens = (svetTokensAmount,svetTokensAddress,stateWeb3) => {
    return {
        type: START_INVEST,
        payload: {amount:svetTokensAmount,address:svetTokensAddress,stateWeb3}
    }
}

export default startBuyIndexTokens;