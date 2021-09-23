import * as TYPES from '../actions/types';

const initialState = {
  networkType: null,
  networkId: null,
  chainId: null,
};

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_NETWORK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
