import * as TYPES from '../actions/types';
import chains from '../../assets/chains.json';

const initialState = {
  isInitialized: false,
  networkType: null,
  networkId: null,
  chainId: null,
  chains,
};

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_INITIAL_DATA:
      return {
        ...state,
        ...action.payload.network,
      };
    case TYPES.SET_NETWORK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
