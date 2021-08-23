import * as TYPES from '../actions/types';

const initialState = {
  network: null,
};

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_NETWORK:
      return {
        ...state,
        network: action.payload.network,
      };
    default:
      return state;
  }
};
