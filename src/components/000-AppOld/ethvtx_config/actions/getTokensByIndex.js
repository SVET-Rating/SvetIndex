import {GET_TOKENS_BY_INDEX} from './types';

const getTokensByIndex = (tokens) => {
    return {
        type: GET_TOKENS_BY_INDEX,
        payload: tokens
    }
}

export default getTokensByIndex;