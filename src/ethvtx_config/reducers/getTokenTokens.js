import { GET_TOKENS_BY_INDEX } from '../actions/types';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';



const initialStateTokens = {
    'tokens':[]
}


const indexTokenTokens = (state=initialStateTokens, action) => {

    switch(action.type) {
        case GET_TOKENS_BY_INDEX:
            return {...state, tokens: getContract(store.getState().otherReducer.items, 'IndexToken', action.payload).fn.getActivesList() }
        default:
            return state;
    }

}

export default indexTokenTokens;