import {START_TO_BUY_SVET_TOKENS} from './types';


const svetTokensBuyProcessStart = (e) => {
    return {
        type:START_TO_BUY_SVET_TOKENS,
        payload:true
    }
}

export default svetTokensBuyProcessStart;