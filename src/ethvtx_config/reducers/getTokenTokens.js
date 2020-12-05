import { GET_TOKENS_BY_INDEX } from '../actions/types';

const initialStateTokens = {
    'tokens':[]
}


const indexTokenTokens = (state=initialStateTokens, action) => {

    switch(action.type) {
        case GET_TOKENS_BY_INDEX:
            return {...state, tokens: action.payload }
        default:
            return state;
    }

}

export default indexTokenTokens;