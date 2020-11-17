import { GET_INDEX_TOKENS_LIST } from './types';

const getIndexTokensList = () => {
    return {
        type: GET_INDEX_TOKENS_LIST,
        payload:[{name:'BEST TOKEN',balance:0}]
    }
}

export default getIndexTokensList;



