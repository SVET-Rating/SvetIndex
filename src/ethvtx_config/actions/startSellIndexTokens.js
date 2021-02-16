import indexTokenSelect from './indexTokenSelect';
import { START_SELL_INDEX } from './types';
import { SELL_INDEX_TOKEN } from '../processStates/sellTokenProcessStates';


const startSellIndexTokens = () => {
    return {
        type: START_SELL_INDEX,
        payload: SELL_INDEX_TOKEN
    }
}

export default startSellIndexTokens;