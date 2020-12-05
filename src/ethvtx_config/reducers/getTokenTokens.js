import { GET_TOKENS_BY_INDEX, INDEX_TOKEN_ACTIVE } from '../actions/types';

const initialStateTokens = {
    'tokens':[]
}


const indexTokenTokens = (state=initialStateTokens, action) => {

    switch(action.type) {
        case INDEX_TOKEN_ACTIVE:
            return {...state, tokens: action.payload }
        default:
            return state;
    }

}

export default indexTokenTokens;