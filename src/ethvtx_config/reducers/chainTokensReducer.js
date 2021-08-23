import * as TYPES from '../actions/types';

const initialState = {
  weth: null,
  stable: null,
};

export const chainTokensReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_CHAIN_TOKENS:
      return {
        ...state,
        ...action.payload.tokens,
      };
    default:
      return state;
  }
};
