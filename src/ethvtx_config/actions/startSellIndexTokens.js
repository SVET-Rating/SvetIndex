import indexTokenSelect from './indexTokenSelect';
import { START_SELL_INDEX } from './types';
import { SELL_INDEX_TOKEN } from '../processStates/sellTokenProcessStates';


const startSellIndexTokens = (stateWeb3) => {
    return {
        type: START_SELL_INDEX,
        payload: {stateWeb3}
    }
}

export default startSellIndexTokens;