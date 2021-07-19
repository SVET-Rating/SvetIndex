import { GET_INDEX_TOKENS_LIST, GET_TOKENS_BY_INDEX, INDEX_TOKEN_ACTIVE } from '../actions/types';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';

const initialState = {
  activeToken: {
    tokenAddress: '',
    indexTokenName: '',
    indexTokenBalance: '',
  },
  indexTokensList: [],
}

const indexTokenReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INDEX_TOKENS_LIST:
      return { ...state, indexTokensList: action.payload };
    case INDEX_TOKEN_ACTIVE:
      return { ...state, activeToken: action.payload };
    default:
      return state;
  }
}

export default indexTokenReducer;
